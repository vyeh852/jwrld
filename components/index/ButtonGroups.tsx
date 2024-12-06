import React, { ReactNode } from "react";
import { styled } from "@linaria/react";

const Container = styled.div`
  margin-bottom: 35px;

  @media (min-width: 768px) {
    flex: 1;
  }
`;

const Title = styled.h1`
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  padding: 22px;
  margin-bottom: 10px;
  color: rgba(51, 51, 51, 0.7);
  cursor: pointer;

  &[data-active="active"] {
    border-radius: 6px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    color: #333;
  }
`;

const ButtonTitle = styled.span`
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
`;

const ButtonDescription = styled.p`
  margin-top: 5px;
  font-size: 15px;
`;

interface ButtonGroupsProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

interface ButtonProps {
  active: boolean;
  onActiveButton: () => void;
  children: ReactNode;
}

/**
 * @return {JSX.Element}
 */
const ButtonGroups = ({
  activeIndex,
  setActiveIndex,
}: ButtonGroupsProps): JSX.Element => {
  return (
    <Container>
      <Title>快速且方便的建立你的筆記吧</Title>
      <Button
        active={activeIndex === 0}
        onActiveButton={() => setActiveIndex(0)}
      >
        <ButtonTitle>使用 markdown 製作任何文件</ButtonTitle>
        <ButtonDescription>
          待辦事項、技術筆記、畫流程圖、甚至簡報
        </ButtonDescription>
      </Button>
      <Button
        active={activeIndex === 1}
        onActiveButton={() => setActiveIndex(1)}
      >
        <ButtonTitle>快速建立出自定義的分類</ButtonTitle>
        <ButtonDescription>
          使用拖曳方式，分類筆記就是這麼簡單
        </ButtonDescription>
      </Button>
    </Container>
  );
};

export default ButtonGroups;

/**
 * @return {JSX.Element}
 */
const Button = ({
  active,
  onActiveButton,
  children,
}: ButtonProps): JSX.Element => {
  return (
    <ButtonContainer
      data-active={active ? "active" : undefined}
      onClick={onActiveButton}
      onMouseEnter={onActiveButton}
    >
      {children}
    </ButtonContainer>
  );
};
