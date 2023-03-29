export type ContentfullDirectoryType = "root" | "theme" | "lesson";
export type ContentlessDirectoryType = "activity";

export type DirectoryType = ContentfullDirectoryType | ContentlessDirectoryType;

export type Directory<T extends DirectoryType> =
  T extends ContentfullDirectoryType
    ? {
        type: ContentfullDirectoryType;
        title: string;
        code: string;
        contents: Directory<DirectoryType>[];
      }
    : {
        type: ContentlessDirectoryType;
        title: string;
        code: string;
        contents: string;
      };

export const initialRootDirectory: Directory<"root"> = {
  type: "root",
  contents: [],
  code: "temalar",
  title: "Temalar",
};

export function goInDirectory(
  rootDirectory: Directory<ContentfullDirectoryType>,
  directoryPath?: string[]
): Directory<DirectoryType> {
  const safeDirectoryPath = directoryPath ?? [];
  const targetDestination =
    safeDirectoryPath.reduce((accumulatedVal, code) => {
      const newDirectory = (
        accumulatedVal.contents as Directory<DirectoryType>[]
      ).find(
        (directory) => directory.code === code
      )! as Directory<ContentfullDirectoryType>;
      return newDirectory;
    }, rootDirectory) ?? rootDirectory;

  return targetDestination;
}
