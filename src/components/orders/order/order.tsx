import React from 'react';
import {useSelector} from 'react-redux';
import {cartVariationSelector, variationSelector} from '../../../models/selectors';
import {OrderFields} from '../../../types/orm-model-fields';
import {RootState} from '../../../types/redux-orm-extra-types';
import { DELIVERY_PRICE } from '../../../utils/constants';
import numberWithSpaces from '../../../utils/number-with-spaces';
import styles from './order.module.css';

interface OrderProps {
  order: OrderFields;
}

export default function Order({order}: OrderProps): JSX.Element {
  const cartVariations = useSelector<RootState, any>(state =>
    cartVariationSelector(state, order.id)
  );

  const variations = useSelector<RootState, any>(state =>
    variationSelector(
      state,
      cartVariations.map((variation: any) => variation.variation_id)
    )
  );

  const total = variations
    .map((element: any, index: number) => element.price * cartVariations[index].quantity)
    .reduce((sum: number, el: number) => sum + el, 0);

  const quantity = cartVariations
    .map((variation: any) => variation.quantity)
    .reduce((sum: number, el: number) => sum + el, 0);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h4>Дата заказа</h4>
        <p>{order.ordered_at}</p>
      </div>
      <div className={styles.info}>
        <h4>Статус заказа</h4>
        <p>Ожидает оплаты</p>
      </div>
      <div className={styles.info}>
        <h4>Номер заказа</h4>
        <p>#{order.id}</p>
      </div>
      <div className={styles.info}>
        <h4>Кол-во товаров</h4>
        <p>{quantity} шт.</p>
      </div>
      <div className={styles.info}>
        <h4>Стоимость заказа </h4>
        <p>{numberWithSpaces(total + DELIVERY_PRICE)} ₽</p>
      </div>
      <div className={styles.info}>
        <h4>Адрес доставки</h4>
        <p>{order.customer_address}</p>
      </div>
    </div>
  );
}
