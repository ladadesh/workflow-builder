import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: 2,
              width: {
                xs: "100%", // Full width on mobile
                sm: 300, // Fixed width for small screens
              },
              boxSizing: "border-box",
            }}
          >
            Workflow Builder
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
