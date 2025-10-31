import { Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { BooksPage } from "../pages/books/BooksPage";
import { LoadCSVPage } from "../pages/LoadCSVPage";
import { SimulationPage } from "../pages/SimulationPage";
import { StructuresPage } from "../pages/StructuresPage";
import { AppLayout } from "./AppLayout";
import { BooksSidebar } from "@/components/books";
import { AddLibraryPage, GraphPage, LibrariesPage } from "@/pages/library";
import { AddBookPage, ExportBookPage, SearchBookPage, SearchComparisonPage } from "@/pages/books";
import { LibrariesSideBar } from "@/components/libraries/LibrariesSideBar";
import { AddEdgesPage } from "@/pages/library/AddEdgesPage";

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
                    <Route path="/libraries" element={<LibrariesSideBar />}>
                        <Route index element={<LibrariesPage />} />
                        <Route path="add-library" element={<AddLibraryPage />} />
                        <Route path="add-edges" element={<AddEdgesPage />} />
                        <Route path="graph" element={<GraphPage />} />
                    </Route>
                    <Route path="/load" element={<LoadCSVPage />} />
                    <Route path="/simulation" element={<SimulationPage />} />
                    <Route path="/structures" element={<StructuresPage />} />
                    <Route path="/*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </div>
    );
};
