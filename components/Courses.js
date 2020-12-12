import React from "react";
import styled from "styled-components";

import Course from "../components/Course";
import { courses } from "../components/LocalData";

const Courses = () => (
  <Container>
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
  </Container>
);

export default Courses;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding-left: 10px;
`;
