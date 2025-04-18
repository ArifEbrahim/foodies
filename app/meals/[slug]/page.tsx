import { getMeal } from '@/lib/meals'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import styles from './page.module.css'

export default async function MealDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const meal = await getMeal(slug)

  if (!meal) {
    notFound()
  }

  const formattedInstructions = meal.instructions.replace(/\n/g, '<br />')

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={styles.headerText}>
          <h1>{meal.title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto:${meal.creatorEmail}`}>{meal.creator}</a>
          </p>
          <p className={styles.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{ __html: formattedInstructions }}
        ></p>
      </main>
    </>
  )
}
