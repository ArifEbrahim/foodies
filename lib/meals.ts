import { Meal, Meals } from '@/types/Meals'
import sql from 'better-sqlite3'

const db = sql('meals.db')

export async function getMeals() {
  await new Promise(resolve => setTimeout(resolve, 1500))
  return db.prepare('SELECT * FROM meals').all() as Meals
}

export async function getMeal(slug: string) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as Meal
}
