export interface Meal {
  id: string
  title: string
  slug: string
  image: string
  summary: string
  creator: string
  creatorEmail: string
  instructions: string
}

export type Meals = Meal[]
