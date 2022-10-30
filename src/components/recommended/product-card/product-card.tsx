import React, {useState} from 'react';
import styles from './product-card.module.css';
import {ProductFields} from '../../../types/orm-model-fields';
import Categories from '../categories/categories';
import ProductModal from '../product-modal/product-modal';
import {useSelector} from 'react-redux';
import {imagesSelector} from '../../../models/selectors';
import {RootState} from '../../../types/redux-orm-extra-types';

interface ProductCardProps {
  product: ProductFields;
}

export default function ProductCard({product}: ProductCardProps): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const images = useSelector<RootState, any[]>(state => imagesSelector(state, product.id));

  const handleModalClick = (): void => {
    setShowModal(!showModal);
  };
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        {images.length !== 0 ? (
          <img
            key={images[0].id}
            src={images[0].image_url}
            className={styles.image}
            alt={product.name}
          />
        ) : (
          <div className={styles.no_image}>
            <span>Нет фотографии</span>
          </div>
        )}
        <Categories
          categories={product.categories}
          className={styles.categories}
          clickable={false}
        />
      </div>
      <span className={styles.name}>{product.name}</span>
      <span className={styles.price}>от {product.minPrice} ₽</span>
      <button className={styles.button} onClick={() => setShowModal(!showModal)}>
        Добавить в корзину
      </button>
      <ProductModal
        show={showModal}
        product={product}
        onClick={handleModalClick}
        onDismiss={handleModalClick}
      />
    </div>
  );
}
