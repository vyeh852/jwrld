import React from "react";
import { styled } from "@linaria/react";

const SettingsPanelContainer = styled.div`
  flex: 0 0 200px;
  background: #fbfbfa;
  padding: 10px;
  @media (max-width: 768px) {
    display: none;
  }

  > div {
    padding: 5px;
    &:hover {
      cursor: pointer;
      background: rgba(0, 0, 0, 0.04);
    }
  }
`;

/**
 * @return {JSX.Element}
 */
export default function SettingsPanel({
  onCreateNote,
  onCreateCategory,
}: {
  onCreateNote: () => void;
  onCreateCategory: () => void;
}): JSX.Element {
  return (
    <SettingsPanelContainer>
      <div onClick={onCreateNote}>Create Note</div>
      <div onClick={onCreateCategory}>Create Category</div>
    </SettingsPanelContainer>
  );
}
