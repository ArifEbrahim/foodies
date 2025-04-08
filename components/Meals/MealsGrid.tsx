import styles from './MealsGrid.module.css'
import MealItem from './MealItem'
import { Meals } from '@/types/Meals'
import { PropsWithChildren } from 'react'

interface MealsGridProps extends PropsWithChildren {
  meals: Meals
}

export default function MealsGrid({ meals }: MealsGridProps) {
  return (
    <ul className={styles.meals}>
      {meals.map(meal => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  )
}
