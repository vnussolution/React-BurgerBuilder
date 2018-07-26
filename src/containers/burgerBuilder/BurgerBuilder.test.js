import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { BurgerBuilder } from "./BurgerBuilder";
import BuilControls from "../../components/burger/buildControls/buildControls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });
  it("should render <BuildControls /> when receiving ingredients", () => {
    wrapper.setProps({ _ingredients: { salad: 0 } });
    expect(wrapper.find(BuilControls)).toHaveLength(1);
  });
});
