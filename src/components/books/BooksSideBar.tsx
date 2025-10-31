import { NavLink } from "react-router-dom";
import { FaBook, FaSearch, FaChartLine, FaUpload, FaPlus } from "react-icons/fa";

const sidebarItems = [
    { name: "Books", icon: <FaBook />, path: "/books" },
    { name: "Add Book", icon: <FaPlus />, path: "/books/add-book" },
    { name: "Search", icon: <FaSearch />, path: "/books/search" },
    { name: "Search Comparison", icon: <FaChartLine />, path: "/books/search-comparison" },
    { name: "Export", icon: <FaUpload />, path: "/books/export" },
];

export const BooksSidebar = () => {
    return (
        <div className="w-64 h-screen bg-grayPurple text-lightPurple flex flex-col shadow-glow p-4">
            <h1 className="text-2xl font-heading mb-8 text-center">Books menu</h1>
            <nav className="flex flex-col gap-2">
                {sidebarItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        end={item.path === "/books"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-md font-body transition-all duration-200 
                       hover:bg-deepPurple hover:shadow-glow ${isActive ? "bg-magicPurple shadow-glow" : ""
                            }`
                        }
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};
