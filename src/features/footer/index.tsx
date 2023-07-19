import { SubdirectoryArrowRightRounded } from "@mui/icons-material";
import styles from "./footer.module.scss";

export function Footer() {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["inner-container"]}>
        <section className={styles["about-us"]} aria-label="hakkımızda">
          <img src="/laz-enstitusu-horizontal.png" alt="" />
          <p>
            Laz Enstitüsü, Laz halkının dilini (Lazca ve Megrelce) ve bütün
            kültür öğelerini; tarihini, masallarını, destanlarını, edebiyatını,
            folklorunu, inançlarını ve değer yargılarını; coğrafya, etnografya
            ve arkeolojilerini; mimari anlayış ve uygulamalarını; gelenek ve
            göreneklerini; Laz kültürü ile ilgili diğer bütün alanları
            incelemek, araştırmak ve tanıtmak bütün bunları geliştirmek için
            projeler üretmek ve bu projelerin uygulanması için çaba göstermeyi
            amaçlar.
          </p>
        </section>
        <section className={styles["site-map"]} aria-label="site haritası">
          <h3>Lazuri Doviguram</h3>
          <nav>
            <a className="simple" href="">
              <SubdirectoryArrowRightRounded />
              Temalar
            </a>
            <a
              className="simple"
              href="https://drive.google.com/file/d/1ogVdEciTUea-WW0jvXmXGF25cEpW8c2F/view"
            >
              <SubdirectoryArrowRightRounded />
              Ders Kitabı
            </a>
            <a className="simple" href="https://www.lazcasozluk.org/">
              <SubdirectoryArrowRightRounded />
              Sözlük
            </a>
            <a className="simple" href="https://www.lazenstitu.com/">
              <SubdirectoryArrowRightRounded />
              Laz Enstitüsü
            </a>
          </nav>
        </section>
        <section className={styles["address"]} aria-label="adres">
          <h3>Adres</h3>
          <p>
            Halitağa Cad. 32/27 Kadıköy, İstanbul.
            <br />
            +90 546 955 1134
            <br />
            laz.enstitu@lazenstitu.com
          </p>
        </section>
        <img className={styles["eu"]} src="/eu.png" alt="" />
      </div>
    </footer>
  );
}
