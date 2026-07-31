import { groq } from 'next-sanity'

// Reusable image projection - grabs everything components need to render
// a Sanity image without extra round trips (asset ref, url, dimensions, blur placeholder)
const imageProjection = groq`
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  },
  alt
`

export const personQuery = groq`
  *[_type == "person"][0]{
    _id,
    name,
    headline,
    bio,
    "avatar": avatar{ ${imageProjection} },
    resumeUrl,
    skills,
    socialLinks
  }
`

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    summary,
    "coverImage": coverImage{ ${imageProjection} },
    techStack,
    liveUrl,
    repoUrl,
    featured,
    order
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    summary,
    description,
    "coverImage": coverImage{ ${imageProjection} },
    "gallery": gallery[]{ ${imageProjection} },
    techStack,
    liveUrl,
    repoUrl,
    featured,
    order
  }
`

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`

export const experienceQuery = groq`
  *[_type == "experience"] | order(startDate desc){
    _id,
    role,
    company,
    companyUrl,
    startDate,
    endDate,
    isCurrent,
    description,
    techStack
  }
`
