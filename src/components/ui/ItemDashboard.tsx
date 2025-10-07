
type ItemDashboardProps = {
    color?: string
    bgColor?: string
    title: string
    quantity: number
    icon: React.ReactNode
}

export default function ItemDashboard({ title, quantity, icon, color, bgColor }: ItemDashboardProps) {
  return (
    <div className="py-8 pr-8 rounded-lg flex items-start gap-6">
        <div className='pl-6 relative grow min-w-40 space-y-2'>
            <div className={`absolute top-0 left-0 w-1 rounded-full h-full bg-${color}`} />
            <h3 className="font-semibold text-gray-500">{title}</h3>
            <p className="text-2xl font-semibold">{quantity}</p>
        </div>
        <div className={`text-${color} ${bgColor} p-2 rounded-lg`}>
            {icon}
        </div>
    </div>
  )
}
