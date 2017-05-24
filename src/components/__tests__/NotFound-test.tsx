import * as React from 'react';
import NotFound from '../NotFound';
import * as renderer from 'react-test-renderer';

test('Test NotFound Snapshot', () => {
  const component = renderer.create(
    <NotFound />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
