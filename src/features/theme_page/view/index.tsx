import { Button, Dialog, IconButton, Tab, Tabs } from "@mui/material";
import { TabPanels } from "./tab_panels";
import { useBaseViewModelContext } from "../view_model/context_providers/base_view_model";
import { BaseViewModel } from "../model/base_view_model";
import { Activity } from "@/features/activity";
import { poppins } from "@/pages/_app";
import { AppBar } from "@/features/app_bar";
import { Banner } from "./banner/banner";
import Head from "next/head";
import styles from "./styles.module.scss";
import { Footer } from "@/features/footer";
import { TabBar } from "./tab_bar/tab_bar";
import { ReactNode } from "react";

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
    themeTitle,
    themeExplanation,
    themeImage,
  } = useBaseViewModelContext() as BaseViewModel;

  return (
    <>
      <Head>
        <title>{themeTitle} - Lazuri Doviguram!</title>
        <meta property="og:title" content={themeTitle} key="title" />
        <meta property="og:description" content={themeExplanation} key="desc" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_IMAGE_BASE_URL}/${themeImage}`}
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
      <Dialog
        className={poppins.className}
        open={isActivityDialogOpen}
        onClose={closeActivity}
        fullWidth
        maxWidth="md"
        scroll="body"
      >
        {activeActivity && <Activity activity={activeActivity} />}
      </Dialog>
    </>
  );
}
