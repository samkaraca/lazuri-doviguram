import { useMemo } from "react";

export default function SelectiveConsumer<T>({
  component,
  hook,
  observedParams,
}: {
  component: (hookParams: T) => JSX.Element | null;
  hook: () => T;
  observedParams: (keyof T)[];
}) {
  const observable = hook();
  const deps = observedParams.map((param) => observable[param]);

  return useMemo(() => component({ ...observable }), deps);
}
