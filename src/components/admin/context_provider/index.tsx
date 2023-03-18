import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import { NullableDispatchContext } from "../../../core/types";

type Folder = "home" | "theme" | "lesson" | "activity";

interface FileNavigationRoute {
  folderName: string; // name of the current folder user sees inside of
  folderType: Folder; // whether user sees themes, lessons, activity or home currently
  parentFolder: FileNavigationRoute | null;
}

type FileSystem = {
  title: string;
  lessons: { title: string; activities: { title: string }[] }[];
}[];

const files: FileSystem = [
  {
    title: "Ailemiz",
    lessons: [
      {
        title: "Ders 1",
        activities: [{ title: "A" }, { title: "B" }, { title: "C" }],
      },
      {
        title: "Ders 2",
        activities: [{ title: "K" }, { title: "D" }, { title: "C" }],
      },
      {
        title: "Ders 3",
        activities: [{ title: "L" }, { title: "U" }, { title: "C" }],
      },
    ],
  },
  {
    title: "Vücudumuzu Tanıyalım",
    lessons: [
      { title: "Ders 1", activities: [{ title: "C" }] },
      { title: "Ders 2", activities: [{ title: "A" }, { title: "C" }] },
    ],
  },
];

interface CurrentFolder {
  route: FileNavigationRoute;
  files: string[];
}

const folderContextInitialValue: CurrentFolder = {
  route: {
    folderName: "themes",
    folderType: "home",
    parentFolder: null,
  },
  files: files.map((file) => file.title),
};

const FolderContext = createContext<CurrentFolder>(folderContextInitialValue);
const FolderDispatchContext = createContext<NullableDispatchContext>(null);

function folderContextReducer(
  currentFolder: CurrentFolder,
  action: { go: "forward" | "backward"; to: string }
) {
  if (action.go === "backward") {
    const parentFolder = currentFolder.route.parentFolder;
    if (!parentFolder) return folderContextInitialValue;
    const newRoute: FileNavigationRoute = {
      folderName: parentFolder.folderName,
      folderType: parentFolder.folderType,
      parentFolder: parentFolder.parentFolder ?? null,
    };
  }

  if (currentFolder.route.folderType === "lesson")
    return folderContextInitialValue;

  const folderTypeHierarchy: Folder[] = ["home", "theme", "lesson", "activity"];

  const newRoute: FileNavigationRoute = {
    folderName: action.to,
    folderType:
      folderTypeHierarchy[
        folderTypeHierarchy.indexOf(currentFolder.route.folderType) + 1
      ],
    parentFolder: currentFolder.route,
  };

  let newFolderFiles: any = [];

  switch (currentFolder.route.folderType) {
    case "home":
      newFolderFiles = files
        .find((file) => file.title === action.to)
        ?.lessons.map((lesson) => lesson.title);
      break;

    case "theme":
      newFolderFiles = files
        .find((file) => file.title === currentFolder.route.folderName)
        ?.lessons.find((lesson) => lesson.title === action.to)
        ?.activities.map((activity) => activity.title);
      break;
  }

  const newCurrentFolder: CurrentFolder = {
    route: newRoute,
    files: newFolderFiles!,
  };

  return newCurrentFolder;
}

export default function ContextProvider({ children }: { children: ReactNode }) {
  console.log(folderContextInitialValue);
  const [filesContext, dispatchFilesContext] = useReducer(
    folderContextReducer,
    folderContextInitialValue
  );

  return (
    <FolderContext.Provider value={filesContext}>
      <FolderDispatchContext.Provider value={dispatchFilesContext}>
        {children}
      </FolderDispatchContext.Provider>
    </FolderContext.Provider>
  );
}

export const useFolderContext = () => useContext(FolderContext);

export const useFolderDispatchContext = () => useContext(FolderDispatchContext);
