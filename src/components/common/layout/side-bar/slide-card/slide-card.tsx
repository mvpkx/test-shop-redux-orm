import React from 'react';
import styles from './slide-card.module.css';

interface SlideCardProps {
  imageSrc: string;
  text: string;
}

export default function SlideCard({imageSrc, text}: SlideCardProps): JSX.Element {
  return (
    <div className={styles.container}>
      <img className={styles.img} alt='img' src={imageSrc} />
      <h3 className={styles.text}>{text}</h3>
    </div>
  );
}
