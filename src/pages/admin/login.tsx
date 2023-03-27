import {
  Box,
  Button,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");

  return (
    <form method="POST" action="/api/admin/login">
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
