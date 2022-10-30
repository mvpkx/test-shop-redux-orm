import React from 'react';
import styles from './logo-button.module.css';
import {useNavigate} from 'react-router-dom';

export default function LogoButton(): JSX.Element {
  const navigate = useNavigate();

  return (
    <h1 className={styles.logo} onClick={() => navigate('/')}>
      React
    </h1>
  );
}
