import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { styled } from "@linaria/react";
import { useRouter } from "next/router";
import { PreviewType } from "@/components/Layout";
import classNames from "classnames";

const HeaderContainer = styled.div`
  z-index: 10;
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
  position: sticky;
  top: 0;
  background: #ffffff;
  padding: 15px;
  box-shadow: 0 0 0 1px #dadce0;
  p {
    font-family: "Dancing Script", cursive;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    padding: 10px;
  }
  .button-default {
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    &:hover {
      background: rgba(0, 0, 0, 0.03);
    }
    &.active {
      background: rgba(0, 0, 0, 0.03);
      box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
      border-radius: 0;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  border: 1px solid #dadce0;
  border-radius: 5px;
  > :not(:last-child) {
    border-radius: 0%;
    border-right: 1px solid #dadce0;
  }
`;

type HeaderProps = {
  previewType: PreviewType;
  onChoosePreviewType: (previewType: PreviewType) => void;
};

/**
 * @return {JSX.Element}
 */
export default function Header({
  previewType,
  onChoosePreviewType,
}: HeaderProps): JSX.Element {
  const { data: session } = useSession();
  const router = useRouter();
  const showPreviewButton = router.query.noteId;

  return (
    <HeaderContainer>
      <p onClick={() => router.push("/")}>Jwrld</p>
      {showPreviewButton && (
        <ButtonGroup>
          <div
            className={classNames("button-default", {
              active: previewType === PreviewType.Editing,
            })}
            onClick={() => onChoosePreviewType(PreviewType.Editing)}
          >
            <i aria-hidden className="fa fa-pencil" />
          </div>
          <div
            className={classNames("button-default", {
              active: previewType === PreviewType.Reading,
            })}
            onClick={() => onChoosePreviewType(PreviewType.Reading)}
          >
            <i aria-hidden className="fa fa-eye" />
          </div>
        </ButtonGroup>
      )}
      {session?.user ? (
        <div className="button-default" onClick={() => signOut()}>
          Log out
        </div>
      ) : (
        <div className="button-default" onClick={() => signIn()}>
          Log in
        </div>
      )}
    </HeaderContainer>
  );
}
