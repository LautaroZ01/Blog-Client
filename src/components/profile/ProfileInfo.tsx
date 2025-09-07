import { Profile } from "@/types/userType"
import { formatBirthdate } from "@/utils/formatUtil"

type ProfileInfoProps = {
    data: Profile
}

export default function ProfileInfo({ data }: ProfileInfoProps) {
    return (
        <div
            className="w-full space-y-4"
        >
            <div className="container-responsive-profile">
                <div className="container-profile">
                    <p className="label-profile">Nombre</p>
                    <strong className="profile-info">{data.name}</strong>
                </div>
                <div className="container-profile">
                    <p className="label-profile">Apellido</p>
                    <strong className="profile-info">{data.lastname}</strong>
                </div>
            </div>
            <div className="container-responsive-profile">
                <div className="container-profile">
                    <p className="label-profile">Correo electronico</p>
                    <strong className="profile-info">{data.email}</strong>
                </div>
                <div className="container-profile">
                    <p className="label-profile">Fecha de nacimiento</p>
                    <strong className="profile-info">{data.birthdate ? formatBirthdate(data.birthdate) : '¿Cuando naciste?'}</strong>
                </div>
            </div>
            <div className="container-responsive-profile">
                <div className="container-profile">
                    <p className="label-profile">Pais</p>
                    <strong className="profile-info">{data.country ? data.country : '¿De que pais eres?'}</strong>
                </div>
            </div>
        </div>
    )
}
