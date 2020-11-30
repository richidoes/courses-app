import React from "react";
import styled from "styled-components";
import { Button } from "react-native";

function SectionScreen({ navigation }) {
  return (
    <Container>
      <Text>Section Screen</Text>
      <Button
        title="Close"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </Container>
  );
}

export default SectionScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
