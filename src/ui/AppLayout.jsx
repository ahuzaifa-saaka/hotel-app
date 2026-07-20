import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import { useEffect, useState } from "react";

const StyledAppLout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  transition: transform 200ms ease-in-out;

  @media (max-width: 768px) {
    padding: 1.6rem;
    transform: ${(props) =>
      props.sidebarOpen ? "translateX(26rem)" : "translateX(0)"};
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <StyledAppLout>
      <Header onToggle={() => setSidebarOpen((s) => !s)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Main
        sidebarOpen={isSidebarOpen}
        onClick={() => isSidebarOpen && setSidebarOpen(false)}
      >
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLout>
  );
}

export default AppLayout;
