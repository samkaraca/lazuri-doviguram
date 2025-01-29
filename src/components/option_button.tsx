import {
  MouseEventHandler,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export function OptionButton({
  children,
  icon,
  onClick,
  left = true,
  existent = true,
}: {
  children: (ref?: RefObject<HTMLElement>) => ReactElement;
  icon: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  left?: boolean;
  existent?: boolean;
}) {
  const childRef = useRef<HTMLElement>(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (
      existent &&
      childRef.current &&
      childRef.current.getBoundingClientRect
    ) {
      const rect = childRef.current.getBoundingClientRect();
      setButtonPosition({
        x: left ? rect.left : rect.right,
        y: rect.top,
      });
    }
  }, [childRef, existent, left]);

  if (existent) {
    return (
      <>
        {typeof window === "object"
          ? createPortal(
            <button
              className={`simple-svg`}
              onClick={onClick}
              style={{
                ...{
                  position: "sticky",
                  top: buttonPosition.y,
                },
                ...(left
                  ? { left: buttonPosition.x }
                  : { right: buttonPosition.x }),
              }}
            >
              {icon}
            </button>,
            document.body
          )
          : null}
        {children(childRef as RefObject<HTMLElement>)}
      </>
    );
  }

  return children();
}
