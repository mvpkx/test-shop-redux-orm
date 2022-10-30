import React from 'react';
import styles from './geo-button.module.css';
import {ReactComponent as GeoIcon} from './geo-icon.svg';

export default function GeoButton(): JSX.Element {
  return (
    <div className={styles.container}>
      <GeoIcon className={styles.container} />
      <span className={styles.text}>Александровск-Сахалинский</span>
    </div>
  );
}
