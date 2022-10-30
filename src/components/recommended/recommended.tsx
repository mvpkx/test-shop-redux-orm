import React from 'react';
import {useSelector} from 'react-redux';
import styles from './recommended.module.css';

import {categoriesSelector, productsSelector} from '../../models/selectors';
import Categories from './categories/categories';
import ProductList from './product-list/product-list';
import {RootState} from '../../types/redux-orm-extra-types';

export default function Recommended(): JSX.Element {
  const categories = useSelector<RootState, any[]>(state => categoriesSelector(state, undefined));
  const products = useSelector<RootState, any[]>(productsSelector);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Категории товаров</h2>
      </div>
      <Categories categories={categories} clickable={true} />
      <ProductList products={products} />
    </div>
  );
}
