import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaUniversity,
  FaFileCsv,
  FaPlay,
  FaLayerGroup,
} from "react-icons/fa";

const items = [
  { label: "Home", path: "/", icon: FaHome },
  { label: "Books", path: "/books", icon: FaBook },
  { label: "Libraries", path: "/libraries", icon: FaUniversity },
  { label: "Load CSV", path: "/load", icon: FaFileCsv },
  { label: "Simulation", path: "/simulation", icon: FaPlay },
  { label: "Structures", path: "/structures", icon: FaLayerGroup },
];

export const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 w-full bg-[linear-gradient(90deg,#845ec2_0%,#b39cd0_100%)] shadow-glow z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <NavLink
          to="/"
          className="text-2xl font-heading text-lightPurple tracking-wide cursor-pointer drop-shadow-md hover:text-magicGreen transition-colors duration-300"
          end
        >
          ✨ Magic Library
        </NavLink>

        <div className="hidden md:flex gap-6">
          {items.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2 font-body text-sm px-4 py-2 rounded-lg transition-all duration-300
                 ${isActive
                  ? "bg-lightPurple text-magicPurple shadow-glow scale-105"
                  : "text-lightPurple hover:text-magicGreen hover:bg-white/10 hover:shadow-glow"}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
