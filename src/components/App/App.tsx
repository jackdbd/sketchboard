import clsx from 'clsx';
import React from 'react';

import { InteractionsLogger } from '../InteractionsLogger';
import { Main } from '../Main';
import { Sidebar } from '../Sidebar';
import { SidebarLayout } from '../SidebarLayout';

console.log(Main, InteractionsLogger);

export const App: React.FC<{}> = () => {
  return (
    <SidebarLayout side={'right'}>
      <div className={clsx('font-size:biggish')}>
        Duis sagittis, est sit amet gravida tristique, purus lectus venenatis
        urna, id #FFFFFF risus ut nunc. Nulla vel magna sit amet dui lobortis
        commodo vitae vel nulla sit amet ante hendrerit tempus. Aliquam
        tincidunt velit sit amet ante hendrerit tempus. Nulla lobortis tempus
        commodo. Sed dapibus, lectus sit amet adipiscing egestas, mauris est
        viverra nibh, iaculis pretium sem orci aliquet mauris. Donec tempus
        tempus tellus, ac lacinia turpis mattis ac. Cras molestie risus a enim
        Convallis; vitae luctus libero lacinia. Suspendisse potenti cras
        molestie, risus a enim convallis vitae luctus libero lacinia. Maecenas
        sit amet tellus nec mi gravida posuere non pretium magna. Vestibulum
        text-align : justify lacus. Nulla vel magna sit amet dui lobortis
        commodo vitae vel nulla sit amet ante hendrerit tempus. Donec et nisi
        dictum felis sollicitudin congue. Sed mauris arcu, aliquet ultrices
        malesuada sed, pretium id CTRL + V massa. Aliquam nisl enim, tristique
        tempus placerat at, posuere in lectus. Nulla lobortis tempus commodo.
        Fusce ac sodales magna. Potenti et eros sed justo – commodo bibendum non
        at nunc. Donec a congue leo. Cras molestie risus a enim ‘convallis
        vitae’ luctus libero lacinia. Duis sagittis, est sit amet gravida
        tristique, purus lectus venenatis urna, id molestie magna risus ut nunc.
        Maecenas sit amet tellus – nec mi gravida posuere non pretium magna.
        Nulla vel magna sit — amet dui lobortis commodo — vitae vel nulla. Nunc
        iaculis risus vel orci ornare dignissim sed vitae nulla. Sed dapibus,
        lectus sit amet adipiscing egestas, mauris est viverra nibh, iaculis
        pretium sem orci aliquet mauris. Vestibulum sit amet ipsum lacus… Cras
        molestie risus a enim ‘convallis vitae’ luctus libero lacinia. Fusce ac
        sodales CSS magna. Nulla vel magna sit amet dui lobortis commodo vitae
        vel nulla sit amet ante hendrerit tempus. Sed dapibus, lectus sit amet
        adipiscing egestas, mauris est viverra nibh (iaculis pretium sem orci
        aliquet mauris). Nulla lobortis tempus commodo. Aliquam nisl enim,
        tristique tempus placerat at, posuere in lectus. Sed dapibus, lectus sit
        amet adipiscing egestas, mauris est viverra nibh (iaculis pretium sem
        orci aliquet mauris). Donec tempus tempus tellus, ac lacinia turpis
        mattis ac! Nunc iaculis risus vel orci ornare dignissim sed vitae nulla.
        Nulla auctor eleifend turpis consequat pharetra. Nulla vel magna sit
        amet dui lobortis commodo vitae vel nulla. Suspendisse potenti. Maecenas
        sit amet tellus nec mi gravida posuere non pretium magna. Nulla lobortis
        tempus commodo. Nulla vel magna sit — amet dui lobortis commodo — vitae
        vel nulla. Vestibulum sit amet ipsum lacus. Nulla auctor eleifend turpis
        consequat pharetra. Maecenas sit amet tellus nec mi gravida posuere non
        pretium magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse potenti cras molestie, risus a enim convallis vitae luctus
        libero lacinia. Fusce ac sodales .generate() magna.
      </div>
      <Sidebar label={'some label'} />
    </SidebarLayout>
  );
};
