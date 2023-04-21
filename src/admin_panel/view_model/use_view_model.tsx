import { useState } from "react";
import { IViewModel } from "../model/view_model";
import { IDialog } from "../model/dialog";
import { supabase } from "../../../lib/supabaseClient";
import slugify from "slugify";
import { Theme } from "../model/theme";

export function useViewModel(data: Theme[]): IViewModel {
  const [dialog, setDialog] = useState<IDialog>(new IDialog({}));

  function saveNewTheme() {
    const slug = slugify(dialog.title, { strict: true, lower: true });

    supabase.storage
      .from("themes")
      .upload(`/${slug}/photo.jpg`, dialog.image!, {
        upsert: true,
      })
      .then((res) => {
        const { title, description, level } = dialog;
        const imagePath = res.data?.path;

        if (title && description && level && imagePath && slug) {
          const theme = {
            title,
            description,
            level,
            code: slug,
            image: `/themes/${imagePath}`,
          } as Theme;

          supabase
            .from("themes")
            .insert([theme])
            .then((a) => console.log(a));
        }

        setDialog(new IDialog({}));
      });
  }

  return {
    data,
    dialog,
    setDialog,
    saveNewTheme,
  };
}
