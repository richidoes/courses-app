import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Animated,
  Dimensions,
} from "react-native";
import styled from "styled-components";
import { BlurView } from "expo-blur";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { auth } from "./Firebase";
import Success from "./Success";
import Loading from "./Loading";
import { saveState } from "./AsyncStorage";

const screenHeight = Dimensions.get("window").height;

export default function ModalLogin() {
  const [formData, setFormData] = useState(initialValue());
  const [iconEmail, setIconEmail] = useState(
    require("../assets/icon-email.png")
  );
  const [iconPassword, setIconPassword] = useState(
    require("../assets/icon-password.png")
  );
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [top] = useState(new Animated.Value(screenHeight));
  const [scale] = useState(new Animated.Value(1.3));
  const [translateY] = useState(new Animated.Value(0));
  const [randomUser] = useState(rng(1, 11));

  const handleState = useSelector((state) => {
    return {
      action: state.action,
    };
  });
  const dispatch = useDispatch();

  //random number generator
  function rng(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const retrieveName = async () => {
    try {
      const name = await AsyncStorage.getItem("name");
      if (name !== null) {
        console.log(name);
        handleUser().updateName(name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //async storage
  useEffect(() => {
    retrieveName();
  }, []);

  //animation changes
  useEffect(() => {
    if (handleState.action === "openLogin") {
      Animated.timing(top, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();

      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: false,
      }).start();

      Animated.timing(translateY, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
    }
    if (handleState.action === "closeLogin") {
      setTimeout(() => {
        Animated.timing(top, {
          toValue: screenHeight,
          duration: 0,
          useNativeDriver: false,
        }).start();
        Animated.spring(scale, {
          toValue: 1.3,
          useNativeDriver: false,
        }).start();
      }, 500);

      Animated.timing(translateY, {
        toValue: 1000,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
    return () => {};
  }, [handleState]);

  function handleUser() {
    return {
      closeLogin: () =>
        dispatch({
          type: "CLOSE_LOGIN",
        }),
      updateName: (name) => {
        dispatch({
          type: "UPDATE_NAME",
          name,
        });
      },
      updateAvatar: (avatar) =>
        dispatch({
          type: "UPDATE_AVATAR",
          avatar,
        }),
    };
  }

  //api req
  function getUser() {
    axios.get(`https://reqres.in/api/users/${randomUser}`).then((user) => {
      const userData = user.data.data;
      const name = `${userData.first_name} ${userData.last_name}`;
      const avatar = userData.avatar;

      saveState({ name, avatar });
      handleUser().updateAvatar(avatar);
    });
  }

  function handleLogin() {
    Keyboard.dismiss();
    setIsLoading(true);

    auth
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then((response) => {
        setIsLoading(false);

        if (response) {
          setIsSuccessful(true);

          Alert.alert("Congrats", "You've logged Successfully!");

          getUser();
          handleUser().updateName(response.user.email);

          setTimeout(() => {
            handleUser().closeLogin();
            setIsSuccessful(false);
          }, 1000);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert("Error", error.message);
      });
  }

  //handle input change
  function onChange(e, type) {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  }

  function focusEmail() {
    setIconEmail(require("../assets/icon-email-animated.gif"));
    setIconPassword(require("../assets/icon-password.png"));
  }

  function focusPassword() {
    setIconPassword(require("../assets/icon-password-animated.gif"));
    setIconEmail(require("../assets/icon-email.png"));
  }

  function tabBackground() {
    Keyboard.dismiss();
    setIconPassword(require("../assets/icon-password.png"));
    setIconEmail(require("../assets/icon-email.png"));
    handleUser().closeLogin();
  }

  return (
    <>
      <AnimatedContainer style={{ top: top }}>
        <TouchableWithoutFeedback onPress={tabBackground}>
          <BlurView
            tint="default"
            intesity={100}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />
        </TouchableWithoutFeedback>
        <AnimatedModal
          style={{
            elevation: 8,
            transform: [{ scale: scale }, { translateY: translateY }],
          }}
        >
          <Logo
            source={require("../assets/logo-dc.png")}
            resizeMode="contain"
          />
          <Text>Start Learning</Text>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            onChange={(e) => onChange(e, "email")}
            onFocus={focusEmail}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChange={(e) => onChange(e, "password")}
            onFocus={focusPassword}
          />
          <IconEmail source={iconEmail} resizeMode="contain" />
          <IconPassword source={iconPassword} resizeMode="contain" />
          <TouchableOpacity onPress={handleLogin}>
            <Button style={{ elevation: 8 }}>
              <ButtonText>Log in</ButtonText>
            </Button>
          </TouchableOpacity>
        </AnimatedModal>
      </AnimatedContainer>
      <Success isActive={isSuccessful} />
      <Loading isActive={isLoading} />
    </>
  );
}

const initialValue = () => {
  return {
    email: "",
    password: "",
  };
};

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Modal = styled.View`
  width: 335px;
  height: 370px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;

const AnimatedModal = Animated.createAnimatedComponent(Modal);

const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;

const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  text-align: center;
  color: #b8bece;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  padding-left: 44px;
`;

const Button = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px #c2cbff;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
`;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 169px;
  left: 31px;
`;

const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 229px;
  left: 35px;
`;
