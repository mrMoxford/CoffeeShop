import React from "react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled.h2`
  font-weight: 400;
  font-size: clamp(1.5rem, 4vw, 2rem);
`;
const Contents = styled.div`
  margin-bottom: 1rem;
  font-weight: 300;
`;
const InputContainer = styled.div`
  display: flex;
  background: white;
  width: 100%;
`;
const Input = styled.input`
  flex: 8;
  outline: transparent;
  border: none;
`;
const Button = styled.button`
  display: flex;
  flex: 1;
  border: none;
  background: white;
  color: black;
  outline: transparent;
  justify-content: flex-end;
  align-items: center;
`;
const NewsLetter = () => {
  return (
    <Container>
      <Title>The Chronicles</Title>
      <Contents>
        Follow the Journey and Subscribe to the newsLetter to recieve updates on
        your favourite items.
      </Contents>
      <InputContainer>
        <Input placeholder="Your Email"></Input>
        <Button>
          <IoMdSend size={"clamp(1rem,5vw,2rem)"} />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default NewsLetter;
