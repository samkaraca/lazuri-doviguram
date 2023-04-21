import { ArrowForward, StarsRounded } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export function ThemeCard({
  photo,
  title,
  lessons,
}: {
  photo: string;
  title: string;
  lessons: string[];
}) {
  return (
    <Card sx={{ borderRadius: "1rem" }}>
      <CardActionArea
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <CardMedia
          component="img"
          sx={{ aspectRatio: "100/60", width: "100%" }}
          image={photo}
        />
        <CardContent sx={{ aspectRatio: "100/40", width: "100%" }}>
          <Box display="flex" justifyContent="space-between">
            <Box sx={{ overflowWrap: "anywhere" }}>
              <Typography variant="h5">{title}</Typography>
              <List>
                {lessons.map((lesson, index) => {
                  return (
                    <ListItem disablePadding key={index}>
                      <ListItemIcon sx={{ minWidth: "2rem" }}>
                        <StarsRounded fontSize="small" color="warning" />
                      </ListItemIcon>
                      <ListItemText disableTypography>
                        <Typography variant="subtitle2">{lesson}</Typography>
                      </ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
            <ArrowForward />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
