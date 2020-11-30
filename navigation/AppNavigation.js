import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import TabNavigation from "./TabNavigation";

const AppNavigation = createStackNavigator(
  {
    Home: HomeScreen,
    Section: SectionScreen,
  },
  {
    mode: "modal", //show screens in modal mode
    headerMode: "none", //hides header
  }
);

export default createAppContainer(TabNavigation);
