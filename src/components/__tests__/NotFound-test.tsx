import * as React from 'react';
import NotFound from '../NotFound';
import * as renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';


test('Test NotFound Snapshot', () => {
  const component = renderer.create(
    <Router><NotFound /></Router>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
