import React, { useState } from "react";

import styles from "./styles.module.css";

interface IProps {
  text: string;
}

export const TEST_ID_CONTAINER = "board-container-test-id";

export const Board: React.FC<IProps> = props => {
  const { text } = props;

  const [clicks, setClicks] = useState(0);

  const onClick = () => {
    setClicks(clicks + 1);
  };

  return (
    <div
      className={styles.board}
      data-testid={TEST_ID_CONTAINER}
      onClick={onClick}
    >
      {`${text} (${clicks} clicks)`}
    </div>
  );
};
