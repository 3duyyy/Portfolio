export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  stack: string[]
  image?: string
  demo: string
  github: string
  highlight?: boolean
}

export interface Experience {
  id: string
  role: string
  company: string
  period: string
  description: string
}

export interface Skill {
  name: string
  icon: string // react-icons key
  color: string
}
