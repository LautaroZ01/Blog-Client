import { Column } from "@/types/postType"

type TableProps = {
    columns: Column[]
    children: React.ReactNode
}

export default function Table({ columns, children }: TableProps) {
    return (
        <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-4">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        {columns.map((column, index) => (
                            <th scope="col" className="px-6 py-3" key={index}>
                                {column.label}
                            </th>
                        ))}
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}
