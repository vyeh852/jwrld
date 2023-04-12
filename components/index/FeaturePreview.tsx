import React from "react";
import { styled } from "@linaria/react";
import classNames from "classnames";

const Container = styled.div`
  position: relative;
  margin: 0 15px;
  img {
    transition: opacity 0.25s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: auto;
    &.active {
      opacity: 1;
    }
  }
`;

type FeaturePreviewProps = {
  activeIndex: number;
};

const imageSrcs: string[] = ["/static/markdown.png", "/static/drag.gif"];

/**
 * @return {JSX.Element}
 */
export default function FeaturePreview({
  activeIndex,
}: FeaturePreviewProps): JSX.Element {
  return (
    <Container className="feature-preview">
      {imageSrcs.map((imageSrc, index) => (
        <img
          src={imageSrc}
          key={index}
          className={classNames({ active: index === activeIndex })}
        />
      ))}
    </Container>
  );
}
