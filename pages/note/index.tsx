import React from "react";
import { styled } from "@linaria/react";

const Paragraph = styled.p`
  font-size: 16px;
  text-align: center;
`;

/**
 * Note Page
 * @return {JSX.Element}
 */
export default function Note(): JSX.Element {
  return <Paragraph>test</Paragraph>;
}
