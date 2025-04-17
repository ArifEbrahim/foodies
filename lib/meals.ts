import { Meal, Meals, ShareMealFormInputs } from '@/types/Meals'
import { v4 as uuid } from '@lukeed/uuid'
import sql from 'better-sqlite3'
import fs from 'node:fs'
import slugify from 'slugify'
import xss from 'xss'

const db = sql('meals.db')

export async function getMeals() {
  await new Promise(resolve => setTimeout(resolve, 1500))
  return db.prepare('SELECT * FROM meals').all() as Meals
}

export async function getMeal(slug: string) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as Meal
}

export async function saveMeal(meal: ShareMealFormInputs) {
  const { title, instructions, image, summary, creator, creatorEmail } = meal
  const slug = slugify(title, { lower: true })
  const cleanInstructions = xss(instructions)

  const fileExtension = image.name.split('.').pop()
  const fileName = `${uuid()}.${fileExtension}`

  const stream = fs.createWriteStream(`public/images/${fileName}`)
  const bufferedImage = await image.arrayBuffer()

  stream.write(Buffer.from(bufferedImage), error => {
    if (error) {
      throw new Error('Saving image failed')
    }
  })

  const mealDataToSave = {
    title,
    summary,
    instructions: cleanInstructions,
    creator,
    creatorEmail,
    image: `/images/${fileName}`,
    slug
  }

  db.prepare(
    'INSERT INTO meals (title, summary, instructions, creator, creatorEmail, image, slug VALUES (@title, @summary, @instructions, @creator, @creatorEmail, @image, @slug'
  ).run(mealDataToSave)
}
