import { Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { BooksPage } from "../pages/BooksPage";
import { LibrariesPage } from "../pages/LibrariesPage";
import { GraphPage } from "../pages/GraphPage";
import { LoadCSVPage } from "../pages/LoadCSVPage";
import { SimulationPage } from "../pages/SimulationPage";
import { StructuresPage } from "../pages/StructuresPage";
import { AppLayout } from "./AppLayout";

export const AppRoutes = () => {
    return (
        <div className="min-h-screen">
            <Routes>
                <Route element={<AppLayout />}>

                    <Route index element={<MainPage />} />
                    <Route path="/books" element={<BooksPage />} />
                    <Route path="/libraries" element={<LibrariesPage />} />
                    <Route path="/graph" element={<GraphPage />} />
                    <Route path="/load" element={<LoadCSVPage />} />
                    <Route path="/simulation" element={<SimulationPage />} />
                    <Route path="/structures" element={<StructuresPage />} />
                </Route>
            </Routes>
        </div>
    );
};
