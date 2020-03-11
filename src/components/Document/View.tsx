import React from "react";
import ReactMarkdown from "react-markdown";
import { Classes } from "@blueprintjs/core";
import classNames from "classnames";

import styles from "./styles.module.scss";
import Skeleton from "components/Skeleton";

interface Props {
  document?: string;
}

const DocumentView: React.FC<Props> = ({ document }) => {
  return (
    <div className={classNames(styles.main, Classes.TEXT_LARGE, Classes.RUNNING_TEXT)}>
      {document
        ? <ReactMarkdown escapeHtml={false} source={document} />
        : (
          <div style={{paddingTop: 36}}>
            <Skeleton width={50} />
            <Skeleton count={20} />
          </div>
        )
      }
    </div>
  );
}

export default DocumentView;
