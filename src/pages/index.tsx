import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import { EmojiObjectsOutlined } from "@mui/icons-material";
import Link from "next/link";
import styles from "../styles/home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lazuri Doviguram</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div id={styles.main}>
        <div className={`container`}>
          <div
            className={`${styles.banner} ${styles["section-vertical-padding"]}`}
          >
            <div>
              <Typography variant="h2" fontWeight="bold" marginBottom="1.5rem">
                Lazuri Doviguram!
              </Typography>
              <Typography variant="h5" fontWeight="light" maxWidth="31rem">
                Tarihin en eski dönemlerinden beri Kafkas insanının duygularına
                tercüman olmuş, yaşamlarına eşlik etmiş bir dili, daha yakından
                tanımak ister misin?
              </Typography>
            </div>
            <div className={styles["image-container"]}>
              <Image
                alt="reading kid"
                src="/reading-kid.png"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
        <div className={`container ${styles["section-vertical-padding"]}`}>
          <Typography variant="h4" fontWeight="medium" marginBottom={"2.5rem"}>
            Temel Lazca
          </Typography>
          <div className={styles["theme-card-container"]}>
            <ThemeCard />
            <ThemeCard />
          </div>
        </div>
      </div>
    </>
  );
}

function ThemeCard() {
  const data = {
    title: "Çkuni Ocaği",
    lessons: [
      "Çkuni ocağişi nca",
      "Arteşi papu",
      "Ma nandidi miyonun",
      "Çkimi, skani, muşi",
    ],
  };

  return (
    <Link href="#" className={styles["theme-card"]}>
      <div className={styles.content}>
        <Typography
          variant="h4"
          fontSize="1.7rem"
          fontWeight="medium"
          color="#444444"
        >
          {data.title}
        </Typography>
        <div className={styles.item}>
          {data.lessons.map((lesson) => {
            return (
              <Box key={lesson} sx={{ display: "flex" }}>
                <EmojiObjectsOutlined sx={{ color: "#005E98" }} />
                <Typography variant="body1">{lesson}</Typography>
              </Box>
            );
          })}
        </div>
        <Typography
          variant="button"
          className={styles.button}
          sx={{
            color: "#073042",
            border: "0.15rem solid black",
            borderRadius: "2rem",
            padding: "0.5rem 2rem",
            width: "min-content",
            transition: "0.3s",
          }}
        >
          Başla
        </Typography>
      </div>
      <div className={styles["image-container"]}>
        <Image
          alt="working man"
          src="/working-man.jpg"
          style={{ objectFit: "cover" }}
          fill
        />
      </div>
    </Link>
  );
}
