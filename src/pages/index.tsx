import Head from "next/head";
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
        <div className="container">
          <div id={styles["banner-container"]}>
            <div className={styles["headers-container"]}>
              <h1>Lazuri Doviguram!</h1>
              <h4>
                Tarihin en eski dönemlerinden beri Kafkas insanının duygularına
                tercüman olmuş, yaşamlarına eşlik etmiş bir dili, daha yakından
                tanımak ister misin?
              </h4>
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
        <div className="container">
          <div className={styles["themes-container"]}>
            <h2>Temel Lazca</h2>
            <div className={styles["theme-card-container"]}>
              <ThemeCard />
              <ThemeCard />
              <ThemeCard />
            </div>
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
      "Preparing for a career conversation",
    ],
  };

  return (
    <Link href="#" className={styles["theme-card"]}>
      <div className={styles.content}>
        <h3>{data.title}</h3>
        <div className={styles["item-container"]}>
          {data.lessons.map((lesson) => {
            return (
              <div key={lesson} className={styles.item}>
                <EmojiObjectsOutlined
                  className={styles.icon}
                  sx={{ color: "#005E98" }}
                />
                <h5>{lesson}</h5>
              </div>
            );
          })}
        </div>
        <div className={styles.button}>Başla</div>
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
