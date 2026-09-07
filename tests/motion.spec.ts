import { expect, test, type Page } from "@playwright/test"

async function assertNoOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
}

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`content and layout remain usable at ${width}px`, async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (error) => errors.push(error.message))
    await page.setViewportSize({ width, height: 900 })
    await page.goto("/")
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Nguyễn Ba Duy")
    for (const id of ["hero", "about", "skills", "experience", "projects", "contact"]) {
      await page.evaluate(
        (sectionId) => document.getElementById(sectionId)?.scrollIntoView({ block: "start", behavior: "instant" }),
        id,
      )
      await expect(page.locator(`#${id} .motion-reveal`).first()).toHaveCSS("opacity", "1")
      await assertNoOverflow(page)
    }
    await expect(page.locator("#projects article")).toHaveCount(3)
    await expect(page.locator("#skills .skill-card")).toHaveCount(16)
    expect(errors).toEqual([])
  })
}

test("mobile menu supports keyboard, Escape and section navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")
  const toggle = page.getByRole("button", { name: "Mở menu" })
  await toggle.click()
  await expect(page.locator("#mobile-navigation")).not.toHaveAttribute("inert")
  await page.keyboard.press("Escape")
  await expect(toggle).toBeFocused()
  await expect(toggle).toHaveAttribute("aria-expanded", "false")
  await toggle.click()
  await page.locator("#mobile-navigation").getByRole("link", { name: "Projects" }).click()
  await expect(page).toHaveURL(/#projects$/)
  await expect(page.locator("#projects")).toBeFocused()
  await expect(toggle).toHaveAttribute("aria-expanded", "false")
  await page.locator("#contact").scrollIntoViewIfNeeded()
  await expect(page.locator('a[href="#contact"][aria-current="location"]')).toHaveCount(2)
})

test("reduced motion keeps content visible, disables WebGL and reacts to preference changes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")
  await expect(page.locator("[data-motion]")).toHaveAttribute("data-motion", "reduced")
  await expect(page.locator("canvas")).toHaveCount(0)
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto")
  for (const id of ["about", "projects", "contact"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded()
    await expect(page.locator(`#${id} .motion-reveal`).first()).toHaveCSS("opacity", "1")
  }
  await page.emulateMedia({ reducedMotion: "no-preference" })
  await expect(page.locator("[data-motion]")).toHaveAttribute("data-motion", "full")
  await page.emulateMedia({ reducedMotion: "reduce" })
  await expect(page.locator("canvas")).toHaveCount(0)
})

test("touch devices do not tilt cards or move magnetic links", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  const page = await context.newPage()
  await page.goto("/")
  const cta = page.getByRole("link", { name: "Xem dự án" })
  await cta.dispatchEvent("pointermove", { pointerType: "touch", clientX: 160, clientY: 250 })
  await expect(cta).toHaveCSS("transform", "none")
  await page.locator("#projects").scrollIntoViewIfNeeded()
  const card = page.locator("#projects article").first()
  await card.dispatchEvent("pointermove", { pointerType: "touch", clientX: 250, clientY: 400 })
  await expect(card).toHaveCSS("transform", "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -0.001, 0, 0, 0, 1)")
  await context.close()
})

test("WebGL stops offscreen and while motion is paused", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "hardwareConcurrency", { get: () => 8 })
    Object.defineProperty(navigator, "deviceMemory", { get: () => 8 })
    const proto = WebGL2RenderingContext.prototype
    const original = proto.drawElements
    let draws = 0
    Object.defineProperty(window, "__webglDraws", { get: () => draws })
    proto.drawElements = function (...args) {
      draws++
      return original.apply(this, args)
    }
  })
  const draws = () => page.evaluate(() => (window as unknown as Window & { __webglDraws: number }).__webglDraws)
  await page.goto("/")
  await expect(page.locator(".orb-fallback")).toHaveAttribute("data-scene-ready", "true", { timeout: 15000 })
  await expect.poll(draws).toBeGreaterThan(0)
  await page.getByRole("button", { name: "Tạm dừng chuyển động" }).click()
  await expect(page.locator("[data-motion]")).toHaveAttribute("data-motion", "reduced")
  await page.waitForTimeout(250)
  const paused = await draws()
  await page.waitForTimeout(350)
  expect(await draws()).toBe(paused)
  await page.getByRole("button", { name: "Bật chuyển động" }).click()
  await expect.poll(draws).toBeGreaterThan(paused)
  await page.locator("#projects").scrollIntoViewIfNeeded()
  await page.waitForTimeout(800)
  const offscreen = await draws()
  await page.waitForTimeout(350)
  expect(await draws()).toBe(offscreen)
})

test("low capability devices retain the static hero", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "hardwareConcurrency", { get: () => 2 }))
  await page.goto("/")
  await expect(page.locator(".hero-number")).toHaveText("7")
  await expect(page.locator(".orb-fallback")).toBeVisible()
  await page.waitForTimeout(2000)
  await expect(page.locator("canvas")).toHaveCount(0)
})

test("server-rendered content remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Nguyễn Ba Duy")
  await expect(page.locator("#about .motion-reveal").first()).toHaveCSS("opacity", "1")
  await expect(page.locator(".hero-number")).toBeVisible()
  await context.close()
})

test("WebGL pauses for hidden documents and falls back after context loss", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "hardwareConcurrency", { get: () => 8 })
    Object.defineProperty(navigator, "deviceMemory", { get: () => 8 })
    const proto = WebGL2RenderingContext.prototype
    const original = proto.drawElements
    let draws = 0
    Object.defineProperty(window, "__webglDraws", { get: () => draws })
    proto.drawElements = function (...args) {
      draws++
      return original.apply(this, args)
    }
  })
  const draws = () => page.evaluate(() => (window as unknown as Window & { __webglDraws: number }).__webglDraws)
  await page.goto("/")
  await expect(page.locator(".orb-fallback")).toHaveAttribute("data-scene-ready", "true")
  await expect.poll(draws).toBeGreaterThan(0)
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, get: () => true })
    document.dispatchEvent(new Event("visibilitychange"))
  })
  await page.waitForTimeout(250)
  const hidden = await draws()
  await page.waitForTimeout(350)
  expect(await draws()).toBe(hidden)
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, get: () => false })
    document.dispatchEvent(new Event("visibilitychange"))
  })
  await expect.poll(draws).toBeGreaterThan(hidden)
  await page.locator("canvas").dispatchEvent("webglcontextlost", { cancelable: true })
  await expect(page.locator("canvas")).toHaveCount(0)
  await expect(page.locator(".orb-fallback")).toHaveAttribute("data-scene-ready", "false")
  await expect(page.locator(".hero-number")).toBeVisible()
})
