import { MdModeEdit } from "react-icons/md";

type EditBtnProps = {
    editFuntion: () => void;
}

export default function EditBtn({ editFuntion }: EditBtnProps) {
    return (
        <button
            type="button"
            onClick={editFuntion}
            className="cursor-pointer border border-gray-300 flex items-center justify-center p-2 rounded-md gap-2 text-gray-800 hover:bg-primary-500 hover:border-transparent hover:text-white transition-all duration-pro"
        >
            <p className="text-sm">Editar</p>
            <MdModeEdit />
        </button>
    )
}
