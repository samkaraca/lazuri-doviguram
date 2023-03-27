import { FormEvent, useEffect, useState } from "react";
import getRootDirectory from "../services/get_root_directory";
import {
  ContentfullDirectoryType,
  Directory,
  DirectoryType,
  goInDirectory,
  initialRootDirectory,
} from "../model/directory";
import { useRouter } from "next/router";
import {
  goToQueryPath,
  urlPathVersionOf,
} from "@/core/functions/router_functions";
import { IViewModel } from "../model/view_model";
import { nanoid } from "nanoid";
import saveDirectory from "../services/save_directory";

export default function useViewModel(): IViewModel {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newDirectoryName, setNewDirectoryName] = useState("");
  const [directory, setDirectory] =
    useState<Directory<DirectoryType>>(initialRootDirectory);
  const [rootDirectory, setRootDirectory] = useState<Directory<"root">>();

  useEffect(() => {
    getRootDirectory().then((res) => {
      setRootDirectory(res);
      setDirectory(res);
    });
  }, []);

  useEffect(() => {
    if (router.isReady && rootDirectory) {
      const targetDirectory = goInDirectory(
        rootDirectory,
        router.query.directory as string[]
      );
      setDirectory(targetDirectory);
    }
  }, [router.asPath, rootDirectory]);

  function saveNewDirectory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currentDirectoryType = directory.type;
    const rootDirectoryCopy = JSON.parse(
      JSON.stringify(rootDirectory)
    ) as Directory<ContentfullDirectoryType>;
    const currentDirectoryCopy = goInDirectory(
      rootDirectoryCopy,
      router.query.directory as string[]
    ) as Directory<DirectoryType>;
    (currentDirectoryCopy.contents as {}[]).push({
      title: newDirectoryName,
      code: urlPathVersionOf(newDirectoryName),
      contents: currentDirectoryType === "lesson" ? nanoid() : [],
      type:
        currentDirectoryType === "root"
          ? "theme"
          : currentDirectoryType === "theme"
          ? "lesson"
          : "activity",
    });
    setDialogOpen(false);
    setNewDirectoryName("");
    saveDirectory(rootDirectoryCopy).then((res) => {
      setRootDirectory(res);
    });
  }

  return {
    goTo: (pathCode: string) =>
      goToQueryPath<DirectoryType>(router, "directory", true, pathCode),
    goBack: () => goToQueryPath<DirectoryType>(router, "directory", false),
    dialogOpen,
    setDialogOpen,
    newDirectoryName,
    setNewDirectoryName,
    saveNewDirectory,
    directory,
  };
}
