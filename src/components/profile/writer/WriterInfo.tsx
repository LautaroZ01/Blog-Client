import { Writer } from "@/types/userType"

type WriterInfoProps = {
    data: Writer
}

export default function WriterInfo({ data }: WriterInfoProps) {
    return (
        <div className="w-full space-y-4">
            <div className="container-responsive-profile">
                <div className="container-profile">
                    <p className="label-profile">Apodo</p>
                    <strong className="profile-info">{data.nickname}</strong>
                </div>
                <div className="container-profile">
                    <p className="label-profile ">Bio</p>
                    <strong className="profile-info min-w-full md:max-w-[70ch]">{data.bio}</strong>
                </div>
            </div>
        </div>
    )
}
