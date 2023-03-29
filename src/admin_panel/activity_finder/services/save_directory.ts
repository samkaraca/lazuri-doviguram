import { ContentfullDirectoryType, Directory } from "../model/directory";

export default function saveDirectory(
  rootDirectory: Directory<ContentfullDirectoryType>
): Promise<Directory<ContentfullDirectoryType>> {
  return new Promise((resolve, reject) => {
    fetch("/api/admin/temalar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rootDirectory),
    }).then((res) => {
      resolve(JSON.parse(JSON.stringify(rootDirectory)));
    });
  });
}
