import React from "react";

import styles from "./_styles.module.scss";

interface Props {
  title?: string;
  content?: JSX.Element;
  small?: boolean;
  center?: boolean;
}


const Panel: React.FC<Props> = (props) => {
  const marginBottom = props.small ? 24 : 48;
  const fontSize = props.small ? 24 : 30;
  const textAlign = props.center ? "center" : "left"
  return (
    <div className={styles.main} style={{ marginBottom }}>
      {props.title &&
        <div
          style={{ fontSize, textAlign }}
          className={styles.header}>{props.title}
        </div>
      }
      {props.content}
      {props.children}
    </div>
  );
}

export default Panel;