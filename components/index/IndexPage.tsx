import React, { useState } from "react";
import { styled } from "@linaria/react";
import ButtonGroups from "@/components/index/ButtonGroups";
import FeaturePreview from "@/components/index/FeaturePreview";

const Container = styled.div`
  padding: 20px;

  @media (min-width: 768px) {
    display: flex;
    padding: 100px;
    .button-groups,
    .feature-preview {
      flex: 1;
    }
  }
`;

/**
 * @return {JSX.Element}
 */
export default function IndexPage(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Container>
      <ButtonGroups
        setActiveIndex={(index: number) => setActiveIndex(index)}
        activeIndex={activeIndex}
      />
      <FeaturePreview activeIndex={activeIndex} />
    </Container>
  );
}
