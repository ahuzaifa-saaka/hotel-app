import styled from "styled-components";
import { useUser } from "../services/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
height : 100vh;
background-color: var(--color-grey-50)
display: flex;
align-items: center;
justify-content: center
`;

const ProtectedRoute = ({ children }) => {
  // Load the authenticated user
  const { user, isLoading } = useUser();

  // Loading show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // if there is no authenticated user, redirect to login
  if (!user) return;

  //   if there is a user, render the app
  return children;
};

export default ProtectedRoute;
