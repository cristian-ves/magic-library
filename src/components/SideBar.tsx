import type { JSX } from "react";
import { NavLink } from "react-router-dom";

export interface SidebarItem {
    name: string;
    icon: JSX.Element;
    path: string;
}

interface SideBarProps {
    title?: string;
    items: SidebarItem[];
    end: string
}

export const SideBar = ({ title = "Books menu", items, end }: SideBarProps) => {
    return (
        <aside className="w-64 h-screen bg-grayPurple text-lightPurple flex flex-col shadow-glow p-4 sticky">
            <h1 className="text-2xl font-heading mb-8 text-center">{title}</h1>
            <nav className="flex flex-col gap-2">
                {items.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        end={item.path === `/${end}`}
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
        </aside>
    );
};
