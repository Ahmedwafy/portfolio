import type { PortableTextBlock } from 'next-sanity'

export interface SanityImage {
  asset: {
    _id: string
    url: string
    metadata?: {
      lqip?: string
      dimensions?: { width: number; height: number }
    }
  }
  alt?: string
}

export interface SocialLink {
  platform: string
  url: string
}

export interface Person {
  _id: string
  name: string
  headline: string
  bio: PortableTextBlock[]
  avatar?: SanityImage
  resumeUrl?: string
  skills?: string[]
  socialLinks?: SocialLink[]
}

export interface Project {
  _id: string
  title: string
  slug: string
  summary: string
  description?: PortableTextBlock[]
  coverImage: SanityImage
  gallery?: SanityImage[]
  techStack: string[]
  liveUrl?: string
  repoUrl?: string
  featured: boolean
  order: number
}

export interface Experience {
  _id: string
  role: string
  company: string
  companyUrl?: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  description?: PortableTextBlock[]
  techStack?: string[]
}
