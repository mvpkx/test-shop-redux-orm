import React from 'react';
import {useSelector} from 'react-redux';
import {variationPropertySelector} from '../../../../../models/selectors';
import {VariationPropertyValueFields} from '../../../../../types/orm-model-fields';
import {RootState} from '../../../../../types/redux-orm-extra-types';
import typeNumberToKey from '../../../../../utils/typeNumberToKey';
import PropertyFromList from './property-from-list/property-from-list';
import styles from './property.module.css';

interface VariationPropertyValueProps {
  variationPropertyValue: VariationPropertyValueFields;
}

export default function VariationPropertyValue({
  variationPropertyValue,
}: VariationPropertyValueProps): JSX.Element {
  const {product_variation_property_id, product_variation_property_list_value_id} =
    variationPropertyValue;

  const {name, type} = useSelector<RootState, any>(state =>
    variationPropertySelector(state, product_variation_property_id)
  );

  if (type === 3) {
    return (
      <PropertyFromList
        product_variation_property_list_value_id={product_variation_property_list_value_id}
      />
    );
  } else {
    return (
      <div className={styles.container}>
        <span className={styles.title}>{name}</span>
        <div className={styles.dots}></div>
        <span>{variationPropertyValue[typeNumberToKey(type)]}</span>
      </div>
    );
  }
}
