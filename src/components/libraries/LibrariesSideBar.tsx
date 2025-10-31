import { Outlet } from "react-router-dom";
import { SideBar } from "../SideBar";
import { FaBuilding, FaPlus, FaProjectDiagram, FaSitemap } from "react-icons/fa";


const sidebarItems = [
    { name: "Libraries", icon: <FaBuilding />, path: "/libraries" },
    { name: "Add Library", icon: <FaPlus />, path: "/libraries/add-library" },
    { name: "Add Edges", icon: <FaProjectDiagram />, path: "/libraries/add-edges" },
    { name: "Graph", icon: <FaSitemap />, path: "/libraries/graph" },
];

export const LibrariesSideBar = () => {
    return (
        <div className="flex min-h-screen">
            <SideBar items={sidebarItems} end="libraries" />
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};
