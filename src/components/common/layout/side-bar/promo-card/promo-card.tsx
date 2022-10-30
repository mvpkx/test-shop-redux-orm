import React from 'react'
import styles from './promo-card.module.css'
import { ReactComponent as PictureOfBags } from './bags.svg'

interface PromoCardProps {
  cardText: string
  buttonText: string
}

export default function PromoCard ({ cardText, buttonText }: PromoCardProps): JSX.Element {
  return (
    <div className={styles.container}>
      <PictureOfBags
        className={styles.pic}
      />
      <div
        className={styles.body}
      >
        <h3
          className={styles.text}
        >
          {cardText}
        </h3>
        <button
          type='button'
          className={styles.button}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}
