import React, {PropsWithChildren} from 'react';
import styles from './footer.module.css';
import {AppStoreIcon, GooglePalyIcon, FacebookIcon, InstagramIcon, VkIcon} from './icons';

export default function Footer({children}: PropsWithChildren): JSX.Element {
  return (
    <>
      {children}
      <div className={styles.container}>
        <div className={styles.second_floor}>
          <h1 className={styles.logo}>React</h1>
          <div className={styles.socials}>
            <div>
              <span>Присоединяйтесь к нам</span>
              <div className={styles.icons}>
                <FacebookIcon />
                <VkIcon />
                <InstagramIcon />
              </div>
            </div>
            <div>
              <span>Устанавливайте приложение</span>
              <div className={styles.icons}>
                <GooglePalyIcon />
                <AppStoreIcon />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.links}>
          <span>© Sionic</span>
          <span>Правовая информация</span>
          <span>Политика конфидециальности</span>
        </div>
      </div>
    </>
  );
}
