import React, { ReactNode, useEffect } from "react";
import { styled } from "@linaria/react";

const ModalContainer = styled.div`
  display: none;
  &.show {
    display: block;
  }
`;

export type ModalProps = {
  show: boolean;
  onClose: React.MouseEventHandler;
  onConfirm: React.MouseEventHandler;
  children: ReactNode;
  title: string;
};

/**
 *
 * @param {modalProps} props
 * @return {JSX.Element}
 */
export default function Modal(props: ModalProps) {
  const { show, onConfirm, onClose, children, title } = props;

  useEffect(() => {
    document.getElementsByClassName("modal show").length > 0
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");

    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  const className = ["modal", show && "show"].filter(Boolean).join(" ");

  return (
    <ModalContainer className={className}>
      {title}
      <div className="modal-container">{children}</div>
      <button onClick={onConfirm}>確認</button>
      <button onClick={onClose}>取消</button>
    </ModalContainer>
  );
}
