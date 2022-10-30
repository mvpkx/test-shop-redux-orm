import React, {PropsWithChildren} from 'react';
import CartButton from './cart-button/cart-button';
import GeoButton from './geo-button/geo-button';
import styles from './top-bar.module.css';
import LogoButton from './logo-button/logo-button';
import SearchInput from './search-input/search-input';
import UserButton from './user-button/user-button';

export default function TopBar({children}: PropsWithChildren): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.top_bar}>
        <LogoButton />
        <GeoButton />
        <SearchInput />
        <CartButton />
        <UserButton />
      </div>
      {children}
    </div>
  );
}
