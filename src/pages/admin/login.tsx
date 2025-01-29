import { useAdminLogin } from "@/api/admin/useAdminLogin";
import {
  Button,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { mutateAsync: login } = useAdminLogin();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError("");
        login({ password }).then((res) => {
          if (res.status === "success") {
            location.href = "/admin";
          }
        }).catch((error) => {
          setError(error.message);
        });
      }}
    >
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          rowGap: "2rem",
          width: "20rem",
          height: "12rem",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: "30%",
          left: 0,
          margin: "auto",
          padding: "1rem",
        }}
      >
        <Stack flexDirection="column" alignItems="center">
          <Typography variant="h3">Giriş</Typography>
          <Typography variant="h6" color="grey">
            admin paneli
          </Typography>
        </Stack>
        <Stack flexDirection="row" columnGap="1rem">
          <OutlinedInput
            error={!!error}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            size="small"
            placeholder="şifre"
            fullWidth
          />
          <Button variant="outlined" type="submit">
            GİR
          </Button>
        </Stack>
      </Paper>
    </form>
  );
}
