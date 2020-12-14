import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateAvatar, updateName } from "../redux/userDucks";

export default function Avatar() {
  const avatar = useSelector((store) => store.user.avatar);
  const name = useSelector((store) => store.user.name);

  const dispatch = useDispatch();

  // function dispatcher() {
  //   return {
  //     updateName: (name) =>
  //       dispatch({
  //         type: "UPDATE_NAME",
  //         name,
  //       }),
  //     updateAvatar: (avatar) =>
  //       dispatch({
  //         type: "UPDATE_AVATAR",
  //         avatar,
  //       }),
  //   };
  // }

  function loadState() {
    AsyncStorage.getItem("state").then((serializedState) => {
      const state = JSON.parse(serializedState);
      // console.log(state);

      if (state) {
        dispatch(updateName(state.name));
        dispatch(updateAvatar(state.avatar));
      }
    });
  }

  useEffect(() => {
    loadState();
  }, []);

  return <Image source={{ uri: avatar }} />;
}

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
