import { Box, Button, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { Gradient } from "@mui/icons-material";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Box
      sx={{
        background: 'radial-gradient(circle, rgb(129, 129, 129) 0%, rgb(48, 48, 48) 100%)',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: "32px",
          textAlign: "center",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "16px" }} gutterBottom>
          Registrate
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "32px" }} paragraph>
          Inicia sesion para ingresar a la aplicación.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            bgcolor: "#E66200",
            "&:hover": {
              bgcolor: "#BB6201",
            },
          }}
          onClick={() =>
            loginWithRedirect({
              appState: {
                returnTo: window.location.pathname,
              },
            })
          }
        >
          Iniciar sesión
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
