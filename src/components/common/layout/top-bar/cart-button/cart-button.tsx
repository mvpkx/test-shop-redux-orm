import React from 'react';
import styles from './cart-button.module.css';
import {useNavigate} from 'react-router-dom';
import {ReactComponent as CartIcon} from './cart-icon.svg';
import {useSelector} from 'react-redux';
import {cartVariationCountSelector} from '../../../../../models/selectors';
import {RootState} from '../../../../../types/redux-orm-extra-types';
import { GIT_REPOSITORY } from '../../../../../utils/constants';

export default function CartButton(): JSX.Element {
  const navigate = useNavigate();
  const count = useSelector<RootState, any>(cartVariationCountSelector);

  return (
    <div className={styles.circle} onClick={() => navigate(`${GIT_REPOSITORY}/cart`)} title="Корзина">
      <CartIcon className={styles.icon} />
      {count !== 0 ? (
        <div className={styles.items_number}>
          <span>{count}</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
