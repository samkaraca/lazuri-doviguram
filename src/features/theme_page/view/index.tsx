import { TabPanels } from "./tab_panels";
import { useBaseViewModelContext } from "../view_model/context_providers/base_view_model";
import { BaseViewModel } from "../model/base_view_model";
import { AppBar } from "@/features/app_bar";
import { Banner } from "./banner/banner";
import Head from "next/head";
import styles from "./styles.module.scss";
import { Footer } from "@/features/footer";
import { TabBar } from "./tab_bar";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { IndexPageTemplate } from "@/lib/types/website_page_templates/index_page_template";

const ActivityDialog = dynamic(() => import("./activity_dialog"), {
  ssr: false,
});

export function View({
  home,
  adminTools,
  pageTemplate,
}: {
  home: "/admin" | "/";
  adminTools?: ReactNode;
  pageTemplate: IndexPageTemplate;
}) {
  const {
    isActivityDialogOpen,
    activeActivity,
    closeActivity,
    title,
    explanation,
    image,
  } = useBaseViewModelContext() as BaseViewModel;

  return (
    <>
      <Head>
        <title>{`${title} - Lazuri Doviguram!`}</title>
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content={explanation} key="desc" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_IMAGE_BASE_URL}/${image}`}
          key="image"
        />
      </Head>
      <AppBar home={home} pageTemplate={pageTemplate} />
      <div className={styles["main"]}>
        <Banner />
        <TabBar />
        <TabPanels />
      </div>
      <Footer pageTemplate={pageTemplate} />
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
