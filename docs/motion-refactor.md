# Motion & 3D refactor

## Phân tích codebase ban đầu

- Next.js 16.2.6 App Router, React 19.2.4, TypeScript strict.
- Tailwind CSS v4, font Inter, nền zinc và điểm nhấn sky/cyan/emerald.
- Framer Motion đã có sẵn; FadeIn và ScrollReveal có thể mở rộng.
- Một route nội dung với Hero, About, Skills, Experience, Projects, Contact. Giữ thứ tự, lưới responsive, dữ liệu, ảnh, liên kết, metadata và footer.
- Hero giữ số 7 và câu “Keep The Blue Flag Flying High”.
- Variants/stagger lặp ở Skills, Projects, Contact; chưa có policy reduced motion, timeline ping liên tục và typing chạy cả khi không nhìn thấy.
- Skills dùng namespace imports rồi spread toàn bộ react-icons/si và react-icons/di vào một map phía client: cản tree-shaking và kéo theo nhiều icon không dùng.
- Không có lý do thêm GSAP, một animation library thứ hai, hoặc page transition cho trang một route. Button/Card/Input hiện hữu được giữ làm primitives.

## Thay đổi

- MotionProvider dùng LazyMotion + m, gom thiết lập giảm chuyển động, nhận diện desktop có chuột và nút tạm dừng.
- tokens.ts là nơi chỉnh easing, duration, spring và ngưỡng reveal.
- FadeIn, ScrollReveal/StaggerItem, TextReveal, Counter, Parallax, MagneticLink và TiltCard là những khối có thể tái sử dụng.
- usePointerMotion dùng MotionValue và spring thay vì setState theo pointermove. Tilt giới hạn ±2,5°, CTA dịch tối đa 6px/5px.
- Hero: reveal heading theo từ, CTA xuất hiện sau nội dung, gradient chậm, parallax nhẹ, scene abstract bao quanh số 7.
- Project cards: perspective nhẹ, spotlight cục bộ, parallax/zoom ảnh, underline và icon phản hồi hover/focus. Dữ liệu dự án không đổi; React keys xử lý được stack có tên lặp.
- About: reveal theo thứ tự, GPA counter dùng đúng giá trị 3.25 hiện có, cards nâng nhẹ khi hover.
- Skills: giữ grid, import đúng các icon cần dùng, hover có độ sâu. Skills/Projects/Contact và nội dung Hero trở về Server Components, chỉ các phần tương tác là client.
- Experience: giữ timeline, thay ping liên tục bằng progress line theo scroll và highlight item trong vùng đọc.
- Navbar: active section, glass khi cuộn, mobile menu transition, aria-controls/expanded/current, Escape, đóng khi click ngoài/đổi breakpoint, trả focus vào section.
- Contact: heading reveal, magnetic email CTA, hover icon; giữ thông tin liên hệ.
- Thêm skip link, focus-visible và vùng role tĩnh cho screen reader. Typing không tạo live announcement.

## 3D và hiệu năng

HeroVisual là client boundary; HeroScene được tải bằng next/dynamic với ssr: false sau khi nội dung đã có cơ hội paint và Hero gần viewport.

- Chỉ thêm Three.js và React Three Fiber 9 cho React 19; không thêm Drei vì scene không cần các helper của thư viện này.
- FloatingObject và SceneLights tách riêng; không tải model, HDRI, texture hoặc postprocessing.
- 5 meshes, không shadow map, không particle loop.
- DPR desktop 1–1.5; mobile DPR 1, giảm segments và tắt antialias.
- frameloop chuyển sang never khi ngoài viewport, document bị ẩn hoặc người dùng tạm dừng.
- Timer riêng tích lũy delta đã clamp để tránh nhảy khi quay lại tab.
- Geometry/material do R3F sở hữu và tự dispose khi unmount; listener context loss có cleanup.
- Reduced motion không mount WebGL. Save-Data, ít hơn 4 logical cores hoặc ít hơn 4GB deviceMemory (nếu browser cung cấp) dùng vòng tĩnh.
- Nếu lỗi tải/render hoặc mất WebGL context, giữ bản tĩnh và nội dung số 7.
- Tilt, magnetic, pointer parallax chỉ bật khi hover:hover, pointer:fine, viewport từ 768px và motion được bật.
- Nội dung có CSS fallback khi JavaScript bị tắt. Ảnh vẫn dùng next/image với kích thước/aspect ratio ổn định.

Chunk 3D tải riêng đo được 887,621 bytes chưa nén (~229 KiB gzip). Trong kiểm tra reduced motion, chunk này không được yêu cầu; khi bật motion trở lại, nó mới tải.

## Kiểm tra

```sh
npm run typecheck
npm run lint
npm run build
npm run test:motion
```

Playwright dùng Edge có sẵn trên Windows; trên nền tảng khác, cài Chromium bằng `npx playwright install chromium`. Có thể chọn browser bằng biến môi trường PLAYWRIGHT_CHANNEL.

Test mặc định dùng http://localhost:3000 và tái sử dụng dev server nếu đã có. Dùng đúng origin localhost: Next.js 16 chặn dev resources từ origin không được cho phép, ví dụ truy cập server localhost qua 127.0.0.1.

Để kiểm tra production, chạy `npm run start -- --port 3100`, sau đó đặt PLAYWRIGHT_BASE_URL=http://localhost:3100 trước khi chạy test.

Kết quả cuối: TypeScript, lint và production build đều thành công; **13/13 tests** qua trên production.

Bộ kiểm tra bao gồm 360, 390, 768, 1024, 1440, 1920px; menu mobile và bàn phím; thay đổi reduced motion; thiết bị cảm ứng; fallback phần cứng yếu; nội dung không JavaScript; đếm draw calls để kiểm tra dừng/resume khi offscreen, paused, visibilitychange và fallback khi mất WebGL context.

Đo thủ công bằng headless Edge trên bản production, viewport 1440×900, DPR 1, 239 khung hình sau khi scene tải xong:
- Frame interval trung bình: 16.67ms (~60fps).
- P95: 16.8ms; không có frame >25ms trong mẫu.
- CLS: ~0.00001.
- Desktop tilt có phản hồi; không ghi nhận pageerror hoặc console error trong lượt đo.

Đây là phép đo requestAnimationFrame cục bộ, không phải benchmark GPU hay cam kết 60fps trên mọi thiết bị. Test viewport/touch là mô phỏng trình duyệt; vẫn nên thử trên điện thoại thật khi phát hành. Ảnh dự án hiện có phụ thuộc Unsplash; build dùng next/font/google nên cần truy cập Google Fonts.

## Tài liệu đối chiếu

Đã đọc guide lazy-loading, server/client components và images trong node_modules/next/dist/docs của đúng phiên bản cài đặt. Tham khảo thêm [R3F và React 19](https://r3f.docs.pmnd.rs/getting-started/installation), [render theo nhu cầu](https://r3f.docs.pmnd.rs/advanced/scaling-performance), và [Motion reduced motion](https://motion.dev/docs/react-use-reduced-motion).
