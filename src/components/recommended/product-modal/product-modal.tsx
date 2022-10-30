import React from 'react';
import '@reach/dialog/styles.css';
import {DialogOverlay, DialogContent} from '@reach/dialog';
import styles from './product-modal.module.css';
import {ProductFields} from '../../../types/orm-model-fields';
import {useDispatch, useSelector} from 'react-redux';
import {productVariationSelector} from '../../../models/selectors';
import {RootState} from '../../../types/redux-orm-extra-types';
import Variation from './variation/variation';

interface ProductModalProps {
  onClick: () => void;
  onDismiss: () => void;
  product: ProductFields;
  show: boolean;
}

export default function ProductModal({
  onClick,
  onDismiss,
  product,
  show,
}: ProductModalProps): JSX.Element {
  const dispatch = useDispatch();
  const variations = useSelector<RootState, any[]>(state =>
    productVariationSelector(state, product.id)
  );

  if (!Array.isArray(variations) || variations.length === 0) {
    return <></>;
  }

  const handleClick = (variation_id: number): void => {
    dispatch({type: 'ADD_VARIATION', payload: {variation_id}});
    onClick();
  };

  return (
    <DialogOverlay className={styles.overlay} onDismiss={onDismiss} isOpen={show}>
      <DialogContent className={styles.content}>
        <h2 className={styles.name}>{product.name}</h2>
        <h3 className={styles.title}>Выберите доступную вариацию</h3>
        <div className={styles.variations}>
          {variations.map(variation => (
            <Variation onClick={handleClick} key={variation.id} variation={variation} />
          ))}
        </div>
        <button onClick={onClick} className={styles.button}>
          Не хочу
        </button>
      </DialogContent>
    </DialogOverlay>
  );
}
