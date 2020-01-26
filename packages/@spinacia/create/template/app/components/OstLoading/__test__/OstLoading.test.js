import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import OstLoading from '../index';

const TestDom = () => (
  <div>
    <span>
      adsf
    </span>
  </div>
);

describe('[inside_OstLoading]: ', () => {
  it('calls componentDidMount', () => {
    sinon.spy(OstLoading.prototype, 'componentDidMount');
    mount((
      <OstLoading isLoading={true}>
        <div className="unique" />
      </OstLoading>
    ));
    expect(OstLoading.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('renders children when passed in', () => {
    const wrapper = shallow((
      <OstLoading isLoading={true}>
        <div className="unique" />
      </OstLoading>
    ));

    expect(wrapper.props().show).to.equal(true);


    expect(wrapper.contains(
      <div className="ost-loading">
        <span className="ost-loading-svg" ></span>
      </div>
    )).to.equal(true);
  });
});


describe('[inside_OstLoading-2]: ', () => {
  it('rendered the title', () => {
    const wrapper = mount(
      <TestDom show />
    );

    expect(wrapper.html()).to.contain('span');
  });
});
