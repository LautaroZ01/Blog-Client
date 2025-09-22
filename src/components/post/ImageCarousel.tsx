import { Category, Post } from "@/types/postType";
import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ImgContainer from "./ImgContainer";

interface ImageCarouselProps {
    images: Post['images'];
    category: Category['name'];
}

export default function ImageCarousel({ images, category }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    }, [images.length]);

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            if (!isHovered) {
                nextSlide();
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, isHovered, images.length, nextSlide]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    if (images.length === 0) return null;

    return (
        <div
            className="relative w-full h-96 md:h-[720px] overflow-hidden my-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {images.length > 1 && (
                <>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            prevSlide();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-10 hover:bg-black/50 transition-all duration-300 transform hover:scale-110 cursor-pointer ease-in-out"
                        aria-label="Previous image"
                    >
                        <FaChevronLeft size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            nextSlide();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-10 hover:bg-black/50 transition-all duration-300 transform hover:scale-110 cursor-pointer ease-in-out"
                        aria-label="Next image"
                    >
                        <FaChevronRight size={16} />
                    </button>
                </>
            )}

            <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <ImgContainer key={index} img={image} alt={`Slide ${index + 1}`} />
                ))}
            </div>

            {/* Dots Indicator */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                goToSlide(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-all cursor-pointer ease-in-out duration-300 ${index === currentIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/70'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            <div className="absolute bottom-0 right-0 z-10 p-4">
                <span className="text-xs text-primary-50 border-primary-700 border rounded-full px-2 py-1 inline-flex items-center gap-1 bg-primary-800">
                    {category}
                </span>
            </div>
        </div>
    );
}
