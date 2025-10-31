import type { GraphNode } from "@/structures";
import type { Library } from "@/types/types";

interface LibrarySelectProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    options: GraphNode<Library>[];
}

export const LibrarySelect = ({ label, value, onChange, options }: LibrarySelectProps) => (
    <div className="flex flex-col gap-1">
        <label className="font-body">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="p-2 rounded-md border border-grayPurple focus:outline-none focus:ring-2 focus:ring-magicPurple"
        >
            <option value="">Select {label.toLowerCase()}</option>
            {options.map((node) => (
                <option key={node.value.id} value={node.value.id}>
                    {node.value.name} ({node.value.id})
                </option>
            ))}
        </select>
    </div>
);
