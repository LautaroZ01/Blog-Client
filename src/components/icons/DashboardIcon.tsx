import { FaListUl, FaUsers } from "react-icons/fa"
import { MdArticle } from "react-icons/md";

type DashboardIconProps = {
    name: string
}

const DashboardIcons = [
    {
        name: 'category',
        icon: FaListUl
    },
    {
        name: 'tag',
        icon: FaListUl
    },
    {
        name: 'post',
        icon: MdArticle
    },
    {
        name: 'user',
        icon: FaUsers
    },
    {
        name: 'comment',
        icon: FaListUl
    },
    {
        name: 'settings',
        icon: FaListUl
    }
]


export default function DashboardIcon({ name }: DashboardIconProps) {
    const iconData = DashboardIcons.find(item => item.name === name);

    if (!iconData) {
        console.warn(`No se encontró un icono para: ${name}`);
        return null;
    }

    const IconComponent = iconData.icon;

    return (
        <IconComponent />
    )
}
