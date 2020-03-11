import React from "react";
import styles from "./Panel.module.scss";
import { Classes } from "@blueprintjs/core";

export interface PanelProps {
  year: string;
  title: string;
  image: string;
  description: string;
  backgroundPosition?: string;
}

const Panel: React.FC<PanelProps> = (props) => {
  const style = { backgroundImage: `url(${props.image})`, backgroundPosition: props.backgroundPosition };
  return (
    <div className={`${styles.main} ${Classes.DARK}`} style={style}>
      <div className={styles.year}>{props.year}</div>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.description}>
        {props.description.split("\n").map(line => (<mark key={line}>{line}<br/></mark>))}
      </div>
    </div>
  );
}

export default Panel;
