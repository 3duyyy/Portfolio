import type { Project } from "@/types"

export const projects: Project[] = [
  {
    id: "sport-booker",
    title: "Sport Booker",
    subtitle: "Đồ án tốt nghiệp",
    description:
      "Hệ thống đặt sân thể thao trực tuyến tích hợp AI Chatbot tư vấn lịch & sân phù hợp cho người dùng và tích hợp thanh toán online.",
    stack: ["Nuxt.js", "Node.js", "Express", "TypeScript", "Vuetify", "TailwindCSS", "Groq SDK", "PayOS", "MySQL", "Prisma"],
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1280&q=80&auto=format&fit=crop",
    demo: "#",
    github: "https://github.com/3duyyy/Sport-Booker",
    highlight: true,
  },
  {
    id: "smart-sale",
    title: "Smart Sale",
    subtitle: "CRM Platform",
    description: "Hệ thống quản lý khách hàng (CRM) và hỗ trợ đội ngũ sale theo dõi pipeline, phân tích doanh số.",
    stack: ["React", "MUI", "TailwindCSS", "MongoDB", "Node.js", "Express"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&q=80&auto=format&fit=crop",
    demo: "#",
    github: "https://github.com/3duyyy/CRM-SmartSale",
  },
  {
    id: "mini-trello",
    title: "Mini Trello",
    subtitle: "Task Management App",
    description:
      "Ứng dụng quản lý công việc dạng board/list/card lấy cảm hứng từ Trello, hỗ trợ kéo thả và đồng bộ dữ liệu thời gian thực.",
    stack: ["React", "MUI", "TailwindCSS", "Node.js", "Express", "MongoDB", "Node.js"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1280&q=80&auto=format&fit=crop",
    demo: "#",
    github: "https://github.com/3duyyy/Trello-Web",
  },
]
