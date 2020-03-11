import React from "react";

import Nav from "./Nav";
import Menu from "./Menu";

import styles from './styles.module.scss';

interface State {
  isOpen: boolean;
}

class HeaderMobile extends React.Component {
  state: State = { isOpen: false };
  openMenu = () => this.setState({ isOpen: true })
  closeMenu = () => this.setState({ isOpen: false })
  render() {
    return (
      <div className={styles.main}>
        <Nav open={this.openMenu} />
        <Menu onClose={this.closeMenu} isOpen={this.state.isOpen} />
      </div>
    )
  }
}

export default HeaderMobile;