import {
  MUIButtonContainer,
  SignUpBtn,
  LoginBtn,
} from "../button/button.styled";

const AuthNoUser = () => {
  return (
    <MUIButtonContainer>
      <LoginBtn to="/login">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18px"
          height="18px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 21v-2h7V5h-7V3h9v18zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"
          ></path>
        </svg>
        <span>&nbsp; Log In</span>
      </LoginBtn>
      <SignUpBtn to="/signup">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18px"
          height="18px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11.5 2a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11M23 19h-4v4h-2v-4h-4v-2h4v-4h2v4h4zm-10.124-5a6.47 6.47 0 0 0-1.376 4c0 1.509.514 2.897 1.376 4H2v-2a6 6 0 0 1 6-6z"
          ></path>
        </svg>
        <span>&nbsp; Create Account</span>
      </SignUpBtn>
    </MUIButtonContainer>
  );
};

export default AuthNoUser;
