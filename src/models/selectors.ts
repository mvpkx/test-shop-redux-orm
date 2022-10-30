import {createSelector} from 'redux-orm';
import {VariationFields} from '../types/orm-model-fields';
import {SelectorWithTwoArgs} from '../types/redux-orm-extra-types';
import getCategoryFilterArg from '../utils/get-filter-arg';
import orm from './orm';

const categoriesSelector: SelectorWithTwoArgs = createSelector(orm, orm.Category);

const productVariationSelector: SelectorWithTwoArgs = createSelector(orm, orm.Product.variations);

const imagesSelector: SelectorWithTwoArgs = createSelector(orm, orm.Product.images);

const variationPropertyValueSelector: SelectorWithTwoArgs = createSelector(
  orm,
  orm.Variation.variation_property_values
);

const variationPropertySelector: SelectorWithTwoArgs = createSelector(orm, orm.VariationProperty);

const variationPropertyListValueSelector: SelectorWithTwoArgs = createSelector(
  orm,
  orm.VariationPropertyListValue
);

const cartVariationCountSelector = createSelector(orm, session => {
  const order_id: number = session.Order.filter({is_ordered: false}).first()?.getId();
  const cartVariations = session.CartVariation.filter({order_id}).toRefArray();
  return cartVariations.reduce(
    (count, cartVariations: any) => count + Number(cartVariations.quantity),
    0
  );
});

const variationSelector: SelectorWithTwoArgs = createSelector(orm, orm.Variation);

const cartVariationSelector: SelectorWithTwoArgs = createSelector(orm, orm.Order.cart_variations);

const activeOrderSelector = createSelector(orm, session => {
  return session.Order.filter({is_ordered: false}).first()?.ref;
});

const ordersSelector = createSelector(orm, session => {
  return session.Order.filter({is_ordered: true}).toRefArray();
});

const productSelector: SelectorWithTwoArgs = createSelector(orm, orm.Product);

const productsSelector = createSelector(orm, session => {
  return session.Product.all()
    .filter(getCategoryFilterArg(session))
    .toModelArray()
    .map(product => {
      const {ref} = product;

      return {
        ...ref,
        minPrice: Math.min(
          ...product.variations.toRefArray().map((variation: VariationFields) => variation.price)
        ),
      };
    })
    .filter(product => isFinite(product.minPrice));
});

export {
  categoriesSelector,
  productVariationSelector,
  productsSelector,
  imagesSelector,
  variationPropertyValueSelector,
  variationPropertySelector,
  variationPropertyListValueSelector,
  cartVariationCountSelector,
  activeOrderSelector,
  cartVariationSelector,
  variationSelector,
  productSelector,
  ordersSelector,
};
