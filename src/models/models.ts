import {Model, attr, fk, ModelType, Session, many} from 'redux-orm';
import {
  CartVariationReducerAction,
  CategoryReducerAction,
  FilterProductReducerAction,
  ImageReducerAction,
  OrderReducerAction,
  ProductReducerAction,
  VariationPropertyListValueReducerAction,
  VariationPropertyReducerAction,
  VariationPropertyValueReducerAction,
  VariationReducerAction,
} from '../types/orm-reducers';
import {
  CartVariationFields,
  CategoryFields,
  FilterProductFields,
  ImageFields,
  OrderFields,
  ProductFields,
  VariationFields,
  VariationPropertyFields,
  VariationPropertyListValueFields,
  VariationPropertyValueFields,
} from '../types/orm-model-fields';

export class Order extends Model<typeof Order, OrderFields> {
  static reducer(action: OrderReducerAction, Order: ModelType<Order>, session: Session<any>): void {
    const {type, payload} = action;
    switch (type) {
      case 'CREATE_ORDER':
        Order.create({is_ordered: false});
        break;
      case 'MAKE_ORDER': {
        const {id, fields} = payload;
        Order.withId(id as never)?.update({...fields, is_ordered: true});
        Order.create({is_ordered: false});
        break;
      }
      default:
        break;
    }
  }
}

Order.modelName = 'Order';

Order.fields = {
  id: attr(),
  ordered_at: attr(),
  delivery_time: attr(),
  delivery_date: attr(),
  customer_name: attr(),
  customer_phone: attr(),
  customer_address: attr(),
};

export class CartVariation extends Model<typeof CartVariation, CartVariationFields> {
  static reducer(
    action: CartVariationReducerAction,
    CartVariation: ModelType<CartVariation>,
    session: Session<any>
  ): void {
    const {type, payload} = action;
    switch (type) {
      case 'ADD_VARIATION': {
        const {variation_id} = payload;
        const order_id: number = session.Order.filter({is_ordered: false}).first().getId();
        const variation = session.CartVariation.all().filter({variation_id});
        console.log('Active order ID:', order_id);

        if (variation.exists()) {
          const id = variation.first().getId();
          const cartVariation = CartVariation.withId(id as never);

          if (cartVariation?.ref.quantity != null) {
            cartVariation.update({quantity: +cartVariation?.ref.quantity + 1});
          }
        } else {
          CartVariation.create({variation_id, order_id, quantity: 1});
        }
        break;
      }

      case 'DELETE_VARIATION': {
        const {id} = payload;
        const variation = CartVariation.withId(id as never);
        if (variation != null) {
          variation.delete();
        }
        break;
      }

      case 'INCREASE': {
        const {id} = payload;
        const variation = CartVariation.withId(id as never);
        if (variation && variation.ref.quantity) {
          const quantity = variation.ref.quantity + 1;
          variation.set('quantity', quantity);
        }
        break;
      }

      case 'DECREASE': {
        const {id} = payload;
        const variation = CartVariation.withId(id as never);
        if (variation && variation.ref.quantity && variation.ref.quantity !== 1) {
          const quantity = variation.ref.quantity - 1;
          variation.set('quantity', quantity);
        }
        break;
      }

      case 'UPDATE_QUANTITY': {
        const {id, quantity} = payload;
        const variation = CartVariation.withId(id as never);
        if (variation && variation.ref.quantity && Number(quantity) !== 0) {
          variation.set('quantity', Number(quantity));
        }
        break;
      }

      case 'DELETE_VARIATIONS': {
        const {order_id} = payload;
        CartVariation.filter({order_id}).delete();
        break;
      }

      default:
        break;
    }
  }
}

CartVariation.modelName = 'CartVariation';

CartVariation.fields = {
  id: attr(),
  order_id: fk('Order', 'cart_variations'),
  variation_id: fk('Variation', 'cart_variations'),
  quantity: attr(),
};

export class FilterProduct extends Model<typeof FilterProduct, FilterProductFields> {
  static reducer(
    action: FilterProductReducerAction,
    FilterProduct: ModelType<FilterProduct>,
    session: Session<any>
  ): void {
    const {type, payload} = action;
    switch (type) {
      case 'SET_FILTER':
        if (session.FilterProduct.all().toModelArray().length === 0) {
          FilterProduct.create(payload);
        } else {
          FilterProduct.delete();
          FilterProduct.create(payload);
        }

        break;

      case 'CLEAR_FILTER': {
        FilterProduct.delete();
        break;
      }

      default:
        break;
    }
  }
}

FilterProduct.modelName = 'FilterProduct';

FilterProduct.fields = {
  category_id: attr(),
};

