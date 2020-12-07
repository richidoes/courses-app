import React, { useState } from "react";
import styled from "styled-components";
import { PanResponder, Animated } from "react-native";
import { useSelector } from "react-redux";

import Project from "../components/Project";

function getNextIndex(index) {
  let nextIndex = index + 1;
  if (nextIndex > projects.length - 1) {
    return 0;
  }
  return index + 1;
}

function ProjectsScreen() {
  const [pan] = useState(new Animated.ValueXY());
  const [scale] = useState(new Animated.Value(0.9));
  const [translateY] = useState(new Animated.Value(44));
  const [thirdScale] = useState(new Animated.Value(0.8));
  const [ThirdTranslateY] = useState(new Animated.Value(-50));
  const [index, setIndex] = useState(0);
  const [opacity] = useState(new Animated.Value(0));

  const handleState = useSelector((state) => {
    return { action: state.action };
  });

  //handle the animation of card
  const panRespoder = PanResponder.create({
    onMoveShouldSetPanResponder: (event, gestureState) => {
      //this allows us to move the card if not positioned 0px or is opened
      if (gestureState.dx === 0 && gestureState.dy === 0) {
        return false;
      } else if (handleState.action === "openCard") {
        return false;
      } else {
        return true;
      }
    },

    onPanResponderGrant: () => {
      Animated.spring(scale, { toValue: 1, useNativeDriver: false }).start();
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: false,
      }).start();

      Animated.spring(thirdScale, {
        toValue: 0.9,
        useNativeDriver: false,
      }).start();
      Animated.spring(ThirdTranslateY, {
        toValue: 44,
        useNativeDriver: false,
      }).start();

      Animated.timing(opacity, { toValue: 1, useNativeDriver: false }).start();
    },

    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),

    onPanResponderRelease: () => {
      const positionY = pan.y.__getValue();
      // console.log(positionY); get the position on release the card

      Animated.timing(opacity, { toValue: 0, useNativeDriver: false }).start();

      if (positionY > 200) {
        Animated.timing(pan, {
          toValue: { x: 0, y: 1000 },
          useNativeDriver: false,
        }).start(() => {
          pan.setValue({ x: 0, y: 0 });
          scale.setValue(0.9);
          translateY.setValue(44);
          thirdScale.setValue(0.8);
          ThirdTranslateY.setValue(-50);
          setIndex(getNextIndex(index));
        });
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();

        Animated.spring(scale, {
          toValue: 0.9,
          useNativeDriver: false,
        }).start();
        Animated.spring(translateY, {
          toValue: 44,
          useNativeDriver: false,
        }).start();

        Animated.spring(thirdScale, {
          toValue: 0.8,
          useNativeDriver: false,
        }).start();
        Animated.spring(ThirdTranslateY, {
          toValue: -50,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <Container>
      <AnimatedMask style={{ opacity: opacity }} />
      <Animated.View
        style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }] }}
        {...panRespoder.panHandlers}
      >
        <Project
          title={projects[index].title}
          image={projects[index].image}
          author={projects[index].author}
          text={projects[index].text}
          canOpen={true}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale: scale }, { translateY: translateY }],
        }}
      >
        <Project
          title={projects[getNextIndex(index)].title}
          image={projects[getNextIndex(index)].image}
          author={projects[getNextIndex(index)].author}
          text={projects[getNextIndex(index)].text}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -2,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale: thirdScale }, { translateY: ThirdTranslateY }],
        }}
      >
        <Project
          title={projects[getNextIndex(index + 1)].title}
          image={projects[getNextIndex(index + 1)].image}
          author={projects[getNextIndex(index + 1)].author}
          text={projects[getNextIndex(index + 1)].text}
        />
      </Animated.View>
    </Container>
  );
}

export default ProjectsScreen;

const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: -3;
`;

const AnimatedMask = Animated.createAnimatedComponent(Mask);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
`;

const projects = [
  {
    title: "Courses - mock app for learning",
    image: require("../assets/background5.jpg"),
    author: "Ricardo De Leon",
    text:
      "Thanks to Design+Code, I improve my design skill and learned to do animations for my app Courses, a mock app for my portfolio. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    title: "Wonder App - vodka reviews",
    image: require("../assets/background6.jpg"),
    author: "Nikolai belinski",
    text:
      "I went from knowing nothing about design or code to building a production ready app from scratch, tanks to Design+Code. ",
  },
  {
    title: "workout time - exercise videos app",
    image: require("../assets/background7.jpg"),
    author: "Julius Reinhold",
    text:
      "Recently finished the React course. I already rewrote my personal website in @WorkoutTime and I'm very excited with it.",
  },
];
