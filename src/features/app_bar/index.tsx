import Link from "next/link";
import styles from "./app_bar.module.scss";
import { MenuRounded } from "@mui/icons-material";
import { useState } from "react";
import { IndexPageTemplate } from "@/lib/types/website_page_templates/index_page_template";

export function AppBar({
  home,
  pageTemplate,
}: {
  home: "/admin" | "/";
  pageTemplate: IndexPageTemplate;
}) {
  const [isAltMenuOpen, setIsAltMenuOpen] = useState(false);

  return (
    <>
      <header className={styles["header"]}>
        <div>
          <Link className={styles["header-logo"]} href={home}>
            <img
              src={`/${process.env.PROJECT_OWNER}/header-composite-logo.png`}
              alt=""
            />
          </Link>
          <nav>
            {pageTemplate.headerNavigationItems.map((item) => {
              return (
                <a className="simple" href={item.link} key={item.title}>
                  {item.title}
                </a>
              );
            })}
          </nav>
          <button
            onClick={() => setIsAltMenuOpen((prev) => !prev)}
            className={styles["menu-button"]}
          >
            <MenuRounded />
          </button>
        </div>
      </header>
      <section
        className={styles["alt-nav-menu"]}
        style={{ display: isAltMenuOpen ? "unset" : "none" }}
        aria-label="navigasyon menüsü"
      >
        <nav>
          {pageTemplate.headerNavigationItems.map((item) => {
            return (
              <a className="simple" href={item.link} key={item.title}>
                {item.title}
              </a>
            );
          })}
        </nav>
      </section>
    </>
  );
}
