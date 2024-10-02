import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";
import PageContainer from "../page-container/PageContainer";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
};

export default Layout;
