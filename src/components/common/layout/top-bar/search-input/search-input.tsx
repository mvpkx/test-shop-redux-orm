import React from 'react';
import styles from './search-input.module.css';
import {ReactComponent as SearchIcon} from './search-icon.svg';

export default function SearchInput(): JSX.Element {
  return (
    <div className={styles.container}>
      <input className={styles.input} placeholder="Поиск бренда, товара, категории..." />
      <div className={styles.button}>
        <SearchIcon className={styles.icon} />
      </div>
    </div>
  );
}
