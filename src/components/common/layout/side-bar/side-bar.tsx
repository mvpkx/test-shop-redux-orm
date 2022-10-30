import React, {PropsWithChildren} from 'react';
import {SIDE_CARDS} from '../../../../utils/constants';
import SlideCard from './slide-card/slide-card';
import styles from './side-bar.module.css';
import PromoCard from './promo-card/promo-card';

export default function SideBar({children}: PropsWithChildren): JSX.Element {
  return (
    <div className={styles.container}>
      {children}
      <div className={styles.side_bar}>
        <PromoCard cardText="Получай товары БЕСПЛАТНО!" buttonText="Узнать подробнее" />
        {SIDE_CARDS.map(card => (
          <SlideCard key={card.id} imageSrc={card.imageSrc} text={card.text} />
        ))}
      </div>
    </div>
  );
}
