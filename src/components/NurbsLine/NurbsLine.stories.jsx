/**
 * NurbsLine.jsx
 */
import React from 'react';
// import generateProps from 'react-generate-props'

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// Mocks/Utils
// import { StorybookRouter } from '../../mocks/next/router'

// Component(s)
import NurbsLine from './NurbsLine';

// Generate some stub properties
// generateProps.init()
// const props = generateProps(NurbsLine);

// Decorators
const CenterDecorator = storyFn => (
  <div className="flex h-screen justify-center items-center">
    { storyFn() }
  </div>
);

// const RouterDecorator = (storyFn) => (
//   <StorybookRouter>{storyFn()}</StorybookRouter>
// )

storiesOf('NurbsLine', module)
  // .addDecorator(RouterDecorator)
  .addDecorator(CenterDecorator)
  .add('with required props', () => (
    <NurbsLine />
  ));
