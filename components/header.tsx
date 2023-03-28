import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { styled } from "@linaria/react";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

/**
 * @return {JSX.Element}
 */
export default function Header(): JSX.Element {
  const { data: session } = useSession();

  return (
    <HeaderContainer>
      <p>jwrld</p>
      {session?.user ? (
        <button onClick={() => signOut()}>登出</button>
      ) : (
        <button onClick={() => signIn()}>登入</button>
      )}
    </HeaderContainer>
  );
}
