import React from 'react';
import { shallow } from 'enzyme';
import Cols from '../components/Cols';

describe('Cell component', () => {
  it('Should render cell component', () => {
    const component = shallow(<Cols />);
  
    expect(component).toMatchSnapshot();
  });
  
});