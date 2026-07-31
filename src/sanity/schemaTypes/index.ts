import type { SchemaTypeDefinition } from 'sanity'

import { person } from './person'
import { project } from './project'
import { experience } from './experience'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [person, project, experience],
}
