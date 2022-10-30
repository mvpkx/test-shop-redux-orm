import {
  CategoryFields,
  FilterProductFields,
  ImageFields,
  OrderFields,
  ProductFields,
  VariationFields,
  VariationPropertyFields,
  VariationPropertyListValueFields,
  VariationPropertyValueFields,
} from './orm-model-fields';

export type CartVariationReducerAction =
  | {
      type: 'ADD_VARIATION';
      payload: {
        variation_id: number;
      };
    }
  | {
      type: 'DELETE_VARIATIONS';
      payload: {order_id: number};
    }
  | {
      type: 'DELETE_VARIATION';
      payload: {id: number};
    }
  | {
      type: 'INCREASE';
      payload: {id: number};
    }
  | {
      type: 'DECREASE';
      payload: {id: number};
    }
  | {
      type: 'UPDATE_QUANTITY';
      payload: {id: number; quantity: number};
    };

export type OrderReducerAction =
  | {
      type: 'CREATE_ORDER';
      payload?: null;
    }
  | {
      type: 'MAKE_ORDER';
      payload: {
        id: number;
        fields: OrderFields;
      };
    };

export type FilterProductReducerAction =
  | {
      type: 'SET_FILTER';
      payload: FilterProductFields;
    }
  | {
      type: 'CLEAR_FILTER';
      payload?: null;
    };

export type ProductReducerAction = {
  type: 'LOAD_PRODUCTS';
  payload: ProductFields[];
};

export type CategoryReducerAction = {
  type: 'LOAD_CATEGORIES';
  payload: CategoryFields[];
};

export type ImageReducerAction = {
  type: 'LOAD_IMAGES';
  payload: ImageFields[];
};

export type VariationReducerAction = {
  type: 'LOAD_VARIATIONS';
  payload: VariationFields[];
};

export type VariationPropertyReducerAction = {
  type: 'LOAD_VARIATION_PROPERTIES';
  payload: VariationPropertyFields[];
};

export type VariationPropertyValueReducerAction = {
  type: 'LOAD_VARIATION_PROPERTY_VALUES';
  payload: VariationPropertyValueFields[];
};

export type VariationPropertyListValueReducerAction = {
  type: 'LOAD_VARIATION_PROPERTY_LIST_VALUES';
  payload: VariationPropertyListValueFields[];
};
