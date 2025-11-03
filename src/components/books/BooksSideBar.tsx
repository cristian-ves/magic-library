import { Outlet } from "react-router-dom";
import { FaBook, FaSearch, FaUpload, FaPlus } from "react-icons/fa";
import { SideBar } from "../SideBar";

const sidebarItems = [
    { name: "Books", icon: <FaBook />, path: "/books" },
    { name: "Add Book", icon: <FaPlus />, path: "/books/add-book" },
    { name: "Search", icon: <FaSearch />, path: "/books/search" },
    { name: "Export", icon: <FaUpload />, path: "/books/export" },
];

export const BooksSidebar = () => {
    return (
        <div className="flex min-h-screen">
            <SideBar items={sidebarItems} end="books" />
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};
