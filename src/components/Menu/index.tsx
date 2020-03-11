import React from "react";
import { Link } from "react-router-dom";

import styles from "./Menu.module.css";
import translate from "./translate";

class Menu extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        <nav><ul>
          <li><Link to="">{translate("shopping")}</Link></li>
          <li><Link to="">{translate("event")}</Link></li>
          <li><Link to="">{translate("blog")}</Link></li>
          <li><Link to="">{translate("career")}</Link></li>
          <li><Link to="">{translate("wholesale")}</Link></li>
          <li><Link to="">{translate("introduction")}</Link></li>
        </ul></nav>
      </div>
    )
  }
}

export default Menu;
