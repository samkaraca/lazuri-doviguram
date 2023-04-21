import { Theme } from "@/admin_panel/model/theme";
import { supabase } from "../../../../lib/supabaseClient";
import { AdminPanel } from "@/admin_panel";

export default function ActivityFinderPage({ data }: { data: Theme[] }) {
  return <AdminPanel data={data} />;
}

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("themes")
    .select("*, lessons(title)");

  return {
    props: {
      data,
    },
  };
}
