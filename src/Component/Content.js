import React from "react";
import styled from "styled-components";

const Content = ({ pharmacy }) => {
  const showPharmacyPosition = addr => {
    //모바일 지도 연결
    if (navigator.userAgent.indexOf("Mobi")) {
      window.open(
        `https://m.map.naver.com/search2/search.nhn?query=${addr}&siteSort=0&sm=clk#/map`
      );
    }
    //웹 지도 연결
    else {
      window.open("https://map.naver.com/v5/search/" + addr);
    }
  };

  return (
    <Wrapper>
      <Button
        onClick={showPharmacyPosition.bind(null, pharmacy.addr)}
        status={pharmacy.remain_stat}
      >
        <h2>{pharmacy.name}</h2>
        <TextWrapper>
          <p>
            <strong>주소 :</strong>
            {pharmacy.addr}
          </p>
          <p>
            <strong>입고시간 :</strong> {pharmacy.stock_at}
          </p>
          <p>
            <strong>현재재고 :</strong>{" "}
            {pharmacy.remain_stat === "plenty"
              ? "100개 이상"
              : pharmacy.remain_stat === "some"
              ? "30 ~ 100개"
              : pharmacy.remain_stat === "few"
              ? "2~30개"
              : pharmacy.remain_stat === "empty"
              ? "재고없음"
              : "재고없음"}
          </p>
        </TextWrapper>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.li``;

const TextWrapper = styled.div`
  text-align: left;
`;

const Button = styled.button`
  pointer-events: ${props => {
    const { status } = props;
    switch (status) {
      case "empty":
        return "none";
      case "break":
        return "none";
      default:
        return "auto";
    }
  }};
  cursor: ${props => {
    const { status } = props;
    switch (status) {
      case "empty":
        return "none";
      case "break":
        return "intial";
      default:
        return "pointer";
    }
  }};
  width: 100%;
  border-radius: 10px;
  background-color: ${props => {
    const { status } = props;
    switch (status) {
      case "break":
        return "gray";
      case "empty":
        return "gray";
      case "plenty":
        return "yellowgreen";
      case "some":
        return "yellow";
      case "few":
        return "rgb(234, 93, 73)";
      default:
        return "initial";
    }
  }};
`;

export default Content;
