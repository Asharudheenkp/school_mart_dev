"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { HeroImagesSkeleton } from "./HeroImagesSkeleton";

import loaderImage from '@/public/New Project.png'; // Adjust the path as per your project structure

const HeroImageSlider = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api', {cache: 'no-cache'});

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const resJson = await response.json();
      setImages(resJson.images);
      setLoading(false);
      
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-[80%] mx-auto mt-16">
      <Carousel className="w-full" opts={{ loop: true }} plugins={[
        Autoplay({
          delay: 2000,
          jump: false,
          stopOnMouseEnter: true,
          stopOnInteraction: false
        }),
      ]}>
        <CarouselContent>
          {images.length > 0 ? (
            images.map((value, index) => (
              <CarouselItem key={index}>
                <div className="p-1 h-96">
                  <Image
                    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8/B8AAqsB1DKTUZgAAAAASUVORK5CYII='
                    placeholder="blur"
                    className={`w-full h-full object-cover rounded-md ${loading ? 'opacity-0' : 'opacity-100'}`}
                    src={value}
                    alt="product image"
                    width={1000}
                    height={1000}
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <HeroImagesSkeleton />
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HeroImageSlider;
