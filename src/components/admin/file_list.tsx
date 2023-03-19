import { Add, KeyboardArrowRight, MenuBook } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import useDirectory from "./hooks/use_directory";

export default function FileList() {
  const directory = useDirectory();

  return (
    <List
      disablePadding
      subheader={
        <ListSubheader
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "unset",
            boxShadow: "0 1px 5px grey",
          }}
        >
          <div />
          {directory.header}
          <IconButton>
            <Add />
          </IconButton>
        </ListSubheader>
      }
    >
      {directory.data.map((child) => {
        const { title, code } = child;
        return (
          <ListItem key={code} disablePadding>
            <ListItemButton
              sx={{ padding: "1.1rem 1rem" }}
              onClick={() => directory.goTo(code)}
            >
              <ListItemAvatar>
                <Avatar>
                  <MenuBook></MenuBook>
                </Avatar>
              </ListItemAvatar>
              <ListItemText>{title}</ListItemText>
              <KeyboardArrowRight />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
