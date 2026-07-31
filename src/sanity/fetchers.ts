import { client } from './client'
import {
  experienceQuery,
  personQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  projectsQuery,
} from './queries'
import type { Experience, Person, Project } from '@/types/sanity'

export async function getPerson(): Promise<Person | null> {
  return client.fetch(personQuery, {}, { next: { revalidate: 60 } })
}

export async function getProjects(): Promise<Project[]> {
  return client.fetch(projectsQuery, {}, { next: { revalidate: 60 } })
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return client.fetch(
    projectBySlugQuery,
    { slug },
    { next: { revalidate: 60 } }
  )
}

export async function getProjectSlugs(): Promise<string[]> {
  return client.fetch(projectSlugsQuery, {}, { next: { revalidate: 60 } })
}

export async function getExperience(): Promise<Experience[]> {
  return client.fetch(experienceQuery, {}, { next: { revalidate: 60 } })
}
