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
import { gql, useQuery } from "@apollo/client";

import Card from "../components/Card";
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Course from "../components/Course";
import Menu from "../components/Menu";
import Avatar from "../components/Avatar";
import ModalLogin from "../components/ModalLogin";

const CardsQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitle
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        subtitle
        caption
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        content
      }
    }
  }
`;

export default function HomeScreen({ navigation }) {
  const [scale] = useState(new Animated.Value(1));
  const [opacity] = useState(new Animated.Value(1));

  const handleState = useSelector((state) => {
    return {
      action: state.action,
      name: state.name,
    };
  });
  const dispatch = useDispatch();

  useEffect(() => {
    StatusBar.setBarStyle("dark-content", true);
  }, []);

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

  const QueryCards = () => {
    const { data, loading, error } = useQuery(CardsQuery);

    if (loading) return <Message>Loading...</Message>;
    // console.log(data.cardsCollection.items);
    if (error) return <Message>Error...</Message>;

    return (
      <CardsContainer>
        {data.cardsCollection.items.map((card, index) => (
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
              content={card.content}
            />
          </TouchableOpacity>
        ))}
      </CardsContainer>
    );
  };

  const handleUser = () => {
    return {
      openMenu: () => dispatch({ type: "OPEN_MENU" }),
      openLogin: () => dispatch({ type: "OPEN_LOGIN" }),
    };
  };

  const handleAvatar = () => {
    if (handleState.name) {
      handleUser().openMenu();
    } else {
      handleUser().openLogin();
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
                onPress={() => handleAvatar()}
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
              <QueryCards />
            </ScrollView>
            <Subtitle>Popular Courses</Subtitle>
            <CoursesContainer>
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
            </CoursesContainer>
          </ScrollView>
        </SafeAreaView>
      </AnimatedContainer>
      <ModalLogin />
    </RootView>
  );
}

const CoursesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 10px;
`;

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;

const CardsContainer = styled.View`
  flex-direction: row;
  padding-left: 10px;
`;

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
