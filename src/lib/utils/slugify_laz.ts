import slugify from "slugify";

export function slugifyLaz(text: string) {
  slugify.extend({ ǩ: "k", ǯ: "z", ʒ: "z" });
  return slugify(text.toLowerCase(), {
    strict: true,
  });
}
