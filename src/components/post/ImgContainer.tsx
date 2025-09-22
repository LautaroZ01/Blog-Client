

type ImgContainerProps = {
    img: string
    alt: string
}

export default function ImgContainer({ img, alt }: ImgContainerProps) {
    return (
        <div
            className="w-full h-full flex-shrink-0"
        >
            <img
                src={img}
                alt={alt}
                className="w-full h-full lg:object-cover object-contain aspect-video rounded-lg"
                draggable="false"
            />
        </div>
    )
}
