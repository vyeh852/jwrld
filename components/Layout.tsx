import React, { createContext, useState } from "react";
import Header from "@/components/Header";

export enum PreviewType {
  Editing = "editing",
  Reading = "reading",
}

export const PreviewTypeContext = createContext(PreviewType.Reading);

/**
 * @return {JSX.Element}
 */
const Layout = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [previewType, setPreviewType] = useState(PreviewType.Reading);

  return (
    <>
      <Header
        onChoosePreviewType={(previewType) => setPreviewType(previewType)}
      />
      <PreviewTypeContext.Provider value={previewType}>
        {children}
      </PreviewTypeContext.Provider>
    </>
  );
};

export default Layout;
