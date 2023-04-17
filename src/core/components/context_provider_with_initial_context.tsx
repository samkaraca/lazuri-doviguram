import { Context, ReactNode, createContext, useContext } from "react";

export function ContextProviderWithInitialContext<VM, IC>({
  children,
  initContext,
  useViewModel,
}: {
  children: ReactNode;
  initContext: Context<IC>;
  useViewModel: (initContext: Context<IC>) => VM;
}) {
  const VMContext = createContext<VM | null>(null);
  const viewModel = useViewModel(initContext);

  return {
    ContextProvider: (
      <VMContext.Provider value={viewModel}>{children}</VMContext.Provider>
    ),
    useContext: () => useContext(VMContext),
  };
}
