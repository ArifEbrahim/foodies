import MealsGrid from '@/components/Meals/MealsGrid'
import { getMeals } from '@/lib/meals'
import Link from 'next/link'
import { Suspense } from 'react'

import styles from './page.module.css'

async function Meals() {
  const meals = await getMeals()
  return <MealsGrid meals={meals} />
}

const Loading = () => <p className={styles.loading}>Fetching meals...</p>

export default function MealsPage() {
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
        <Suspense fallback={<Loading />}>
          <Meals />
        </Suspense>
      </main>
    </>
  )
}
