import {
  Add,
  ArrowBack,
  KeyboardArrowRight,
  MenuBook,
} from "@mui/icons-material";
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
import { useViewModelContext } from "../view_model";
import CreateDialog from "./create_dialog";
import SelectiveConsumer from "@/core/components/selective_consumer";
import { IViewModel } from "../model/view_model";
import { Directory, DirectoryType } from "../model/directory";

export default function Consumer() {
  const viewModel = useViewModelContext()!;

  return (
    <SelectiveConsumer
      component={DirectoryList}
      hook={() => viewModel}
      observedParams={["directory"]}
    />
  );
}

export function DirectoryList(viewModel: IViewModel) {
  const { directory, goTo, goBack, setDialogOpen } = viewModel;
  const { contents, title, type } = directory;

  return (
    <>
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
            {type !== "root" ? (
              <IconButton onClick={goBack}>
                <ArrowBack />
              </IconButton>
            ) : (
              <span />
            )}
            {title}
            <IconButton onClick={() => setDialogOpen((prev) => !prev)}>
              <Add />
            </IconButton>
          </ListSubheader>
        }
      >
        {(contents as Directory<DirectoryType>[]).map((child) => {
          const { title, code } = child;
          return (
            <ListItem key={code} disablePadding>
              <ListItemButton
                sx={{ padding: "1.1rem 1rem" }}
                onClick={() => goTo(code)}
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
      <CreateDialog />
    </>
  );
}
