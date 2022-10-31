import React from 'react';
import styles from './logo-button.module.css';
import {useNavigate} from 'react-router-dom';
import { GIT_REPOSITORY } from '../../../../../utils/constants';

export default function LogoButton(): JSX.Element {
  const navigate = useNavigate();

  return (
    <h1 className={styles.logo} onClick={() => navigate(`${GIT_REPOSITORY}/`)}>
      React
    </h1>
  );
}
