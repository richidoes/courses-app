import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import LottieView from "lottie-react-native";
import { Animated, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

export default function Success({ isActive }) {
  const [top] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(0));
  const animationRef = useRef();

  useEffect(() => {
    if (isActive) {
      Animated.timing(top, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacity, {
        toValue: 1,
        useNativeDriver: false,
      }).start();

      animationRef.current.play();
    } else {
      Animated.timing(top, {
        toValue: screenHeight,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacity, {
        toValue: 0,
        useNativeDriver: false,
      }).start();

      animationRef.current.loop = false;
    }

    return () => {};
  }, [isActive]);

  return (
    <AnimatedContainer style={{ top: top, opacity: opacity }}>
      <LottieView
        source={require("../assets/lottie-checked-done.json")}
        autoPlay={false}
        loop={false}
        ref={animationRef}
      />
    </AnimatedContainer>
  );
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
