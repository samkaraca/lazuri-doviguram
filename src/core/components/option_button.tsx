import { MouseEventHandler, ReactNode } from "react";

export function OptionButton({
  children,
  icon,
  onClick,
  left = true,
  existent = true,
}: {
  children: ReactNode;
  icon: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  left?: boolean;
  existent?: boolean;
}) {
  if (existent) {
    return (
      <div style={{ position: "relative" }}>
        <button
          className={`simple-svg`}
          onClick={onClick}
          style={{
            ...{
              position: "absolute",
              top: 0,
            },
            ...(left
              ? { left: 0, transform: "translate(-150%, 0)" }
              : { right: 0, transform: "translate(150%, 0)" }),
          }}
        >
          {icon}
        </button>
        {children}
      </div>
    );
  }

  return <>{children}</>;
}
