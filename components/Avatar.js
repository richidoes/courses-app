import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function Avatar() {
  const [photo, setPhoto] = useState("");
  const [randomUser, setRandomUser] = useState(rng(1, 11));

  //random number generator
  function rng(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handleState = useSelector((state) => state.name);
  const dispatch = useDispatch();
  function updateName(first_name, last_name) {
    dispatch({
      type: "UPDATE_NAME",
      name: `${first_name} ${last_name}`,
    });
  }

  //api req
  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${randomUser}`).then((user) => {
      const userData = user.data.data;
      // console.log(userData);
      setPhoto(userData.avatar);
      // updateName(userData.first_name, userData.last_name);
    });
  }, []);

  return (
    <Image
      source={photo ? { uri: photo } : require("../assets/avatar-default.jpg")}
    />
  );
}

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
