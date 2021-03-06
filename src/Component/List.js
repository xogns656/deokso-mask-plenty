import React from "react";
import Content from "./Content";
import styled from "styled-components";

const List = ({ maskData }) => {
  return (
    <ListWrapper>
      {maskData.map(curr => (
        <Content pharmacy={curr} key={curr.code} />
      ))}
    </ListWrapper>
  );
};

const ListWrapper = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export default List;
