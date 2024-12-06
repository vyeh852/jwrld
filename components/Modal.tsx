import React, { ReactNode, useEffect } from "react";
import { styled } from "@linaria/react";

const ModalContainer = styled.div`
  position: fixed;
  transition: all 0.3s ease-out;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: min(80vw, 400px);
  background-color: #ffffff;
  z-index: 500;
  border-radius: 6px;
`;

const ModalTitle = styled.div`
  padding: 8px 15px;
  background-color: #f8f8f8;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

const ModalContent = styled.div`
  padding: 8px;
`;

const ButtonGroup = styled.div`
  padding: 0 8px 8px 8px;
  display: flex;
  flex-direction: row-reverse;
`;

const ConfirmButton = styled.div`
  padding: 5px;
  border-radius: 4px;
  color: #fff;
  background-color: #d9534f;
  border-color: #d43f3a;
  cursor: pointer;
`;

const CancelButton = styled.div`
  border: 1px solid transparent;
  padding: 5px;
  border-radius: 4px;
  color: #333;
  background-color: #fff;
  border-color: #ccc;
  cursor: pointer;
  margin-right: 5px;
`;

const BackDropContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

interface BackdropProps {
  onClose: React.MouseEventHandler;
}

const Backdrop = ({ onClose }: BackdropProps): JSX.Element | null => {
  return <BackDropContainer onClick={onClose} />;
};

interface ModalProps {
  show: boolean;
  onClose: React.MouseEventHandler;
  onConfirm: React.MouseEventHandler;
  children: ReactNode;
  title: string;
}

/**
 * @param {ModalProps} props
 * @return {JSX.Element}
 */
const Modal = ({ show, onConfirm, onClose, children, title }: ModalProps) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <>
      <Backdrop onClose={onClose} />
      <ModalContainer>
        <ModalTitle>{title}</ModalTitle>
        <ModalContent>{children}</ModalContent>
        <ButtonGroup>
          <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </ButtonGroup>
      </ModalContainer>
    </>
  );
};

export default Modal;
