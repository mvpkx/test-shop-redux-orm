import React from 'react';
import styles from './cart.module.css';
import {ReactComponent as PictureOfBag} from './bag.svg';
import {ReactComponent as PictureOfCart} from './cart.svg';
import {ReactComponent as PictureOfLabel} from './label.svg';
import {useDispatch, useSelector} from 'react-redux';
import {
  activeOrderSelector,
  cartVariationSelector,
  variationSelector,
} from '../../models/selectors';
import {RootState} from '../../types/redux-orm-extra-types';
import numberWithSpaces from '../../utils/number-with-spaces';
import CartItem from './cart-item/cart-item';
import {useNavigate} from 'react-router-dom';
import { GIT_REPOSITORY } from '../../utils/constants';

export default function Cart(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleNewOrderClick = () => {
    navigate(`${GIT_REPOSITORY}/new-order`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Корзина</h2>
        {total === 0 ? (
          <></>
        ) : (
          <span
            onClick={() =>
              dispatch({type: 'DELETE_VARIATIONS', payload: {order_id: activeOrder.id}})
            }
            className={styles.clear}
          >
            Очистить корзину
          </span>
        )}
      </div>
      <div className={styles.total_bar}>
        <div className={styles.total_bar_total}>
          <span className={styles.total_bar_total_title}>Стоимость корзины:</span>
          <span className={styles.total_bar_total_value}>{numberWithSpaces(total)} ₽</span>
        </div>
        {total === 0 ? (
          <></>
        ) : (
          <button onClick={handleNewOrderClick} className={styles.total_bar_button}>
            Оформить
          </button>
        )}
        <div className={styles.pictures}>
          <PictureOfBag className={styles.picture_of_bag} />
          <PictureOfLabel className={styles.picture_of_label} />
          <PictureOfCart className={styles.picture_of_cart} />
        </div>
      </div>
      {cartVariations.length === 0 ? (
        <></>
      ) : (
        <div className={styles.items_container}>
          {cartVariations.map((variation: any, index: number) =>
            index + 1 === cartVariations.length ? (
              <CartItem
                key={variation.id}
                id={variation.id}
                variation_id={variation.variation_id}
                quantity={variation.quantity}
                notLast={false}
              />
            ) : (
              <CartItem
                key={variation.id}
                id={variation.id}
                variation_id={variation.variation_id}
                quantity={variation.quantity}
                notLast={true}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
