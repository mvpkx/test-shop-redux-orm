import React, {FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {
  activeOrderSelector,
  cartVariationSelector,
  variationSelector,
} from '../../models/selectors';
import {RootState} from '../../types/redux-orm-extra-types';
import {DELIVERY_PRICE} from '../../utils/constants';
import numberWithSpaces from '../../utils/number-with-spaces';
import styles from './new-order.module.css';

export default function NewOrder(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    delivery_date: '',
    delivery_time: '',
    customer_name: '',
    customer_phone: '',
    customer_address: '',
  });
  const activeOrder = useSelector<RootState, any>(activeOrderSelector);

  const cartVariations = useSelector<RootState, any>(state =>
    cartVariationSelector(state, activeOrder?.id)
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({
      type: 'MAKE_ORDER',
      payload: {
        id: activeOrder.id,
        fields: {
          ...fields,
          ordered_at: new Date().toISOString().split('T')[0],
        },
      },
    });
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Доставка</h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form_left}>
          <label className={styles.label}>Когда доставить?</label>
          <div>
            <input
              placeholder="Выберите дату"
              className={styles.input}
              value={fields.delivery_date}
              onChange={e => setFields(prev => ({...prev, delivery_date: e.target.value}))}
            />
            <input
              placeholder="Выберите время"
              className={styles.input}
              value={fields.delivery_time}
              onChange={e => setFields(prev => ({...prev, delivery_time: e.target.value}))}
            />
          </div>
          <label className={styles.label}>Куда доставить? </label>
          <input
            value={fields.customer_address}
            placeholder="Выберите адрес доставки"
            className={styles.input_bordered}
            onChange={e => setFields(prev => ({...prev, customer_address: e.target.value}))}
          />
          <label className={styles.label}>Имя </label>
          <input
            value={fields.customer_name}
            className={styles.input_bordered}
            onChange={e => setFields(prev => ({...prev, customer_name: e.target.value}))}
          />
          <label className={styles.label}>Телефон </label>
          <input
            value={fields.customer_phone}
            className={styles.input_bordered}
            onChange={e => setFields(prev => ({...prev, customer_phone: e.target.value}))}
          />
        </div>
        <div className={styles.form_right}>
          <div className={styles.form_stat}>
            <div>
              <h4>Стоимость товаров:</h4>
              <p>{numberWithSpaces(total)}₽</p>
            </div>
            <div>
              <h4>Стоимость доставки:</h4>
              <p>{numberWithSpaces(DELIVERY_PRICE)}₽</p>
            </div>
            <div className={styles.total}>
              <h4>Итого:</h4>
              <p>{numberWithSpaces(total + DELIVERY_PRICE)}₽</p>
            </div>
          </div>
          <button className={styles.button} type="submit">
            Сделать заказ
          </button>
        </div>
      </form>
    </div>
  );
}
