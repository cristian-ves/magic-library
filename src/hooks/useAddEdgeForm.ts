import { useState } from "react";

export const useAddEdgeForm = (initialSourceId = "") => {
    const [sourceId, setSourceId] = useState(initialSourceId);
    const [targetId, setTargetId] = useState("");
    const [weight, setWeight] = useState<number>(0);
    const [type, setType] = useState<"time" | "cost">("time");
    const [bidirectional, setBidirectional] = useState(true);

    const reset = () => {
        setSourceId("");
        setTargetId("");
        setWeight(0);
        setType("time");
        setBidirectional(true);
    };

    return {
        sourceId,
        setSourceId,
        targetId,
        setTargetId,
        weight,
        setWeight,
        type,
        setType,
        bidirectional,
        setBidirectional,
        reset,
    };
};
