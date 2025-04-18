'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { saveMeal } from './meals'

const isInvalid = (text: string) => {
  return !text || text.trim() === ''
}

export async function shareMeal(
  prevState: { message: string },
  formData: FormData
) {
  const meal = {
    title: formData.get('title') as string,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    image: formData.get('image') as File,
    creator: formData.get('name') as string,
    creatorEmail: formData.get('email') as string
  }

  if (
    isInvalid(meal.title) ||
    isInvalid(meal.summary) ||
    isInvalid(meal.instructions) ||
    isInvalid(meal.creator) ||
    isInvalid(meal.creatorEmail) ||
    !meal.creatorEmail.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid input'
    }
  }

  await saveMeal(meal)
  revalidatePath('/meals')
  redirect('/meals')
}
