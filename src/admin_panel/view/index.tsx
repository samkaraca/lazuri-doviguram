import { Add, AddPhotoAlternate } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useViewModelContext } from "../view_model";
import { ThemeCard } from "@/core/components/theme_card";
import Image from "next/image";

export function View() {
  const { data } = useViewModelContext()!;

  return (
    <Box sx={{ overflow: "scroll", height: "100vh" }}>
      <Box
        sx={{
          height: "40vh",
          backgroundColor: "rebeccapurple",
        }}
      />
      <Box
        sx={{
          position: "relative",
          top: "-40vh",
          width: "80%",
          margin: "auto",
          maxWidth: "1536px",
        }}
      >
        <Typography
          variant="h3"
          color="white"
          padding="1.5rem"
          marginBottom={"15vh"}
        >
          Admin Paneli
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 18rem))",
            gridAutoRows: "1fr",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          {data.map((theme) => {
            const { id, image, title } = theme;
            return (
              <ThemeCard
                key={id}
                photo={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE!}${image}`}
                title={title}
                lessons={theme.lessons!.map((lesson) => lesson.title)}
              />
            );
          })}
          <CreateNewThemeCard />
        </Box>
      </Box>
    </Box>
  );
}

export function CreateNewThemeCard() {
  const { dialog, setDialog, saveNewTheme } = useViewModelContext()!;

  return (
    <>
      <Card sx={{ borderRadius: "1rem" }}>
        <CardActionArea
          onClick={() => setDialog((prev) => prev.open())}
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
      <Dialog
        open={dialog.isOpen}
        onClose={() => setDialog((prev) => prev.close())}
      >
        <DialogTitle>Yeni tema oluştur</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%", aspectRatio: "100/60" }}>
            {dialog.image ? (
              <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                <Image
                  alt="image-to-upload"
                  src={URL.createObjectURL(dialog.image)}
                  style={{ objectFit: "cover" }}
                  fill
                />
              </Box>
            ) : (
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
                  onChange={(e) => {
                    setDialog((prev) =>
                      prev.renewWith("image", e.target.files!.item(0))
                    );
                  }}
                  type="file"
                  id="upload-image-input"
                  accept="image/jpeg"
                  hidden
                />
              </Button>
            )}
          </Box>
          <ToggleButtonGroup
            value={dialog.level}
            sx={{ marginTop: "1rem" }}
            exclusive
            onChange={(e, value) =>
              setDialog((prev) => prev.renewWith("level", value))
            }
          >
            <ToggleButton value="beginning" color="success">
              BAŞLANGIÇ
            </ToggleButton>
            <ToggleButton value="intermediate" color="warning">
              ORTA
            </ToggleButton>
            <ToggleButton value="advanced" color="error">
              İLERİ
            </ToggleButton>
          </ToggleButtonGroup>
          <TextField
            inputProps={{ maxLength: 25 }}
            autoComplete="off"
            margin="normal"
            label="Başlık"
            fullWidth
            variant="outlined"
            value={dialog.title}
            onChange={(e) =>
              setDialog((prev) => prev.renewWith("title", e.target.value))
            }
          />
          <TextField
            inputProps={{ maxLength: 50 }}
            autoComplete="off"
            margin="normal"
            label="Açıklama"
            fullWidth
            variant="outlined"
            value={dialog.description}
            onChange={(e) =>
              setDialog((prev) => prev.renewWith("description", e.target.value))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={saveNewTheme}>Kaydet</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
