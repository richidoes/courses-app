import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Avatar() {
  const handleState = useSelector((state) => {
    return {
      name: state.name,
      avatar: state.avatar,
    };
  });
  const dispatch = useDispatch();

  function handleUser() {
    return {
      updateName: (name) =>
        dispatch({
          type: "UPDATE_NAME",
          name,
        }),
      updateAvatar: (avatar) =>
        dispatch({
          type: "UPDATE_AVATAR",
          avatar,
        }),
    };
  }

  function loadState() {
    AsyncStorage.getItem("state").then((serializedState) => {
      const state = JSON.parse(serializedState);
      console.log(state);

      if (state) {
        handleUser().updateName(state.name);
        handleUser().updateAvatar(state.avatar);
      }
    });
  }

  useEffect(() => {
    loadState();
  }, []);

  return <Image source={{ uri: handleState.avatar }} />;
}

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
