import { PropsWithChildren } from "react";
import Header from "@/components/Header/Header";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
