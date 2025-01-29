import { TabPanels } from "./tab_panels";
import { useViewModelContext } from "../view_model/index";
import { ViewModel } from "../model/view_model";
import { AppBar } from "@/features/app_bar";
import { Banner } from "./banner/banner";
import Head from "next/head";
import styles from "./styles.module.scss";
import { Footer } from "@/features/footer";
import { TabBar } from "./tab_bar";
import { ReactNode } from "react";
import dynamic from "next/dynamic";

const ActivityDialog = dynamic(() => import("./activity_dialog"), {
  ssr: false,
});

export function View({
  home,
  adminTools,
}: {
  home: "/admin" | "/";
  adminTools?: ReactNode;
}) {
  const {
    isActivityDialogOpen,
    activeActivity,
    closeActivity,
    title,
    explanation,
    image,
  } = useViewModelContext() as ViewModel;

  return (
    <>
      <Head>
        <title>{`${title} - ${process.env.NEXT_PUBLIC_PROJECT_NAME}`}</title>
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content={explanation} key="desc" />
        <meta
          property="og:image"
          content={`${image ? image : "/default-theme.jpg"}`}
          key="image"
        />
      </Head>
      <AppBar home={home} />
      <div className={styles["main"]}>
        <Banner />
        <TabBar />
        <TabPanels />
      </div>
      <Footer />
      {adminTools}
      {
        <ActivityDialog
          isActivityDialogOpen={isActivityDialogOpen}
          activeActivity={activeActivity ?? undefined}
          closeActivity={closeActivity}
        />
      }
    </>
  );
}
