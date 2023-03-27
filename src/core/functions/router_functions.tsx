import { NextRouter } from "next/router";

export function goToQueryPath<T extends string>(
  router: NextRouter,
  query: string,
  forward: boolean,
  pathCode?: string
) {
  const directories = (router.query[query] as T[]) ?? [];
  if (!forward) directories.pop();
  let relativePath = directories.join("/") + "/";
  relativePath = relativePath.startsWith("/")
    ? relativePath.substring(1)
    : relativePath;
  const newPath = `${relativePath}${pathCode ?? ""}`;
  router.push(newPath);
}

export function urlPathVersionOf(title: string) {
  const urlPath = title
    .toLowerCase()
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ı", "i")
    .replaceAll("ç", "c")
    .replaceAll("ö", "o")
    .replaceAll("i̇", "i")
    .replaceAll(" ", "-");

  return urlPath;
}
