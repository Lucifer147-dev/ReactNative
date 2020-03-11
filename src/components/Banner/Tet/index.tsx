import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.scss";

const BannerTet: React.FC = () => {
  return (
  <Link className={styles.main} to="/tet">
    <img alt="bg-1" className={styles.daoTren} src="/static/tet/dao-tren.png" />
    <img alt="bg-2" className={styles.daoDuoi} src="/static/tet/dao-duoi.png" />
    <img alt="title" className={styles.title} src="/static/tet/title.svg" />
    <img alt="icon" className={styles.iconic} src="/static/tet/iconic.png" />
  </Link>
  );
}

export default BannerTet;