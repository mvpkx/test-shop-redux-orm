import React from 'react';
import {ProductFields} from '../../../types/orm-model-fields';
import ProductCard from '../product-card/product-card';
import styles from './product-list.module.css';

interface ProductListProps {
  products: ProductFields[];
}

export default function ProductList({products}: ProductListProps): JSX.Element {
  if (!Array.isArray(products) || products.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
