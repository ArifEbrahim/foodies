import Link from 'next/link'
import styles from './page.module.css'
import MealsGrid from '@/components/Meals/MealsGrid'
import { getMeals } from '@/lib/meals'
import { Meals } from '@/types/Meals'

export default async function MealsPage() {
  const meals = await getMeals()

  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={styles.highlight}>by you</span>
        </h1>
        <p>Choose your favourite reciepe and cook it yourself</p>
        <p className={styles.cta}>
          <Link href="/meals/share">Share Your Favourite Recipe</Link>
        </p>
      </header>
      <main className={styles.main}>
        <MealsGrid meals={meals} />
      </main>
    </>
  )
}
