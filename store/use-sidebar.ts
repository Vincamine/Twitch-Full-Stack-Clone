import {create} from "zustand";  //a state-management library for React applications

interface SidebarStore {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
};

export const useSidebar = create<SidebarStore>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true })),
  }));