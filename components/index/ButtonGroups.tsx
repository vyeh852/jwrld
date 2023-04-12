import React, { ReactNode } from "react";
import { styled } from "@linaria/react";
import classNames from "classnames";

const Container = styled.div`
  margin-bottom: 35px;
  > h1 {
    margin-bottom: 30px;
  }
`;

const ButtonContainer = styled.div`
  cursor: pointer;
  padding: 22px;
  color: rgba(51, 51, 51, 0.7);
  margin-bottom: 10px;
  .title {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 5px;
    padding-left: 6px;
  }
  .content {
    margin-top: 5px;
    font-size: 15px;
  }

  &.active {
    border-radius: 6px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    color: #333;
  }
`;

type ButtonGroupsProps = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

type ButtonProps = {
  isActive: boolean;
  onActiveButton: () => void;
  children: ReactNode;
};

/**
 * @return {JSX.Element}
 */
export default function ButtonGroups({
  activeIndex,
  setActiveIndex,
}: ButtonGroupsProps): JSX.Element {
  return (
    <Container className="button-groups">
      <h1>快速且方便的建立你的筆記吧</h1>
      <Button
        isActive={activeIndex === 0}
        onActiveButton={() => setActiveIndex(0)}
      >
        <i aria-hidden className="fa fa-pencil" />
        <span className="title">使用 markdown 製作任何文件</span>
        <p className="content">待辦事項、技術筆記、畫流程圖、甚至簡報</p>
      </Button>
      <Button
        isActive={activeIndex === 1}
        onActiveButton={() => setActiveIndex(1)}
      >
        <i aria-hidden className="fa fa-folder-open-o" />
        <span className="title">快速建立出自定義的分類</span>
        <p className="content">使用拖曳方式，分類筆記就是這麼簡單</p>
      </Button>
    </Container>
  );
}

/**
 * @return {JSX.Element}
 */
function Button({
  isActive,
  onActiveButton,
  children,
}: ButtonProps): JSX.Element {
  return (
    <ButtonContainer
      className={classNames({ active: isActive })}
      onClick={onActiveButton}
      onMouseEnter={onActiveButton}
    >
      {children}
    </ButtonContainer>
  );
}
