import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { useState, useEffect, useRef } from "react";

// Desktop landscape photos
const desktopImages = [
  "/images/events/desktop/slide1.jpg",
  "/images/events/desktop/slide2.jpg",
  "/images/events/desktop/slide3.jpg",
  "/images/events/desktop/slide4.jpg",
  "/images/events/desktop/slide5.jpg",
  "/images/events/desktop/slide6.jpg",
  "/images/events/desktop/slide7.jpg",
];

// Mobile portrait photos
const mobileImages = [
  "/images/events/mobile/slide1.jpg",
  "/images/events/mobile/slide2.jpg",
  "/images/events/mobile/slide3.jpg",
  "/images/events/mobile/slide4.jpg",
  "/images/events/mobile/slide5.jpg",
  "/images/events/mobile/slide6.jpg",
  "/images/events/mobile/slide7.jpg",
];

const BackgroundCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const autoScrollRef = useRef<any>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    // Check on mount
    checkMobile();

    // Check on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Create persistent AutoScroll plugin instance
  if (!autoScrollRef.current) {
    autoScrollRef.current = AutoScroll({
      speed: 0.5,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    });
  }

  const slideshowImages = isMobile ? mobileImages : desktopImages;

  return (
    <div className="fixed inset-0 w-full h-full bg-black -z-10">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
        plugins={[autoScrollRef.current]}
        className="w-full h-full"
      >
        <CarouselContent className="h-full">
          {/* Duplicate images for seamless infinite scroll */}
          {[...slideshowImages, ...slideshowImages, ...slideshowImages].map((image, index) => (
            <CarouselItem key={index} className="h-full basis-full">
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={image}
                  alt={`RCCIIT event photo ${(index % slideshowImages.length) + 1}`}
                  className="w-full h-full object-cover"
                  loading={index < 3 ? "eager" : "lazy"}
                  onError={(e) => {
                    console.error(`Failed to load image: ${image}`);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* Dark overlay with blur effect */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] pointer-events-none"></div>
    </div>
  );
};

export default BackgroundCarousel;
