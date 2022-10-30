import React from 'react';
import {useSelector} from 'react-redux';
import {
  variationPropertyListValueSelector,
  variationPropertySelector,
} from '../../../../../../models/selectors';
import {RootState} from '../../../../../../types/redux-orm-extra-types';
import styles from '../property.module.css';

interface PropertyFromListProps {
  product_variation_property_list_value_id: number;
}

export default function PropertyFromList({
  product_variation_property_list_value_id,
}: PropertyFromListProps): JSX.Element {
  const {product_variation_property_id, title} = useSelector<RootState, any>(state =>
    variationPropertyListValueSelector(state, product_variation_property_list_value_id)
  );

  const {name} = useSelector<RootState, any>(state =>
    variationPropertySelector(state, product_variation_property_id)
  );

  return (
    <div className={styles.container}>
      <span className={styles.title}>{name}</span>
      <div className={styles.dots}></div>
      <span>{title}</span>
    </div>
  );
}
