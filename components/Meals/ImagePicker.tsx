'use client'

import Image from 'next/image'
import { ChangeEvent, PropsWithChildren, useRef, useState } from 'react'
import styles from './ImagePicker.module.css'

interface ImagePickerProps extends PropsWithChildren {
  label: string
  name: string
}

export default function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(null)
  const imageInput = useRef<HTMLInputElement | null>(null)

  const handleClick = () => {
    imageInput.current?.click()
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPickedImage(null)
    if (!event.target.files) return
    const file = event.target.files[0]
    const fileReader = new FileReader()
    fileReader.onload = () => {
      const imageImport = fileReader.result as string
      setPickedImage(imageImport)
    }
    fileReader.readAsDataURL(file)
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedImage && <p>No image picked yet</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="Image picked by user" fill />
          )}
        </div>
        <input
          className={styles.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button className={styles.button} type="button" onClick={handleClick}>
          Pick an image
        </button>
      </div>
    </div>
  )
}
