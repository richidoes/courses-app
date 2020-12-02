import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components";

const screenWidth = Dimensions.get("window").width;

function getCourseWidth(screenWidth) {
  let cardWidth = screenWidth - 40;
  if (screenWidth >= 768) {
    cardWidth = (screenWidth - 60) / 2;
  }

  if (screenWidth >= 1024) {
    cardWidth = (screenWidth - 80) / 3;
  }
  return cardWidth;
}

const Course = (props) => {
  const [cardWidth, setCardWidth] = useState(getCourseWidth(screenWidth));

  const adaptLayout = (dimensions) => {
    setCardWidth(getCourseWidth(dimensions.window.width));
  };

  useEffect(() => {
    Dimensions.addEventListener("change", adaptLayout);
    return () => {
      Dimensions.removeEventListener("change", adaptLayout);
    };
  }, []);

  return (
    <Container style={{ width: cardWidth, elevation: 8 }}>
      <Cover>
        <Image source={props.image} />
        <Logo source={props.logo} resizeMode="contain" />
        <Subtitle>{props.subtitle}</Subtitle>
        <Title>{props.title}</Title>
      </Cover>
      <Content>
        <Avatar source={props.avatar} />
        <Caption>{props.caption}</Caption>
        <Author>{props.author}</Author>
      </Content>
    </Container>
  );
};

export default Course;

const Container = styled.View`
  width: 335px;
  height: 335px;
  background: white;
  margin: 10px 10px;
  border-radius: 14px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
  height: 260px;
  border-top-right-radius: 14px;
  border-top-left-radius: 14px;
  overflow: hidden;
  justify-content: flex-end;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Logo = styled.Image`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: -24px;
`;

const Title = styled.Text`
  width: 170px;
  font-size: 24px;
  color: white;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  margin-left: 20px;
`;

const Content = styled.View`
  padding-left: 62px;
  height: 75px;
  justify-content: center;
`;

const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 16px;
`;

const Caption = styled.Text`
  font-size: 14px;
  color: #3c4560;
  font-weight: 500;
`;

const Author = styled.Text`
  font-size: 13px;
  color: #b8bece;
  font-weight: 500;
  margin-top: 4px;
`;
