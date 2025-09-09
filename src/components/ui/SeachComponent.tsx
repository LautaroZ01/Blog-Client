import { ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";
import Filter from "./Filter";

type SearchComponentProps<T> = {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    searchFields: (keyof T)[];
    placeholder?: string;
    children?: React.ReactNode;
};

export function SearchComponent<T>({
    searchTerm,
    onSearchChange,
    searchFields,
    placeholder = "Buscar...",
    children
}: SearchComponentProps<T>) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    };

    return (
        <div className="flex gap-2 justify-end w-full">
            <div className="mb-4 flex flex-col gap-2 justify-center items-end grow">
                <div className="lg:flex items-center justify-center w-full lg:max-w-lg border border-gray-300 rounded-md">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="w-full focus:outline-none p-2 autofill:bg-white autofill:text-gray-800"
                    />
                    <div className="text-gray-500 py-2 px-4 border-l border-gray-300">
                        <FiSearch />
                    </div>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                    Buscando en: {searchFields.join(", ")}
                </p>

            </div>
            <Filter>
                {children}
            </Filter>
        </div>
    );
}