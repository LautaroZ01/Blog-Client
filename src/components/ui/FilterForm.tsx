import { ReactNode } from "react"
import { useForm, UseFormRegister, FieldValues, DefaultValues, Path } from "react-hook-form"
import { FiSearch } from "react-icons/fi"
import Filter from "./Filter"

type BaseFilter = {
    search?: string
}

type FilterFormProps<T extends BaseFilter> = {
    defaultValues: DefaultValues<T>
    onSubmit: (data: T) => void
    children?: (register: UseFormRegister<T>) => ReactNode
    placeholder?: string
    isActiveFilter?: boolean
    isList?: boolean
}

export function FilterForm<T extends FieldValues>({
    defaultValues,
    onSubmit,
    children,
    placeholder = "Buscar...",
    isActiveFilter = true,
    isList = false
}: FilterFormProps<T>) {

    const { register, handleSubmit } = useForm<T>({
        defaultValues
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`flex gap-2 ${isList ? 'justify-center' : 'justify-end'} w-full flex-wrap`}>
            <div className="mb-4 flex flex-col gap-2 justify-center items-end">
                <div className="flex items-center justify-center lg:w-xl border border-gray-300 rounded-md">
                    <input
                        type="text"
                        placeholder={placeholder}
                        {...register("search" as Path<T>)}
                        className="w-full focus:outline-none p-2 autofill:bg-white autofill:text-gray-800"
                    />
                    <button
                        type="submit"
                        className="text-gray-500 py-2 px-4 border-l border-gray-300 cursor-pointer"
                    >
                        <FiSearch />
                    </button>
                </div>
            </div>

            {isActiveFilter && (
                <Filter>
                    {children && (
                        <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-end">
                            {children(register)}
                            <button type="submit" className="btn-secundary">Filtrar</button>
                        </div>
                    )}
                </Filter>
            )}
        </form>
    )
}
