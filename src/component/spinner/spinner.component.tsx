import { CircularProgress } from "@mui/material";
import { themeMUI } from "@utils/theme-mui";

const Spinner = () => (
  <div className="flex h-full w-full max-w-300 items-center justify-center">
    <CircularProgress
      size={100}
      sx={{ color: themeMUI.palette.primary.main }}
    />
  </div>
);

export default Spinner;
