import React from "react";
import { styled } from "@linaria/react";

const Container = styled.div`
  position: relative;
  margin: 0 15px;

  @media (min-width: 768px) {
    flex: 1;
  }
`;

const Image = styled.img`
  transition: opacity 0.25s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: auto;

  &[data-active="active"] {
    opacity: 1;
  }
`;

interface FeaturePreviewProps {
  activeIndex: number;
}

const imageSrcs: string[] = ["/static/markdown.png", "/static/drag.gif"];

/**
 * @return {JSX.Element}
 */
const FeaturePreview = ({ activeIndex }: FeaturePreviewProps): JSX.Element => {
  return (
    <Container>
      {imageSrcs.map((imageSrc, index) => (
        <Image
          src={imageSrc}
          key={index}
          data-active={index === activeIndex ? "active" : undefined}
        />
      ))}
    </Container>
  );
};

export default FeaturePreview;
