import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

export const AppLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-purple-50 text-deepPurple font-body">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};
