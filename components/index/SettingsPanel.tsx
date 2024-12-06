import React from "react";
import { styled } from "@linaria/react";

const SettingsPanelContainer = styled.div`
  flex: 0 0 200px;
  background: #fbfbfa;
  padding: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Setting = styled.div`
  padding: 5px;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    cursor: pointer;
  }
`;

/**
 * @return {JSX.Element}
 */
const SettingsPanel = ({
  onCreateNote,
  onCreateCategory,
}: {
  onCreateNote: () => void;
  onCreateCategory: () => void;
}): JSX.Element => {
  return (
    <SettingsPanelContainer>
      <Setting onClick={onCreateNote}>Create Note</Setting>
      <Setting onClick={onCreateCategory}>Create Category</Setting>
    </SettingsPanelContainer>
  );
};

export default SettingsPanel;
