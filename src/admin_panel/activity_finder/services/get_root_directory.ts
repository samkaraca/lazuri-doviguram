import { ContentfullDirectoryType, Directory } from "../model/directory";

export default function getRootDirectory(): Promise<
  Directory<ContentfullDirectoryType>
> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/admin/temalar")
      .then((res) => {
        res.json().then((directory) => resolve(directory));
      })
      .catch((err) => reject(err));
  });
}
