import { FaUserAstronaut } from "react-icons/fa6";

type AuthPhotoProps = {
  photo: string
  name: string
  size: 'big' | 'semi-big' | 'normal' | 'small'
}

export default function AuthPhoto({ photo, name, size }: AuthPhotoProps) {
  const sizeClass = size === 'big' ? 'size-24' : size === 'semi-big' ? 'size-16' : size === 'normal' ? 'size-10' : 'size-8';
  
  return (
    photo ? (
      <div className={`${sizeClass} overflow-hidden`}>
        <img
          src={photo}
          alt={name}
          className="object-cover size-full rounded-full shadow-lg"
        />
      </div>
    ) : (
      <div className={`${sizeClass} shadow-lg rounded-full overflow-hidden p-2 bg-primary-400 flex items-center justify-center text-white`}>
        <FaUserAstronaut className="size-full" />
      </div>
    )
  );
}
