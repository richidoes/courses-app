import React, { useState } from "react";
import styled from "styled-components";
import {
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const tabBarHeight = 83;

const Project = (props) => {
  const [cardWidth] = useState(new Animated.Value(315));
  const [cardHeight] = useState(new Animated.Value(460));
  const [titleTop] = useState(new Animated.Value(20));
  const [opacity] = useState(new Animated.Value(0));
  const [textHeight] = useState(new Animated.Value(100));

  const dispatch = useDispatch();

  function openCard() {
    if (!props.canOpen) return;

    Animated.spring(cardWidth, {
      toValue: screenWidth,
      useNativeDriver: false,
    }).start();
    if (Platform.OS === "ios") {
      Animated.spring(cardHeight, {
        toValue: screenHeight - tabBarHeight,
        useNativeDriver: false,
      }).start();

      StatusBar.setHidden(true);
    } else {
      Animated.spring(cardHeight, {
        toValue: screenHeight,
        useNativeDriver: false,
      }).start();
    }
    Animated.spring(titleTop, { toValue: 45, useNativeDriver: false }).start();
    Animated.timing(opacity, { toValue: 1, useNativeDriver: false }).start();
    Animated.spring(textHeight, {
      toValue: 1000,
      useNativeDriver: false,
    }).start();

    dispatch({
      type: "OPEN_CARD",
    });
  }

  function closeCard() {
    if (Platform.OS === "ios") StatusBar.setHidden(false);

    Animated.spring(cardWidth, {
      toValue: 315,
      useNativeDriver: false,
    }).start();

    Animated.spring(cardHeight, {
      toValue: 460,
      useNativeDriver: false,
    }).start();

    Animated.spring(titleTop, { toValue: 20, useNativeDriver: false }).start();
    Animated.timing(opacity, { toValue: 0, useNativeDriver: false }).start();
    Animated.spring(textHeight, {
      toValue: 100,
      useNativeDriver: false,
    }).start();

    dispatch({
      type: "CLOSE_CARD",
    });
  }

  return (
    <TouchableWithoutFeedback onPress={() => openCard()}>
      <AnimatedContainer
        style={{ elevation: 10, width: cardWidth, height: cardHeight }}
      >
        <Cover>
          <Image source={props.image} />
          <AnimatedTitle style={{ top: titleTop }}>{props.title}</AnimatedTitle>
          <Author>by {props.author}</Author>
        </Cover>
        <AnimatedText style={{ height: textHeight }}>{props.text}</AnimatedText>
        <AnimatedLinearGradient style={{ height: textHeight }}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
            style={{
              position: "absolute",
              top: -95,
              width: "100%",
              height: "100%",
            }}
          />
        </AnimatedLinearGradient>
        <TouchableOpacity
          style={{ position: "absolute", top: 45, right: 20 }}
          onPress={() => closeCard()}
        >
          <AnimatedCloseView style={{ opacity: opacity }}>
            <Ionicons name="ios-close" size={32} color="#546bfb" />
          </AnimatedCloseView>
        </TouchableOpacity>
      </AnimatedContainer>
    </TouchableWithoutFeedback>
  );
};

export default Project;

const Gradient = styled.View``;

const AnimatedLinearGradient = Animated.createAnimatedComponent(Gradient);

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  align-items: center;
`;

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);

const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 290px;
`;

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 300px;
`;

const AnimatedTitle = Animated.createAnimatedComponent(Title);

const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24px;
  color: #3c4560;
`;

const AnimatedText = Animated.createAnimatedComponent(Text);
