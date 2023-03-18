import { KeyboardArrowRight, MenuBook } from "@mui/icons-material";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useFolderContext, useFolderDispatchContext } from "./context_provider";

export default function FileList() {
  const folder = useFolderContext();
  const dispatchFolder = useFolderDispatchContext();

  return (
    <List disablePadding>
      {folder.files.map((title) => {
        return (
          <ListItem key={title} disablePadding>
            <ListItemButton
              sx={{ padding: "1.1rem 1rem" }}
              onClick={() => dispatchFolder!({ go: "forward", to: title })}
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
