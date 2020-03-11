import React from "react";
import { Classes } from "@blueprintjs/core";

import styles from "./styles.module.scss";

interface Props {
  slug: string;
}

const badges: {
  [slug: string]: {}
} = {
  'best-selling': (
    <div>
      <div>Bán chạy nhất</div>
      <div className={Classes.TEXT_LARGE}>NĂM 2019</div>
    </div>  ),

  'best-for-ca-phe-sua-da': (
    <div>
      <div>Phù hợp nhất</div>
      <div>CAFÉ SỮA ĐÁ</div>
    </div>
  ),

  'best-for-espresso': (
    <div>
      <div>Phù hợp nhất</div>
      <div className={Classes.TEXT_LARGE}>ESPRESSO</div>
    </div>
  ),

  'coffee-expo': (
    <div>
      <div>Ưu đãi đặc biệt</div>
      <div className={Classes.TEXT_LARGE}>COFFEE EXPO</div>
    </div>
  ),
}

const Badge: React.FC<Props> = ({ slug }) => {
  return (
    <div className={styles.main}>{badges[slug]}</div>
  )
}

export default Badge;