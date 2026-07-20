import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import HeaderMenu from "./HeaderMenu";
import UserAvator from "../features/authentication/UserAvatar";

const MobileToggle = styled.button`
  display: none;
  background: transparent;
  border: none;
  font-size: 2.2rem;
  margin-right: auto;

  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

function Header({ onToggle }) {
  return (
    <StyledHeader>
      <MobileToggle aria-label="Toggle sidebar" onClick={onToggle}>
        ☰
      </MobileToggle>

      <UserAvator />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
