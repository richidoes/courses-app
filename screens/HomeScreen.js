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
import Logo from "../components/Logo";
import Course from "../components/Course";
import Menu from "../components/Menu";
import Avatar from "../components/Avatar";
import ModalLogin from "../components/ModalLogin";
import NotificationButton from "../components/NotificationButton";
import Notifications from "../components/Notifications";
import { logos, courses } from "../components/LocalData";
import { openLogin, openMenu, openNotif } from "../redux/togglesDucks";

const CardsQuery = gql`
  {
    cardsCollection(order: [caption_ASC]) {
      items {
        title
        subtitle
        image {
          url
        }
        subtitle
        caption
        logo {
          url
        }
        content
      }
    }
  }
`;

export default function HomeScreen({ navigation }) {
  const [scale] = useState(new Animated.Value(1));
  const [opacity] = useState(new Animated.Value(1));

  const action = useSelector((store) => store.toggle.action);
  const name = useSelector((store) => store.user.name);
  const dispatch = useDispatch();

  useEffect(() => {
    StatusBar.setBarStyle("dark-content", true);
  }, []);

  useEffect(() => {
    toggleMenu();
  }, [action]);

  const toggleMenu = () => {
    if (action == "openMenu") {
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
    if (action == "closeMenu") {
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

  const handleAvatar = () => {
    if (name !== "Stranger") {
      dispatch(openMenu());
    } else {
      dispatch(openLogin());
    }
  };
  return (
    <RootView>
      <Menu />
      <Notifications />
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
              <Name>{name}</Name>
              <TouchableOpacity
                onPress={() => dispatch(openNotif())}
                style={{ position: "absolute", right: 20, top: 5 }}
              >
                <NotificationButton />
              </TouchableOpacity>
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
