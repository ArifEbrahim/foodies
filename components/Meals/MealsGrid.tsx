import { Meals } from '@/types/Meals'
import { PropsWithChildren } from 'react'
import MealItem from './MealItem'
import styles from './MealsGrid.module.css'

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
