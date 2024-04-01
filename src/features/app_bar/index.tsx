import Link from "next/link";
import styles from "./app_bar.module.scss";
import { MenuRounded } from "@mui/icons-material";
import { useState } from "react";

export function AppBar({ home }: { home: "/admin" | "/" }) {
  const [isAltMenuOpen, setIsAltMenuOpen] = useState(false);

  return (
    <>
      <header className={styles["header"]}>
        <div>
          <Link className={styles["header-logo"]} href={home}>
            <img
              src={`/${process.env.NEXT_PUBLIC_PROJECT_OWNER}/header-composite-logo.png`}
              alt=""
            />
          </Link>
          <nav>
            {JSON.parse(process.env.NEXT_PUBLIC_NAVIGATION_ITEMS!).map(
              (item: any) => {
                return (
                  <a
                    className="simple"
                    target={item.targetBlank ? "_blank" : "_self"}
                    href={
                      (item.link.startsWith("/")
                        ? home === "/"
                          ? ""
                          : home
                        : "") + item.link
                    }
                    key={item.title}
                  >
                    {item.title}
                  </a>
                );
              }
            )}
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
          {JSON.parse(process.env.NEXT_PUBLIC_NAVIGATION_ITEMS!).map(
            (item: any) => {
              return (
                <a className="simple" href={item.link} key={item.title}>
                  {item.title}
                </a>
              );
            }
          )}
        </nav>
      </section>
    </>
  );
}
