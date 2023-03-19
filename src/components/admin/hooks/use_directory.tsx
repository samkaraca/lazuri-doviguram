import { useRouter } from "next/router";

interface Directory {
  title: string;
  code: string;
  type: Folder;
  activities?: Directory[];
}
type Folder = "theme" | "lesson" | "activity" | "root";

const rootDirectory: Directory[] = [
  {
    title: "Themes",
    code: "themes",
    type: "root",
    activities: [
      {
        title: "Ailemiz",
        code: "ailemiz",
        type: "theme",
        activities: [
          {
            title: "Ders 1",
            code: "ders-1",
            type: "lesson",
            activities: [
              { title: "A", code: "a", type: "activity" },
              { title: "B", code: "b", type: "activity" },
              { title: "C", code: "c", type: "activity" },
            ],
          },
          {
            title: "Ders 2",
            code: "ders-2",
            type: "lesson",
            activities: [
              { title: "K", code: "activity", type: "activity" },
              { title: "D", code: "activity", type: "activity" },
              { title: "C", code: "activity", type: "activity" },
            ],
          },
          {
            title: "Ders 3",
            code: "ders-3",
            type: "lesson",
            activities: [
              { title: "L", code: "activity", type: "activity" },
              { title: "U", code: "activity", type: "activity" },
              { title: "C", code: "activity", type: "activity" },
            ],
          },
        ],
      },
      {
        title: "Vücudumuzu Tanıyalım",
        code: "vucudumuzu-taniyalim",
        type: "theme",
        activities: [
          {
            title: "Ders 1",
            type: "lesson",
            code: "ders-1",
            activities: [{ title: "C", code: "c", type: "activity" }],
          },
          {
            title: "Ders 2",
            code: "ders-2",
            type: "lesson",
            activities: [
              { title: "A", code: "a", type: "activity" },
              { title: "C", code: "c", type: "activity" },
            ],
          },
        ],
      },
    ],
  },
];

export default function useDirectory() {
  const router = useRouter();
  const directories = router.query.directory as string[];
  let data: Directory[] = [];
  let header = "Yükleniyor";

  if (directories) {
    data = directories.reduce((accumulator, directory, index) => {
      const obj = accumulator.find((obj) => obj.code === directory);
      const activities = obj?.activities!;
      if (index === directories.length - 1) header = obj!.title;
      return activities;
    }, rootDirectory);
  }

  return {
    goTo: (path: string) => router.push(`${router.asPath}/${path}`),
    header,
    data,
  };
}
