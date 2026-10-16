export interface NewsItem {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  image: string
  date: string
  createdAt: string
  updatedAt: string
}

export interface GalleryItem {
  id: string
  title: string
  category: string
  image: string
  photoCount: number
  date: string
}

export interface TeacherItem {
  id: string
  name: string
  position: string
  role: string
  initials: string | null
  order: number
}

export interface AnnouncementItem {
  id: string
  title: string
  content: string
  date: string
  isPinned: boolean
}

export interface VisitorStats {
  today: number
  yesterday: number
  month: number
  total: number
  online: number
}

export interface NewsResponse {
  success: boolean
  data: NewsItem[]
  pagination: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
}
