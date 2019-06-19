class ComponentTest {
  constructor(private readonly componentName: string) {}

  public renderContent() {
    return `import React from 'react';
import {mountWithAppContext} from 'tests/modern';
import ${this.componentName}, {Props} from '../${this.componentName}';

describe('<${this.componentName} />', () => {
  const mockProps: Props = {};

  it('ensure component renders', async () => {
    const component = await mountWithAppContext(
      <${this.componentName} {...mockProps} />
    );

    expect(component).toBeDefined();
  });
});
`;
  }
}

export default ComponentTest;
