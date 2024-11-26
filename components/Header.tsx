import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { styled } from "@linaria/react";
import { useRouter } from "next/router";
import { PreviewType } from "@/components/Layout";

const HeaderContainer = styled.div`
  z-index: 10;
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background: #ffffff;
  padding: 15px;
  box-shadow: 0 0 0 1px #dadce0;
`;

const Logo = styled.h1`
  margin: 0;
  font-family: "Dancing Script", cursive;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  padding: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  border: 1px solid #dadce0;
  border-radius: 5px;
`;

const Button = styled.div`
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;

  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }

  &:active {
    background: rgba(0, 0, 0, 0.03);
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    border-radius: 0;
  }
`;

const PreviewButton = styled(Button)<{ $active?: boolean }>`
  border-left: 1px solid #dadce0;
  border-radius: 0;
`;

interface HeaderProps {
  onChoosePreviewType: (previewType: PreviewType) => void;
}

/**
 * @param {HeaderProps} props
 * @return {JSX.Element}
 */
const Header = ({ onChoosePreviewType }: HeaderProps): JSX.Element => {
  const { data: session } = useSession();
  const router = useRouter();
  const showPreviewButton = router.query.noteId;

  return (
    <HeaderContainer>
      <Logo onClick={() => router.push("/")}>Jwrld</Logo>
      {showPreviewButton && (
        <ButtonGroup>
          <Button onClick={() => onChoosePreviewType(PreviewType.Editing)}>
            <i aria-hidden className="fa fa-pencil" />
          </Button>
          <PreviewButton
            onClick={() => onChoosePreviewType(PreviewType.Reading)}
          >
            <i aria-hidden className="fa fa-eye" />
          </PreviewButton>
        </ButtonGroup>
      )}
      {session?.user ? (
        <Button onClick={() => signOut()}>Log out</Button>
      ) : (
        <Button onClick={() => signIn()}>Log in</Button>
      )}
    </HeaderContainer>
  );
};

export default Header;