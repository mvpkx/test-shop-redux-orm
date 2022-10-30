import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {imagesSelector, productSelector, variationSelector} from '../../../models/selectors';
import {RootState} from '../../../types/redux-orm-extra-types';
import { API } from '../../../utils/constants';
import numberWithSpaces from '../../../utils/number-with-spaces';
import styles from './cart-item.module.css';
import {ReactComponent as DeleteIcon} from './delete.svg';

interface CartItemProps {
  id: number;
  variation_id: number;
  quantity: number;
  notLast: boolean;
}

export default function CartItem({
  id,
  variation_id,
  quantity,
  notLast,
}: CartItemProps): JSX.Element {
  const dispatch = useDispatch();

  const variation = useSelector<RootState, any>(state => variationSelector(state, variation_id));

  const images = useSelector<RootState, any[]>(state =>
    imagesSelector(state, variation.product_id)
  );

  const product: any = useSelector<RootState, any[]>(state =>
    productSelector(state, variation.product_id)
  );

  return (
    <div className={`${styles.container} ${notLast ? styles.not_last : ''}`}>
      <div className={styles.image_container}>
        {images.length !== 0 ? (
          <img
            key={images[0].id}
            src={API + images[0].image_url}
            className={styles.image}
            alt={product.name}
          />
        ) : (
          <div className={styles.no_image}>
            <span>Нет фотографии</span>
          </div>
        )}
      </div>
      <div className={styles.product_name}>
        <span>{product.name}</span>
      </div>
      <div className={styles.quantity_container}>
        <span
          onClick={() => dispatch({type: 'DECREASE', payload: {id}})}
          className={styles.decrease}
        >
          -
        </span>
        <input
          type="number"
          onChange={e =>
            dispatch({type: 'UPDATE_QUANTITY', payload: {id, quantity: e.target.value}})
          }
          value={quantity}
          className={styles.quantity_input}
        />
        <span
          onClick={() => dispatch({type: 'INCREASE', payload: {id}})}
          className={styles.increase}
        >
          +
        </span>
      </div>
      <div className={styles.total_price}>
        <span>{numberWithSpaces(variation.price * quantity)} ₽</span>
      </div>
      <DeleteIcon
        onClick={() => dispatch({type: 'DELETE_VARIATION', payload: {id}})}
        className={styles.delete_icon}
      />
    </div>
  );
}
