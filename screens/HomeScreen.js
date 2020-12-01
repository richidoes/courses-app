import React, { useEffect, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Course from "../components/Course";
import Menu from "../components/Menu";
import Avatar from "../components/Avatar";

export default function HomeScreen({ navigation }) {
  const [scale, setScale] = useState(new Animated.Value(1));
  const [opacity, setOpacity] = useState(new Animated.Value(1));

  const handleState = useSelector((state) => {
    return {
      action: state.action,
      name: state.name,
    };
  });
  const dispatch = useDispatch();
  // console.log(handleState);

  useEffect(() => {
    toggleMenu();
  }, [handleState]);

  const toggleMenu = () => {
    if (handleState.action == "openMenu") {
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: false,
      }).start();
      Animated.spring(opacity, {
        toValue: 0.5,
        useNativeDriver: false,
      }).start();

      StatusBar.setBarStyle("light-content", true);
    }
    if (handleState.action == "closeMenu") {
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: false,
      }).start();
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: false,
      }).start();

      StatusBar.setBarStyle("dark-content", true);
    }
  };

  return (
    <RootView>
      <Menu />
      <AnimatedContainer
        style={{ transform: [{ scale: scale }], opacity: opacity }}
      >
        <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TitleBar>
              <TouchableOpacity
                onPress={() => dispatch({ type: "OPEN_MENU" })}
                style={{ position: "absolute", top: 0, left: 20 }}
              >
                <Avatar />
              </TouchableOpacity>
              <Title>Welcome back</Title>
              <Name>{handleState.name}</Name>
              <NotificationIcon
                style={{ position: "absolute", right: 20, top: 5 }}
              />
            </TitleBar>
            <ScrollView
              style={{
                flexDirection: "row",
                padding: 20,
                paddingLeft: 12,
                paddingTop: 30,
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {logos.map((logo, index) => (
                <Logo key={index} image={logo.image} text={logo.text} />
              ))}
            </ScrollView>

            <Subtitle>Continue Learning</Subtitle>
            <ScrollView
              horizontal={true}
              style={{ paddingBottom: 30 }}
              showsHorizontalScrollIndicator={false}
            >
              {Cards.map((card, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate("Section", {
                      section: card,
                    });
                  }}
                >
                  <Card
                    title={card.title}
                    image={card.image}
                    caption={card.caption}
                    logo={card.logo}
                    subtitle={card.subtitle}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Subtitle>Popular Courses</Subtitle>
            {courses.map((course, index) => (
              <Course
                key={index}
                image={course.image}
                title={course.title}
                subtitle={course.subtitle}
                logo={course.logo}
                author={course.author}
                avatar={course.avatar}
                caption={course.caption}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </AnimatedContainer>
    </RootView>
  );
}

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  /* margin-top: 10px; */
  text-transform: uppercase;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 60px;
  padding-left: 80px;
`;

const logos = [
  {
    image: require("../assets/logo-react.png"),
    text: "React",
  },
  {
    image: require("../assets/redux.png"),
    text: "Redux",
  },
  {
    image: require("../assets/styled.png"),
    text: "Styled-components",
  },
  {
    image: require("../assets/logo-figma.png"),
    text: "Figma",
  },
  {
    image: require("../assets/graphql.png"),
    text: "GraphQL",
  },
  {
    image: require("../assets/firebase.png"),
    text: "Firebase",
  },
];

const Cards = [
  {
    title: "React Native Basics",
    image: require("../assets/background11.jpg"),
    subtitle: "React Native",
    caption: "1 of 12 sections",
    logo: require("../assets/logo-react.png"),
  },
  {
    title: "Redux Basics",
    image: require("../assets/background12.jpg"),
    subtitle: "Redux",
    caption: "2 of 12 sections",
    logo: require("../assets/redux.png"),
  },
  {
    title: "Styled Components Basics",
    image: require("../assets/background13.jpg"),
    subtitle: "Styled Components",
    caption: "3 of 12 sections",
    logo: require("../assets/styled.png"),
  },
  {
    title: "Figma Basics",
    image: require("../assets/background14.jpg"),
    subtitle: "Figma",
    caption: "4 of 12 sections",
    logo: require("../assets/logo-figma.png"),
  },
];

const courses = [
  {
    title: "React from scratch",
    subtitle: "12 sections",
    image: require("../assets/background3.jpg"),
    logo: require("../assets/logo-react.png"),
    author: "Richard DLeon",
    avatar: require("../assets/avatar.jpg"),
    caption: "Complete guide to learn how to work with the React library",
  },
  {
    title: "Database with Firebase",
    subtitle: "8 sections",
    image: require("../assets/background14.jpg"),
    logo: require("../assets/firebase.png"),
    author: "Richard DLeon",
    avatar: require("../assets/avatar.jpg"),
    caption: "Learn how to create a database for your projects using Firebase",
  },
  {
    title: "GraphQL for beginners",
    subtitle: "10 sections",
    image: require("../assets/background16.jpg"),
    logo: require("../assets/graphql.png"),
    author: "Richard DLeon",
    avatar: require("../assets/avatar.jpg"),
    caption:
      "Know the most used query language for client-server communication",
  },
  {
    title: "Design System in Figma",
    subtitle: "13 sections",
    image: require("../assets/background6.jpg"),
    logo: require("../assets/logo-figma.png"),
    author: "Richard DLeon",
    avatar: require("../assets/avatar.jpg"),
    caption:
      "Complete guide to designing a site using a collaborative design tool",
  },
];
