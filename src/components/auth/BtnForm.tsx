type BtnFormProps = {
    value: string
}

export default function BtnForm({ value }: BtnFormProps) {
    return (
        <input
            type="submit"
            value={value}
            className="cursor-pointer bg-primary-400 text-white py-2 rounded-md w-full mt-4 hover:bg-primary-500 transition-colors duration-pro"
        />
    )
}
