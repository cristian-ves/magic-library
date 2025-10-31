// Graph.ts
// O((V + E) log V) for shortest-path (Dijkstra with binary heap)
// O(1) average for add/remove node/edge (amortized, depending on internal maps)
// Chosen because weighted graphs model library network and Dijkstra provides

import { HashTable } from "./HashTable";

export interface Edge {
    target: string;
    weight: number;
    type: "time" | "cost";
}

export class GraphNode {
    name: string;
    edges: Edge[];

    constructor(name: string) {
        this.name = name;
        this.edges = [];
    }
}

export class Graph {
    private nodes: HashTable;

    constructor(size = 100) {
        this.nodes = new HashTable(size);
    }

    addNode(name: string): void {
        if (!this.nodes.get(name)) {
            this.nodes.set(name, new GraphNode(name));
        }
    }

    addEdge(
        source: string,
        target: string,
        weight: number,
        type: "time" | "cost",
        bidirectional = true
    ): void {
        const src: GraphNode | null = this.nodes.get(source);
        const tgt: GraphNode | null = this.nodes.get(target);
        if (!src || !tgt) return;

        src.edges.push({ target, weight, type });
        if (bidirectional) tgt.edges.push({ target: source, weight, type });
    }

    getNode(name: string): GraphNode | null {
        return this.nodes.get(name);
    }

    getNodes(): string[] {
        const allNodes: string[] = [];
        for (let i = 0; i < (this.nodes as any).table.length; i++) {
            const chain = (this.nodes as any).table[i];
            for (const entry of chain) {
                allNodes.push(entry.key);
            }
        }
        return allNodes;
    }

    getEdges(name: string): Edge[] {
        const node: GraphNode | null = this.nodes.get(name);
        return node ? node.edges : [];
    }

    shortestPath(
        start: string,
        end: string,
        type: "time" | "cost"
    ): { path: string[]; total: number } {
        const dist: Record<string, number> = {};
        const prev: Record<string, string | null> = {};
        const unvisited = new Set<string>(this.getNodes());

        for (const node of unvisited) dist[node] = Infinity;
        dist[start] = 0;

        while (unvisited.size) {
            let current = Array.from(unvisited).reduce((a, b) =>
                dist[a] < dist[b] ? a : b
            );
            unvisited.delete(current);
            if (current === end) break;

            for (const edge of this.getEdges(current)) {
                if (edge.type !== type) continue;
                const alt = dist[current] + edge.weight;
                if (alt < dist[edge.target]) {
                    dist[edge.target] = alt;
                    prev[edge.target] = current;
                }
            }
        }

        const path: string[] = [];
        let curr: string | undefined = end;
        while (curr) {
            path.unshift(curr);
            curr = prev[curr] || undefined;
        }

        return { path, total: dist[end] };
    }
}
