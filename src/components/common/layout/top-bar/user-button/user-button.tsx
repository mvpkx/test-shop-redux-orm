import React from 'react';
import styles from './user-button.module.css';
import {useNavigate} from 'react-router-dom';

export default function UserButton(): JSX.Element {
  const navigate = useNavigate();
  return (
    <img
      onClick={() => navigate('/orders')}
      className={styles.avatar}
      src="avatar.png"
      alt="Мои заказы"
      title="Мои заказы"
    />
  );
}
