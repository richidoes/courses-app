import React from "react";
import styled from "styled-components";

const Logo = (props) => {
  return (
    <Container style={boxShadow}>
      <Image source={props.image} resizeMode="contain" />
      <Text>{props.text}</Text>
    </Container>
  );
};

export default Logo;

const Container = styled.View`
  flex-direction: row;
  background: white;
  height: 60px;
  padding: 12px 16px 12px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  align-items: center;
  margin: 0px 8px;
  margin-bottom: 5px;
`;

const Image = styled.Image`
  width: 36px;
  height: 36px;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 17px;
  margin-left: 8px;
`;

const boxShadow = {
  shadowColor: "black",
  shadowOpacity: 0.05,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 10,
  elevation: 2,
};