import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import SkinDeep from 'skin-deep';
import { expect } from 'chai';

import { ChildInformationSection } from '../../../../src/client/components/household-information/ChildInformationSection';
import { GrowableTable } from '../../../../src/client/components/form-elements/GrowableTable';
import { makeField } from '../../../../src/common/fields';

describe('<ChildInformationSection>', () => {
  it('Adds children fields when hasChildrenToReport', () => {
    const data = {
      hasChildrenToReport: makeField('')
    };
    const section = SkinDeep.shallowRender(
      <ChildInformationSection data={data}/>
    );
    const inputs = section.everySubTree('ErrorableRadioButton');
    ReactTestUtils.Simulate.click(inputs[0]);
    const table = ReactTestUtils.findRenderedComponentWithType(section, GrowableTable);
    expect(table.length).to.equal(1);
  });
});
