import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./BurgerBuilder";
import buildControls from "../../components/Burger/BuildControls/BuildControls";

configure({adapter: new Adapter});

describe("<BurgerBuilder/>", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    })

    it("should render <Buildcontrols/> if ingredients present", () => {
        wrapper.setProps({ingr: {salad: 0}});
        expect(wrapper.find(buildControls)).toHaveLength(1);
    })
})