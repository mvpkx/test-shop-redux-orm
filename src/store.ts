import {configureStore} from '@reduxjs/toolkit';
import {reducer as ormReducer} from './models/orm';

const store = configureStore({
  reducer: {
    orm: ormReducer,
  },
});
export default store;
