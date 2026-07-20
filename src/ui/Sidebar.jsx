import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1 px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 26rem;
    padding-top: 4.8rem;
    transform: translateX(${(props) => (props.open ? "0" : "-100%")});
    transition: transform 200ms ease-in-out;
    z-index: 40;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
  }
`;

const Backdrop = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.show ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 30;
  }
`;

function Sidebar({ isOpen = false, onClose = () => {} }) {
  return (
    <>
      <StyledSidebar open={isOpen}>
        <Logo />
        <MainNav onNavigate={onClose} />
      </StyledSidebar>
      <Backdrop show={isOpen} onClick={onClose} />
    </>
  );
}

export default Sidebar;
