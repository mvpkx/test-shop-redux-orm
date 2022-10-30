import {ORM, createReducer} from 'redux-orm';
import OrmExtended from '../types/redux-orm-extra-types';
import * as models from './models';

const orm: OrmExtended = new ORM({stateSelector: state => state.orm});
const spreadableModels = Object.values(models);

orm.register(...spreadableModels);

const reducer = createReducer(orm);

export {orm, reducer};
export default orm;
