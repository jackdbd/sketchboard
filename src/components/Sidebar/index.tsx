import React, { useState } from "react";

import styles from "./styles.module.css";

interface IProps {
  text: string;
}

export const TEST_ID_CONTAINER = "sidebar-container-test-id";

export const Sidebar: React.FC<IProps> = props => {
  const { text } = props;

  const [clicks, setClicks] = useState(0);

  const onClick = () => {
    setClicks(clicks + 1);
  };

  return (
    <div
      className={styles.sidebar}
      data-testid={TEST_ID_CONTAINER}
      onClick={onClick}
    >
      {`${text} (${clicks} clicks)`}
    </div>
  );
};
