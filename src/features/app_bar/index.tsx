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
            <img src="/header-logo.png" alt="" />
          </Link>
          <nav>
            <a className="simple" href={`${home}#temalar`}>
              Temalar
            </a>
            <a
              className="simple"
              href="https://drive.google.com/file/d/1ogVdEciTUea-WW0jvXmXGF25cEpW8c2F/view"
            >
              Ders Kitabı
            </a>
            <a className="simple" href="https://www.lazcasozluk.org/">
              Sözlük
            </a>
            <a className="simple" href="https://www.lazenstitu.com/">
              Laz Enstitüsü
            </a>
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
          <a className="simple" href="#">
            Temalar
          </a>
          <a
            className="simple"
            href="https://drive.google.com/file/d/1ogVdEciTUea-WW0jvXmXGF25cEpW8c2F/view"
          >
            Ders Kitabı
          </a>
          <a className="simple" href="https://www.lazcasozluk.org/">
            Sözlük
          </a>
          <a className="simple" href="https://www.lazenstitu.com/">
            Laz Enstitüsü
          </a>
        </nav>
      </section>
    </>
  );
}
