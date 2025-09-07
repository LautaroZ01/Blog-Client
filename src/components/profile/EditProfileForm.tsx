import { Profile, ProfileForm } from "@/types/userType"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ui/ErrorMessage"
import { countries } from "@/lib/data"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/API/UserAPI"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

type EditProfileFormProps = {
  data: Profile
}

export default function EditProfileForm({ data }: EditProfileFormProps) {
  const initialValues: ProfileForm = {
    email: data.email,
    name: data.name,
    lastname: data.lastname,
    birthdate: data.birthdate ? new Date(data.birthdate).toISOString().split('T')[0] : '',
    country: data.country || ''
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      navigate(
        location.pathname,
        { replace: true }
      );
    }
  })

  const handleUpdate = (formData: ProfileForm) => mutate(formData)

  return (
    <form
      className="w-full space-y-4"
      noValidate
      onSubmit={handleSubmit(handleUpdate)}
    >
      <div className="container-responsive-profile">
        <div className="container-profile">
          <label htmlFor="name" className="label-profile">Nombre</label>
          <input
            type="text"
            id="name"
            className="input-profile"
            placeholder="Escribe tu nombre"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>
        <div className="container-profile">
          <label htmlFor="lastname" className="label-profile">Apellido</label>
          <input
            type="text"
            id="lastname"
            className="input-profile"
            placeholder="Escribe tu apellido"
            {...register("lastname", {
              required: "El Apellido de usuario es obligatorio",
            })}
          />
          {errors.lastname && (
            <ErrorMessage>{errors.lastname.message}</ErrorMessage>
          )}
        </div>
      </div>

      <div className="container-responsive-profile">
        <div className="container-profile">
          <label htmlFor="email" className="label-profile">Correo electronico</label>
          <input
            type="email"
            id="email"
            className="input-profile"
            placeholder="Escribe tu correo"
            {...register("email", {
              required: "El Correo es obligatorio",
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>
        <div className="container-profile">
          <label htmlFor="birthdate" className="label-profile">Fecha de nacimiento</label>
          <input
            type="date"
            id="birthdate"
            className="input-profile"
            placeholder="Escribe tu fecha de nacimiento"
            {...register("birthdate", {
              required: "La Fecha de nacimiento es obligatoria",
            })}
          />
          {errors.birthdate && (
            <ErrorMessage>{errors.birthdate.message}</ErrorMessage>
          )}
        </div>
      </div>

      <div className="container-responsive-profile">
        <div className="container-profile">
          <label htmlFor="country" className="label-profile">País</label>
          <select
            id="country"
            className="input-profile"
            {...register("country", {
              required: "El País es obligatorio",
            })}
          >
            <option value="">Selecciona un país</option>
            {countries.map((country) => (
              <option
                key={country.code}
                defaultValue={country.name}
              >
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <ErrorMessage>{errors.country.message}</ErrorMessage>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end w-full">
        <input
          type="submit"
          value='Guardar'
          className="btn-primary"
        />
      </div>
    </form>
  )
}
