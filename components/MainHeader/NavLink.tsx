'use client'
import { PropsWithChildren } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './NavLink.module.css'

interface NavLinkProps extends PropsWithChildren {
  href: string
}

export default function NavLink({ href, children }: NavLinkProps) {
  const path = usePathname()
  const isActivePath = path.startsWith(href)

  return (
    <Link
      href={href}
      className={isActivePath ? `${styles.link} ${styles.active}` : styles.link}
    >
      {children}
    </Link>
  )
}
