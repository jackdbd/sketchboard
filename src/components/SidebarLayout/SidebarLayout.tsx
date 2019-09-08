import clsx from 'clsx';
import React, { useEffect } from 'react';

interface Props {
  /**
   * The sidebar and the non-sidebar element.
   */
  children: React.ReactElement[];

  /**
   * Make the adjacent elements adopt their natural height.
   */
  noStretch?: boolean;

  /**
   * The side where the sidebar is on.
   */
  side: 'left' | 'right';
}

export const SidebarLayout: React.FC<Props> = props => {
  const { children, noStretch, side } = props;

  useEffect(() => {
    if (children.length !== 2) {
      throw new Error('The Sidebar layout must have exactly 2 children');
    }
  }, [children, side]);

  return (
    <div
      className={clsx(`with-sidebar-on-the-${side}`)}
      style={{ height: '100%', flexGrow: 1 }}
    >
      <div
        className={clsx(
          noStretch ? 'not-stretched-wrapper' : 'stretched-wrapper'
        )}
      >
        {children}
      </div>
    </div>
  );
};
