import { contactsTypeSchema, socialNetworksTypeSchema } from "@/types/userType";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaLinkedin,
  FaTelegramPlane
} from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import { z } from "zod";


type SocialIconProps = {
  name?: z.infer<typeof socialNetworksTypeSchema> | z.infer<typeof contactsTypeSchema>;
  size: 'big' | 'normal' | 'small'
  color?: string
  className?: string
}

const SocialIcons = [
  {
    name: 'facebook',
    icon: FaFacebook,
    defaultColor: 'text-blue-600' // Tailwind class
  },
  {
    name: 'instagram',
    icon: FaInstagram,
    defaultColor: 'text-pink-600'
  },
  {
    name: 'youtube',
    icon: FaYoutube,
    defaultColor: 'text-red-600'
  },
  {
    name: 'twitter',
    icon: FaXTwitter,
    defaultColor: 'text-black'
  },
  {
    name: 'phone',
    icon: FaPhone,
    defaultColor: 'text-blue-400'
  },
  {
    name: 'email',
    icon: FaEnvelope,
    defaultColor: 'text-gray-600'
  },
  {
    name: 'whatsapp',
    icon: FaWhatsapp,
    defaultColor: 'text-green-500'
  },
  {
    name: 'linkedin',
    icon: FaLinkedin,
    defaultColor: 'text-blue-700'
  },
  {
    name: 'thrends',
    icon: FaThreads,
    defaultColor: 'text-black'
  },
  {
    name: 'telegram',
    icon: FaTelegramPlane,
    defaultColor: 'text-blue-400'
  }
];

export default function SocialIcon({ name, size = 'small', color, className = '' }: SocialIconProps) {
  const iconData = SocialIcons.find(item => item.name === name);
  const sizeClass = size === 'big' ? 'size-26' : size === 'normal' ? 'size-10' : 'size-6';

  if (!iconData) {
    console.warn(`No se encontró un icono para: ${name}`);
    return null;
  }

  const IconComponent = iconData.icon;
  const colorClass = color || iconData.defaultColor;

  return (
    <IconComponent
      className={`${sizeClass} ${colorClass} ${className}`}
    />
  );
}