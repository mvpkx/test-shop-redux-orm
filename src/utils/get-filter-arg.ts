import {IndexedModelClasses} from 'redux-orm/ORM';
import {OrmSession} from 'redux-orm/Session';
import {FilterArg} from '../types/redux-orm-extra-types';

type GetCategoryFilterArgReturnFunc = (arg: any) => boolean;
type GetCategoryFilterArgReturnType = GetCategoryFilterArgReturnFunc | {};
type SessionType = OrmSession<IndexedModelClasses<any, string | number | symbol>>;

export default function getCategoryFilterArg(session: SessionType): GetCategoryFilterArgReturnType {
  if (session.FilterProduct.all().toModelArray().length === 0) {
    return {};
  } else {
    return (product: FilterArg) =>
      product?.category_id === session.FilterProduct.first()?.ref.category_id;
  }
}
