import renderer from 'react-test-renderer';

import App from './App';

describe('<App />', () => {
  it('has 1 View at root', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.type).toBe('View');
  });
});
