import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Animated, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MenuItem from "./MenuItem";

const screenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;
let cardWidth = ScreenWidth;

if (cardWidth >= 500) {
  cardWidth = 500;
}

const Menu = () => {
  const [top] = useState(new Animated.Value(screenHeight));

  const handleState = useSelector((state) => state.action);
  const dispatch = useDispatch();

  useEffect(() => {
    toggleMenu();
  }, [handleState]);

  const toggleMenu = () => {
    if (handleState == "openMenu") {
      Animated.spring(top, {
        toValue: 54,
        useNativeDriver: false,
      }).start();
    }
    if (handleState == "closeMenu") {
      Animated.spring(top, {
        toValue: 1200, //this instead of screen height because a problem at close
        useNativeDriver: false,
      }).start();
    }
  };

  const handleMenu = () => {
    return {
      closeMenu: () => dispatch({ type: "CLOSE_MENU" }),
      updateName: (name) => {
        dispatch({
          type: "UPDATE_NAME",
          name,
        });
      },
    };
  };

  const handleLogout = (index) => {
    if (index === 3) {
      handleMenu().closeMenu();
      handleMenu().updateName();
      AsyncStorage.clear();
    }
  };

  return (
    <AnimatedContainer style={{ top: top }}>
      <Cover>
        <Image source={require("../assets/background2.jpg")} />
        <Title>Richard</Title>
        <Subtitle>Developer that Design</Subtitle>
      </Cover>
      <TouchableOpacity
        onPress={() => handleMenu().closeMenu()}
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          marginLeft: -22,
          zIndex: 1,
        }}
      >
        <CloseView style={boxShadow}>
          <Ionicons name="ios-close" size={44} color="#546bfb" />
        </CloseView>
      </TouchableOpacity>
      <Content>
        {items.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleLogout(index)}>
            <MenuItem icon={item.icon} title={item.title} text={item.text} />
          </TouchableOpacity>
        ))}
      </Content>
    </AnimatedContainer>
  );
};

export default Menu;

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const boxShadow = {
  shadowColor: "black",
  shadowOpacity: 0.05,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 10,
  elevation: 8,
};

const Container = styled.View`
  position: absolute;
  background: white;
  width: ${cardWidth}px;
  align-self: center;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 142px;
  background: black;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  height: ${screenHeight}px; /*adding px unit fix warning Expected style "height: 748" to contain units*/
  background: #f0f3f5;
  padding: 50px;
`;

const items = [
  {
    icon: "ios-settings",
    title: "Account",
    text: "settings",
  },
  {
    icon: "ios-albums",
    title: "certificates",
    text: "courses completed",
  },
  {
    icon: "ios-analytics",
    title: "Progress",
    text: "course progress",
  },
  {
    icon: "ios-exit",
    title: "Log out",
    text: "see you soon!",
  },
];
