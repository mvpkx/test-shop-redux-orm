import React from 'react';
import {useSelector} from 'react-redux';
import {ordersSelector} from '../../models/selectors';
import {RootState} from '../../types/redux-orm-extra-types';
import Order from './order/order';
import styles from './orders.module.css';

export default function Orders(): JSX.Element {
  const orders = useSelector<RootState, any>(ordersSelector);

  if (!Array.isArray(orders)) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>История заказов</h2>
      </div>
      <div className={styles.orders}>
        {orders.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
