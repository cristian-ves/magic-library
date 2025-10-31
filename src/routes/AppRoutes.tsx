import { Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { BooksPage } from "../pages/books/BooksPage";
import { LibrariesPage } from "../pages/LibrariesPage";
import { GraphPage } from "../pages/GraphPage";
import { LoadCSVPage } from "../pages/LoadCSVPage";
import { SimulationPage } from "../pages/SimulationPage";
import { StructuresPage } from "../pages/StructuresPage";
import { AppLayout } from "./AppLayout";
import { BooksSidebar } from "@/components/books";
import { AddBookPage } from "@/pages/books/AddBookPage";
import { SearchBookPage } from "@/pages/books/SearchBookPage";
import { SearchComparisonPage } from "@/pages/books/SearchComparisonPage";
import { ExportBookPage } from "@/pages/books/ExportBookPage";

export const AppRoutes = () => {
    return (
        <div className="min-h-screen">
            <Routes>
                <Route element={<AppLayout />}>

                    <Route index element={<MainPage />} />
                    <Route path="/books" element={<BooksSidebar />}>
                        <Route index element={<BooksPage />} />
                        <Route path="add-book" element={<AddBookPage />} />
                        <Route path="search" element={<SearchBookPage />} />
                        <Route path="search-comparison" element={<SearchComparisonPage />} />
                        <Route path="export" element={<ExportBookPage />} />
                    </Route>
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
