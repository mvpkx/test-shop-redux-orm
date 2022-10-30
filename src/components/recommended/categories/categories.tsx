import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {CategoryFields} from '../../../types/orm-model-fields';
import stringToColour from '../../../utils/string-to-color';
import styles from './categories.module.css';

interface CagtegoriesProps {
  categories: CategoryFields[];
  className?: string;
  clickable: boolean;
}

export default function Categories({
  categories,
  className = '',
  clickable,
}: CagtegoriesProps): JSX.Element {
  const dispatch = useDispatch();
  const [active, setActive] = useState<number | null>(null);

  const handleClick = (id: number): void => {
    if (active === null) {
      setActive(id);
      dispatch({type: 'SET_FILTER', payload: {category_id: id}});
    } else if (active === id) {
      setActive(null);
      dispatch({type: 'CLEAR_FILTER'});
    } else {
      setActive(id);
      dispatch({type: 'SET_FILTER', payload: {category_id: id}});
    }
  };

  if (!Array.isArray(categories) || categories.length === 0) {
    return <></>;
  }

  return (
    <div className={`${styles.container} ${className}`}>
      {categories.map(categorie => (
        <div
          style={{backgroundColor: stringToColour(categorie.name)}}
          key={categorie.id}
          className={`${styles.categorie} ${clickable ? styles.clickable : ''} ${
            active !== categorie.id && active !== null && clickable ? styles.unactive : ''
          }`}
          onClick={() => handleClick(categorie.id)}
        >
          <span>{categorie.name}</span>
        </div>
      ))}
    </div>
  );
}
