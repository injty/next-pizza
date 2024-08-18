"use client";

import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { FC, Fragment, PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Fragment>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
      <NextTopLoader />
    </Fragment>
  );
};
