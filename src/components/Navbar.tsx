import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaUniversity,
  FaProjectDiagram,
  FaFileCsv,
  FaPlay,
  FaLayerGroup,
} from "react-icons/fa";

const items = [
  { label: "Home", path: "/", icon: FaHome },
  { label: "Books", path: "/books", icon: FaBook },
  { label: "Libraries", path: "/libraries", icon: FaUniversity },
  { label: "Graph", path: "/graph", icon: FaProjectDiagram },
  { label: "Load CSV", path: "/load", icon: FaFileCsv },
  { label: "Simulation", path: "/simulation", icon: FaPlay },
  { label: "Structures", path: "/structures", icon: FaLayerGroup },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full bg-[linear-gradient(90deg,#845ec2_0%,#b39cd0_100%)] shadow-glow z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1
          className="text-2xl font-heading text-lightPurple tracking-wide cursor-pointer drop-shadow-md hover:text-magicGreen transition-colors duration-300"
          onClick={() => navigate("/")}
        >
          ✨ Magic Library
        </h1>

        <div className="hidden md:flex gap-6">
          {items.map(({ label, path, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex items-center gap-2 font-body text-sm px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer
                  ${isActive
                    ? "bg-lightPurple text-magicPurple shadow-glow scale-105"
                    : "text-lightPurple hover:text-magicGreen hover:bg-white/10 hover:shadow-glow"
                  }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
