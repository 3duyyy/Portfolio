# Portfolio Frontend

Ứng dụng Next.js 16 (App Router) cho portfolio cá nhân của **Nguyễn Ba Duy**.

## Tech stack

- Next.js 16 + React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion (animation)
- react-icons
- Three.js + React Three Fiber (Hero 3D tải riêng)
- Playwright (kiểm thử trình duyệt)

## Scripts

```bash
npm install      # cài dependencies
npm run dev      # dev server → http://localhost:3000
npm run build    # build production
npm run start    # chạy bản production
npm run lint     # eslint
npm run typecheck # TypeScript
npm run test:motion # responsive, reduced motion, WebGL lifecycle
```

## Cấu trúc

```
src/
├── app/                 # App Router (layout, page, globals.css)
├── components/
│   ├── animations/      # MotionProvider, reveal, parallax, tilt, magnetic
│   ├── three/           # HeroVisual, HeroScene, FloatingObject, SceneLights
│   ├── sections/        # Hero, About, Experience, Skills, Projects, Contact
│   └── ui/              # Button, Card, Input, Navbar, Footer
├── data/                # Dữ liệu tĩnh: profile, experiences, skills, projects
├── hooks/               # Custom hooks (useTypingEffect)
├── lib/                 # Tiện ích chung (utils)
└── types/               # Type chung
```

## Cập nhật nội dung

Toàn bộ nội dung hiển thị (tên, role, kinh nghiệm, skill, project, link liên hệ) đều nằm trong `src/data/`. Sửa các file đó là trang sẽ tự cập nhật.

- `data/profile.ts` — thông tin cá nhân + link Gmail / Facebook / Zalo / Telegram.
- `data/experiences.ts` — danh sách kinh nghiệm làm việc.
- `data/skills.ts` — tech stack hiển thị ở section Skills.
- `data/projects.ts` — danh sách dự án nổi bật.

## Motion & 3D

Xem [phân tích, kiến trúc motion và cách kiểm thử](docs/motion-refactor.md). Nút tạm dừng chuyển động nằm ở góc trên phải card số 7; website cũng tự theo thiết lập reduced motion của hệ điều hành.

## Deploy

Khuyến nghị deploy trên [Vercel](https://vercel.com/new). Repo này là pure Next.js app, không cần backend.
