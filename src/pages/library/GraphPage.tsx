import { useEffect, useRef } from "react";
import { useLibraries } from "@/hooks/useLibraries";
import { Network } from "vis-network/standalone";
import type { GraphNode } from "@/structures";
import type { Library } from "@/types/types";

export const GraphPage = () => {
    const { librariesList, librariesGraph } = useLibraries();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const allNodes = librariesList.print();
        const nodes = allNodes.map((node: GraphNode<Library>, index: number) => {
            const spacing = 200;
            const cols = Math.ceil(Math.sqrt(allNodes.length));
            const x = (index % cols) * spacing;
            const y = Math.floor(index / cols) * spacing;

            return {
                id: node.value.id,
                label: node.value.name,
                shape: "circle",
                color: { background: "#8b5cf6", border: "#7c3aed" },
                font: { color: "#f8f8f8" },
                x,
                y,
                fixed: false,
            };
        });

        const edges: { from: string; to: string; label: string; color?: { color: string }; arrows?: string }[] = [];
        allNodes.forEach((node: GraphNode<Library>) => {
            const outgoing = librariesGraph.getEdges(node.value.id);
            outgoing.forEach((edge) => {
                edges.push({
                    from: node.value.id,
                    to: edge.target,
                    label: `${edge.weight} (${edge.type})`,
                    color: { color: "#a78bfa" },
                    arrows: "to",
                });
            });
        });

        const data = { nodes, edges };
        const options = {
            layout: { improvedLayout: false },
            physics: {
                enabled: true,
                stabilization: true,
                barnesHut: { springLength: 200, springConstant: 0.05, avoidOverlap: 1 }
            },
            edges: {
                smooth: { enabled: true, type: "cubicBezier", roundness: 0.4 },
                font: { align: "middle" },
            },
            nodes: {
                shape: "circle",
            },
        };

        const network = new Network(containerRef.current, data, options);
        return () => network.destroy();
    }, [librariesList, librariesGraph]);

    return <div ref={containerRef} style={{ height: "80vh", width: "100%" }} />;
};
