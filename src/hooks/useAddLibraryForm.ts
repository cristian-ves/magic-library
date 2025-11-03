import type { Library } from "@/types/types";
import { useState } from "react";

export const useAddLibraryForm = () => {
    const [values, setValues] = useState<
        Omit<Library, "entryQueue" | "transferQueue" | "exitQueue" | "books">
    >({
        id: "",
        name: "",
        location: "",
        entryTime: 0,
        transferTime: 0,
        dispatchInterval: 0,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (
        field: keyof typeof values,
        value: string | number
    ) => {
        setValues((prev) => ({ ...prev, [field]: value }));
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!values.id) newErrors.id = "ID is required";
        if (!values.name) newErrors.name = "Name is required";
        if (!values.location) newErrors.location = "Location is required";
        if (values.entryTime <= 0)
            newErrors.entryTime = "Entry time must be positive";
        if (values.transferTime <= 0)
            newErrors.transferTime = "Transfer time must be positive";
        if (values.dispatchInterval <= 0)
            newErrors.dispatchInterval = "Dispatch interval must be positive";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return { values, errors, handleChange, validate };
};
