import React, { useEffect } from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import MarkdownView from "react-native-showdown";

function SectionScreen({ navigation }) {
  // console.log(navigation.getParam("section"));
  const section = navigation.getParam("section");

  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "ios") {
      StatusBar.setHidden(true);
    }
    return () => {
      StatusBar.setBarStyle("dark-content", true);
    };
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <Cover>
          <Image source={{ uri: section.image.url }} />
          <Wrapper>
            <Logo source={{ uri: section.logo.url }} resizeMode="contain" />
            <Subtitle>{section.subtitle}</Subtitle>
          </Wrapper>
          <Title>{section.title}</Title>
          <Caption>{section.caption}</Caption>
        </Cover>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 40, right: 20 }}
        >
          <CloseView style={boxShadow}>
            <Ionicons
              name="ios-close"
              size={36}
              color="#4775f2"
              style={{ marginTop: -2 }}
            />
          </CloseView>
        </TouchableOpacity>
        <Content>
          <MarkdownView
            body={section.content}
            pureCSS={htmlStyles}
            scalesPageToFit={false}
          />
        </Content>
      </Container>
    </ScrollView>
  );
}

export default SectionScreen;

const htmlStyles = `
      * {
        font-family: -apple-system, Roboto; 
    		margin: 0;
    		padding: 0;
        font-size: 17px; 
        font-weight: normal; 
        color: #3c4560;
        line-height: 24px;
      }
    
      h2 {
        font-size: 20px;
        text-transform: uppercase;
        color: #b8bece;
        font-weight: 600;
        margin-top: 50px;
      }
    
    	p {
    	  margin-top: 20px;
      }
    
      a {
        color: #4775f2;
        font-weight: 600;
        text-decoration: none;
      }
    
      strong {
        font-weight: 700;
      }

      img {
        width: 100%;
        border-radius: 10px;
        margin-top: 20px;
      }

      pre {
        padding: 20px;
        background: #212C4F;
        overflow: hidden;
        word-wrap: break-word;
        border-radius: 10px;
        margin-top: 20px;
      }
      
      code {
        color: white;
      }

    `;

const Content = styled.View`
  height: 1200px;
  padding-left: 8px;
  padding-right: 8px;
`;

const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const boxShadow = {
  elevation: 8,
};

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;
