import React from 'react';
import {useSelector} from 'react-redux';
import {variationPropertyValueSelector} from '../../../../models/selectors';
import {VariationFields} from '../../../../types/orm-model-fields';
import {RootState} from '../../../../types/redux-orm-extra-types';
import VariationPropertyValue from './property/property';
import styles from './variation.module.css';

interface VariationProps {
  variation: VariationFields;
  onClick: (variation_id: number) => void;
}

export default function Variation({variation, onClick}: VariationProps): JSX.Element {
  const variationPropertyValues = useSelector<RootState, any[]>(state =>
    variationPropertyValueSelector(state, variation.id)
  );

  return (
    <div className={styles.container}>
      <div className={styles.properties}>
        {variationPropertyValues.length !== 0 ? (
          variationPropertyValues.map(variationPropertyValue => (
            <VariationPropertyValue
              key={variationPropertyValue.id}
              variationPropertyValue={variationPropertyValue}
            />
          ))
        ) : (
          <div className={styles.empty}>
            <p>Нет характеристик</p>
          </div>
        )}
      </div>
      <div className={styles.order}>
        <span className={styles.price}>{variation.price} ₽</span>
        <span className={styles.stock}>в наличии {variation.stock} шт.</span>
        <button className={styles.button} onClick={() => onClick(variation.id)}>
          Эту!
        </button>
      </div>
    </div>
  );
}
