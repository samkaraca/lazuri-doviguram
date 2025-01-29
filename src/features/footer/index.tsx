import { SubdirectoryArrowRightRounded } from "@mui/icons-material";
import styles from "./footer.module.scss";

export function Footer() {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["inner-container"]}>
        <section className={styles["about-us"]} aria-label="hakkımızda">
          <img
            src={`/${process.env.NEXT_PUBLIC_PROJECT_OWNER}/footer-text-logo.png`}
            alt="yazı logo"
          />
          <p>{process.env.NEXT_PUBLIC_FOOTER_TEXT}</p>
        </section>
        <section className={styles["site-map"]} aria-label="site haritası">
          <h3 className="font-bold text-lg">{process.env.NEXT_PUBLIC_PROJECT_NAME}</h3>
          <nav>
            {JSON.parse(process.env.NEXT_PUBLIC_NAVIGATION_ITEMS!).map(
              (item: any) => {
                return (
                  <a className="simple" href={item.link} key={item.title}>
                    <SubdirectoryArrowRightRounded />
                    {item.title}
                  </a>
                );
              }
            )}
          </nav>
        </section>
        <section className={styles["address"]} aria-label="adres">
          <h3 className="font-bold text-lg">Adres</h3>
          <p>{process.env.NEXT_PUBLIC_FOOTER_ADDRESS}</p>
        </section>
        <section className={styles["eu"]}>
          <img className={styles["eu"]} src="/eu.jpg" alt="The flag of EU" />
          <p>
            Bu site, Avrupa Birliği finansal desteği ile Laz-Çerkes Sivil Toplum
            Ağı Projesi kapsamında hazırlanmıştır. İçeriğinden yalnızca Laz
            Enstitüsü sorumlu olup, hiçbir biçimde Avrupa Birliği&apos;nin
            görüşlerini yansıttığı şeklinde yorumlanamaz ©2023
          </p>
        </section>
      </div>
    </footer>
  );
}
