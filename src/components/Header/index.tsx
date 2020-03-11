import React from "react";
import Media from "react-media";

import Full from "./Full";
import Mobile from "./Mobile";

const Header: React.FC = () => {
  return (
    <Media query={{ maxWidth: 700 }}>
      {(isPhone: boolean) => isPhone
        ? <Mobile />
        : <Full />
      }
    </Media>
  );
}

export default Header;