export class Product extends Model<typeof Product, ProductFields> {
  static reducer(
    action: ProductReducerAction,
    Product: ModelType<Product>,
    session: Session<any>
  ): void {
    const {type, payload} = action;
    switch (type) {
      case 'LOAD_PRODUCTS': {
        payload.forEach(product => Product.create(product));
        break;
      }

      default:
        break;
    }
  }
}

Product.modelName = 'Product';

Product.fields = {
  id: attr(),
  name: attr(),
  category_id: fk('Category', 'products'),
  description: attr(),
};

export class Category extends Model<typeof Category, CategoryFields> {
  static reducer(
    action: CategoryReducerAction,
    Category: ModelType<Category>,
    session: Session<any>
  ): void {
    const {type, payload} = action;
    switch (type) {
      case 'LOAD_CATEGORIES': {
        payload.forEach(category => Category.create(category));
        break;
      }

      default:
        break;
    }
  }
}

Category.modelName = 'Category';

Category.fields = {
  name: attr(),
};

export class Image extends Model<typeof Image, ImageFields> {
  static reducer(action: ImageReducerAction, Image: ModelType<Image>, session: Session<any>): void {
    const {type, payload} = action;
    switch (type) {
      case 'LOAD_IMAGES': {
        payload.forEach(image => Image.create(image));
        break;
      }

      default:
        break;
    }
  }
}

Image.modelName = 'Image';

Image.fields = {
  id: attr(),
  image_name: attr(),
  product_id: fk('Product', 'images'),
  image_url: attr(),
};

export class Variation extends Model<typeof Variation, VariationFields> {
  static reducer(
    action: VariationReducerAction,
    Variation: ModelType<Variation>,
    session: Session<any>
  ): void {
    const {type, payload} = action;
    switch (type) {
      case 'LOAD_VARIATIONS': {
        payload.forEach(variation => Variation.create(variation));
        break;
      }

      default:
        break;
    }
  }
}

Variation.modelName = 'Variation';

Variation.fields = {
  id: attr(),
  product_id: fk('Product', 'variations'),
  price: attr(),
  stock: attr(),
  variationProperties: many({
    to: 'VariationProperty',
    relatedName: 'variations',
    through: 'VariationPropertyValue',
  }),
};

export class VariationProperty extends Model<typeof VariationProperty, VariationPropertyFields> {
  static reducer(
    action: VariationPropertyReducerAction,
    VariationProperty: ModelType<VariationProperty>,
    session: Session<any>
  ): void {
    const {type, payload} = action;
    switch (type) {
      case 'LOAD_VARIATION_PROPERTIES': {
        payload.forEach(variationProperty => VariationProperty.create(variationProperty));
        break;
      }

      default:
        break;
    }
  }
}

VariationProperty.modelName = 'VariationProperty';

VariationProperty.fields = {
  id: attr(),
  name: attr(),
  type: attr(),
};

export class VariationPropertyValue extends Model<
  typeof VariationPropertyValue,
  VariationPropertyValueFields
> {
  static reducer(
    action: VariationPropertyValueReducerAction,
    VariationPropertyValue: ModelType<VariationPropertyValue>,
    session: Session<any>
  ): void {
    const {type, payload} = action;
    switch (type) {
      case 'LOAD_VARIATION_PROPERTY_VALUES': {
        payload.forEach(variationPropertyValue =>
          VariationPropertyValue.create(variationPropertyValue)
        );
        break;
      }

      default:
        break;
    }
  }
}

VariationPropertyValue.modelName = 'VariationPropertyValue';

VariationPropertyValue.fields = {
  id: attr(),
  product_variation_id: fk('Variation', 'variation_property_values'),
  product_variation_property_id: fk('VariationProperty', 'variation_property_values'),
  value_string: attr(),
  value_int: attr(),
  value_float: attr(),
  product_variation_property_list_value_id: fk(
    'VariationPropertyListValue',
    'variation_property_values'
  ),
};

export class VariationPropertyListValue extends Model<
  typeof VariationPropertyListValue,
  VariationPropertyListValueFields
> {
  static reducer(
    action: VariationPropertyListValueReducerAction,
    VariationPropertyListValue: ModelType<VariationPropertyListValue>,
    session: Session<any>
  ): void {
    const {type, payload} = action;
    switch (type) {
      case 'LOAD_VARIATION_PROPERTY_LIST_VALUES': {
        payload.forEach(variationPropertyListValue =>
          VariationPropertyListValue.create(variationPropertyListValue)
        );
        break;
      }

      default:
        break;
    }
  }
}

VariationPropertyListValue.modelName = 'VariationPropertyListValue';

VariationPropertyListValue.fields = {
  id: attr(),
  product_variation_property_id: fk('VariationProperty', 'variation_property_list_values'),
  title: attr(),
  value: attr(),
};
