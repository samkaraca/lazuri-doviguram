import { ReactNode, createContext, useContext } from "react";
import { useAdminViewModel } from "../use_admin_view_model";
import { IAdminViewModel } from "../../model/admin_view_model";

const AdminViewModelContext = createContext<IAdminViewModel | null>(null);

export function AdminViewModel({ children }: { children: ReactNode }) {
  const adminViewModel = useAdminViewModel();

  return (
    <AdminViewModelContext.Provider value={adminViewModel}>
      {children}
    </AdminViewModelContext.Provider>
  );
}

export const useAdminViewModelContext = () => useContext(AdminViewModelContext);
