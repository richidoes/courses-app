import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import CoursesScreen from "../screens/CoursesScreen";
import ProjectsScreen from "../screens/ProjectsScreen";

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Section: SectionScreen,
  },
  {
    headerMode: "none", //hides header
    mode: "modal", //show screens in modal mode
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName === "Section") {
    tabBarVisible = false; //hide tabBar when enter Section
  }

  return {
    tabBarVisible,
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name="ios-home"
        size={26}
        color={focused ? activeColor : inactiveColor}
      />
    ),
  };
};

const CoursesStack = createStackNavigator(
  {
    Courses: CoursesScreen,
  },
  {
    headerMode: "none",
  }
);

CoursesStack.navigationOptions = {
  tabBarLabel: "Courses",
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-albums"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  ),
};

const ProjectStack = createStackNavigator(
  {
    Projects: ProjectsScreen,
  },
  {
    headerMode: "none",
  }
);

ProjectStack.navigationOptions = {
  tabBarLabel: "Projects",
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-folder"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  ),
};

const TabNavigation = createBottomTabNavigator({
  HomeStack,
  CoursesStack,
  ProjectStack,
});

export default TabNavigation;
