import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMediaQuery } from "@mui/material";

interface LayoutContextValue {
  isMobile: boolean;
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery("(max-width:1000px)");

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const value: LayoutContextValue = {
    isMobile,
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLayout = () => {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used within LayoutProvider");
  return ctx;
};
