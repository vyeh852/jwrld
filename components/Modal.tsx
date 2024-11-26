import React, { ReactNode, useEffect } from "react";
import { styled } from "@linaria/react";
import classNames from "classnames";

const ModalContainer = styled.div`
  display: none;
  position: fixed;
  transition: all 0.3s ease-out;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: min(80vw, 400px);
  background-color: #ffffff;
  z-index: 500;
  border-radius: 6px;
  &.show {
    display: block;
  }
  > .modal-title {
    padding: 8px 15px;
    background-color: #f8f8f8;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  > .modal-container {
    padding: 8px;
  }
  .button-group {
    padding: 0 8px 8px 8px;
    display: flex;
    flex-direction: row-reverse;
    > .confirm {
      padding: 5px;
      border-radius: 4px;
      color: #fff;
      background-color: #d9534f;
      border-color: #d43f3a;
      cursor: pointer;
    }
    > .cancel {
      border: 1px solid transparent;
      padding: 5px;
      border-radius: 4px;
      color: #333;
      background-color: #fff;
      border-color: #ccc;
      cursor: pointer;
      margin-right: 5px;
    }
  }
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
  show: boolean;
  onClose: React.MouseEventHandler;
}

const Backdrop = ({ show, onClose }: BackdropProps): JSX.Element | null => {
  return show ? <BackDropContainer onClick={onClose} /> : null;
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
    document.getElementsByClassName("modal show").length > 0
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");

    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <>
      <Backdrop show={show} onClose={onClose} />
      <ModalContainer
        className={classNames("modal", {
          show,
        })}
      >
        <div className="modal-title">{title}</div>
        <div className="modal-container">{children}</div>
        <div className="button-group">
          <div className="confirm" onClick={onConfirm}>
            Confirm
          </div>
          <div className="cancel" onClick={onClose}>
            Cancel
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

export default Modal;
