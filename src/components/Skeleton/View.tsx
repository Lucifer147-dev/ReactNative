import React from 'react';
import { Classes } from '@blueprintjs/core';

interface Props {
  square?: boolean;
  count?: number;
  width?: number;
  align?: "left" | "center";
}

const SkeletonView: React.FC<Props> = (props) => {
  const width = props.width || 100;
  const lastWidth = width / 1.5;
  const count = props.count || 1;
  const squareStyle: React.CSSProperties = {
    height: 0,
    width: `${width}%`,
    paddingBottom: `${width}%`,
  };
  const lineStyle = { width: `${width}%`, height: 20, marginBottom: 8 };
  const lastLineStyle = { width: `${lastWidth}%`, height: 20, marginBottom: 8 };
  const style = props.square ? squareStyle : lineStyle;
  return count > 1 ? (
    <div style={{display: "flex", flexDirection: "column", alignItems: props.align}}>
      {new Array(count - 1).fill(null).map((_, index) =>
        <div className={Classes.SKELETON} key={`line-${index}`} style={lineStyle} />
      )}
      <div className={Classes.SKELETON} style={lastLineStyle} />
    </div>
  ) : <div className={Classes.SKELETON} style={style} />;
}

export default SkeletonView;