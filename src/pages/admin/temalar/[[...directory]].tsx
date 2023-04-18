import {
  Add,
  AddPhotoAlternate,
  ArrowForward,
  Close,
} from "@mui/icons-material";
import { supabase } from "../../../../lib/supabaseClient";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

interface Theme {
  id: string;
  date: string;
  title: string;
  code: string;
  photo: string;
}

export default function ActivityFinderPage({ data }: { data: Theme[] }) {
  console.log("data => ", data);
  return (
    <Box>
      <Box sx={{ height: "35vh", backgroundColor: "dodgerblue" }}></Box>
      <Box
        sx={{
          position: "absolute",
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
          width: "50%",
          margin: "7% auto",
          backgroundColor: "red",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 18rem))",
          gridAutoRows: "max-content",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {data.map((theme) => {
          const { id, photo, title } = theme;
          return (
            <Card key={id} sx={{ borderRadius: "1rem" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{ aspectRatio: "100/60", width: "100%" }}
                  image={photo}
                />
                <CardContent sx={{ aspectRatio: "100/40" }}>
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography variant="h5">{title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards Hayvanlar alemi çok özeldir Lorem, ipsum dolor
                        sit amet
                      </Typography>
                    </Box>
                    <ArrowForward />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
        <Card sx={{ borderRadius: "1rem" }}>
          <CardActionArea
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              rowGap: "1rem",
            }}
          >
            <Add fontSize="large" />
            <Typography>Yeni tema ekle</Typography>
          </CardActionArea>
        </Card>
      </Box>
      <Dialog open={true}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%", aspectRatio: "100/60" }}>
            <Button
              onClick={() =>
                document
                  .querySelector<HTMLInputElement>("#upload-image-input")!
                  .click()
              }
              variant="outlined"
              sx={{ width: "100%", height: "100%" }}
            >
              <AddPhotoAlternate fontSize="large" />
              <input
                type="file"
                id="upload-image-input"
                accept="image/jpeg"
                hidden
              />
            </Button>
          </Box>
          <TextField
            autoComplete="off"
            margin="normal"
            label="Başlık"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoComplete="off"
            margin="normal"
            label="Açıklama"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {}}>Kaydet</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export async function getServerSideProps() {
  const { data } = await supabase.from("themes").select("*");

  return {
    props: {
      data,
    },
  };
}
