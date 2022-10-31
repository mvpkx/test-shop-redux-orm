import React from 'react';
import styles from './user-button.module.css';
import {useNavigate} from 'react-router-dom';
import { GIT_REPOSITORY } from '../../../../../utils/constants';

export default function UserButton(): JSX.Element {
  const navigate = useNavigate();
  return (
    <img
      onClick={() => navigate(`${GIT_REPOSITORY}/orders`)}
      className={styles.avatar}
      src="avatar.png"
      alt="Мои заказы"
      title="Мои заказы"
    />
  );
}
