import { CircularProgress } from "@mui/material";
import { themeMUI } from "../../utils/theme-mui";
import { SpinnerContainer } from "./spinner.styles";

const Spinner = () => (
  <SpinnerContainer>
    <CircularProgress
      size={100}
      sx={{ color: themeMUI.palette.primary.main }}
    />
  </SpinnerContainer>
);

export default Spinner;
