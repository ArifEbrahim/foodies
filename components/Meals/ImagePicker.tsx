'use client'

import { PropsWithChildren, useRef } from 'react'
import styles from './ImagePicker.module.css'

interface ImagePickerProps extends PropsWithChildren {
  label: string
  name: string
}

export default function ImagePicker({ label, name }: ImagePickerProps) {
  const imageInput = useRef<HTMLInputElement | null>(null)

  const handleClick = () => {
    imageInput.current?.click()
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <input
          className={styles.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
        />
        <button className={styles.button} type="button" onClick={handleClick}>
          Pick an image
        </button>
      </div>
    </div>
  )
}
