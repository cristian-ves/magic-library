import { useEffect, useRef } from "react";
import { useLibraries } from "@/hooks/useLibraries";
import { insertTemplateData } from "@/utils/insertTemplateData";

export const AppInitializer = () => {
    const { addLibrary, librariesGraph } = useLibraries();
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;

        insertTemplateData(addLibrary);

        const edges: { from: string; to: string; weight: number; type: "time" | "cost" }[] = [
            { from: "lib1", to: "lib2", weight: 10, type: "time" },
            { from: "lib2", to: "lib3", weight: 8, type: "cost" },
            { from: "lib2", to: "lib4", weight: 12, type: "time" },
            { from: "lib3", to: "lib4", weight: 20, type: "cost" },
        ];

        edges.forEach(({ from, to, weight, type }) => {
            librariesGraph.addEdge(from, to, weight, type, true);
        });

        initialized.current = true;
    }, [addLibrary, librariesGraph]);

    return null;
};
