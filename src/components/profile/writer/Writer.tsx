import { getProfile } from "@/API/WriterAPI"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import EditBtn from "../EditBtn"
import EditWriterForm from "./EditWriterForm"
import WriterInfo from "./WriterInfo"

export default function Writer() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const isEditPath = queryParams.get('editWriterProfile')!

    const [isEdit, setIsEdit] = useState(isEditPath ? true : false)
    const navigate = useNavigate()
    const { data, isLoading } = useQuery({
        queryKey: ['witerInfo'],
        queryFn: getProfile
    })

    useEffect(() => {
        if (isEditPath) {
            setIsEdit(true);
        } else {
            setIsEdit(false)
        }
    }, [isEditPath]);

    const toggleEdit = () => {
        if (isEditPath) {
            navigate(location.pathname, { replace: true });
        } else {
            navigate(`${location.pathname}?editWriterProfile=true`)
        }
    };

    if (isLoading) return 'Cargando...'

    if (data) return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-700">Informacion de escritor</h3>
                <EditBtn editFuntion={toggleEdit} />
            </div>

            <div className="flex flex-wrap md:flex-nowrap p-2 mt-4">
                {!isEdit ? <WriterInfo data={data} /> : <EditWriterForm data={data} />}
            </div>

        </>
    )
}
