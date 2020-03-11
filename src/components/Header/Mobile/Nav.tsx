import React from "react";
import classNames from "classnames";
import { IconNames } from "@blueprintjs/icons";
import { Navbar, Classes, AnchorButton } from "@blueprintjs/core";

import logo from "./logo.svg";
import styles from "./styles.module.scss";
import CartButton from "./CartButton";
import { Link } from "react-router-dom";

interface Props {
  open: () => void;
}

const HeaderMobileNav: React.FC<Props> = ({ open }) => {
  return (
    <Navbar fixedToTop className={classNames(Classes.DARK, styles.nav)}>
      <div className={styles.left}>
        <AnchorButton fill large icon={IconNames.MENU} minimal onClick={open} />
      </div>
      <div className={styles.center}>
        <Link to="/" className={styles.logo}>
          <img alt="logo" src={logo} style={{ width: 30 }} />
        </Link>
      </div>

      <div className={styles.right}>
        <CartButton />
      </div>
    </Navbar>
  )
}

export default HeaderMobileNav;
