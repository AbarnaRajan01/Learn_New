import { type SchemaTypeDefinition } from 'sanity'
import courses from './courses'
import user from './user'
import userActivity from './userActivity'
import userPreferencs from './userPreferencs'
import competition from './competition'
import lessons from './lessons'
import problem from './problem'
import roadmap from './roadmap'
import quizresult from './quizresult'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [competition,courses,lessons,problem,user,userActivity,userPreferencs,roadmap,quizresult],
}
