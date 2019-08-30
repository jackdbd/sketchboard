import React from 'react';

import { useSharedState } from '../../hooks';
import { shapePickerSubject$ } from '../Sidebar';
import { boardSubject$ } from '../Board';

export const InteractionsLogger: React.FC<{}> = () => {
  const [{ circlesDrawn, clickCount, trianglesDrawn }] = useSharedState(
    boardSubject$
  );
  const [{ shape }] = useSharedState(shapePickerSubject$);

  return (
    <div style={{ outline: '0.2rem solid orange' }}>
      <p>{`Selected shape: ${shape}`}</p>
      <p>{`Click count: ${clickCount}`}</p>
      <p>{`Circles drawn: ${circlesDrawn}`}</p>
      <p>{`Triangles drawn: ${trianglesDrawn}`}</p>
    </div>
  );
};
