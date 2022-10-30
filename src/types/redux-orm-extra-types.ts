import {Selector} from 'react-redux';
import {Ref} from 'redux-orm';
import ORM, {IndexedModelClasses, OrmState} from 'redux-orm/ORM';

// <🙈>

export default interface OrmExtended
  extends ORM<IndexedModelClasses<any, string | number | symbol>, string | number | symbol> {
  Category?: any;
  Image?: any;
  Product?: any;
  FilterProduct?: any;
  Variation?: any;
  VariationProperty?: any;
  VariationPropertyValue?: any;
  VariationPropertyListValue?: any;
  CartVariation?: any;
  Order?: any;
}

export interface FilterArg extends Ref<any> {
  category_id?: number;
}

export type AddParameters<
  TFunction extends (...args: any) => any,
  TParameters extends [...args: any]
> = (...args: [...Parameters<TFunction>, ...TParameters]) => ReturnType<TFunction>;

export type RootState = OrmState<IndexedModelClasses<any, string | number | symbol>>;

export type DefaultOrmSelectorType = Selector<RootState, any[]>;

export type SelectorWithTwoArgs = AddParameters<DefaultOrmSelectorType, [x: any]>;

// </🙈>
