import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Items from "./items";
import Item from "./item/item";

configure({ adapter: new Adapter() });
describe("<Items />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Items />);
  });
  it("should render 2 <Items/> elements if not authenticated ", () => {
    expect(wrapper.find(Item)).toHaveLength(2);
  });
  it("should render 3 <Items/> elements if authenticated ", () => {
    wrapper.setProps({ auth: true });
    expect(wrapper.find(Item)).toHaveLength(3);
  });
  it("should contain logout element if authenticated ", () => {
    wrapper.setProps({ auth: true });
    expect(wrapper.contains(<Item link="/logout">Logout</Item>)).toEqual(true);
  });
});
