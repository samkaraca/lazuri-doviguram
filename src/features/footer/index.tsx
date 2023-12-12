import { SubdirectoryArrowRightRounded } from "@mui/icons-material";
import styles from "./footer.module.scss";
import { IndexPageTemplate } from "@/lib/types/website_page_templates/index_page_template";

export function Footer({ pageTemplate }: { pageTemplate: IndexPageTemplate }) {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["inner-container"]}>
        <section className={styles["about-us"]} aria-label="hakkımızda">
          <img
            src={pageTemplate.footerTextLogoUrl}
            alt="yazı logo"
          />
          <p>{pageTemplate.footerText}</p>
        </section>
        <section className={styles["site-map"]} aria-label="site haritası">
          <h3>{pageTemplate.pageTitle}</h3>
          <nav>
            {pageTemplate.headerNavigationItems.map((item) => {
              return (
                <a className="simple" href={item.link} key={item.title}>
                  <SubdirectoryArrowRightRounded />
                  {item.title}
                </a>
              );
            })}
          </nav>
        </section>
        <section className={styles["address"]} aria-label="adres">
          <h3>Adres</h3>
          <p>{pageTemplate.footerAddress}</p>
        </section>
        <img className={styles["eu"]} src="/eu.png" alt="" />
      </div>
    </footer>
  );
}
