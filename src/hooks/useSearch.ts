// hooks/useSearch.ts
import { useState, useMemo } from "react";

export function useSearch<T>(data: T[], searchFields: (keyof T)[]) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = useMemo(() => {
        if (!searchTerm) return data;

        return data.filter((item) =>
            searchFields.some((field) => {
                const value = item[field];
                return (
                    value &&
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                );
            })
        );
    }, [data, searchTerm, searchFields]);

    return {
        searchTerm,
        setSearchTerm,
        filteredData,
    };
}