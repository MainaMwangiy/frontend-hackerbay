import React from 'react';
import { shallow } from 'enzyme';
import Grid from '../components/Grid';

describe('Board component', () => {
  it('Should render Board component', () => {
    const component = shallow(<Grid size={2} grid={[3,3]} updateBoard={()=> {}} sodas={[3]} />);
  
    expect(component).toMatchSnapshot();
  });
  
});