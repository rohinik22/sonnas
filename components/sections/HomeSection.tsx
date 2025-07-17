import Image from "next/image";
import { Star } from "lucide-react";

export default function HomeSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8 group">
          <h1 className="text-6xl lg:text-8xl font-bold text-white leading-tight group-hover:text-orange-600 transition-colors duration-300 opacity-0 animate-fadeInUp [animation-delay:0.2s]">
            S
            <span className="inline-block relative w-[1.4em] h-[1.4em] align-middle mx-1">
              <Image
                src="/pizza.webp"
                alt="Pizza Slice"
                fill
                className="object-contain animate-spin-slow"
              />
            </span>
            nna&apos;s
          </h1>

          <p className="text-lg lg:text-2xl text-gray-300 opacity-0 animate-fadeInUp [animation-delay:0.4s]">
            By <span className="text-red-600">SONNA SUBLOK</span>
          </p>

          <span className="text-3xl lg:text-4xl text-green-600 group-hover:text-yellow-500 transition-colors duration-300 flex items-center gap-2 opacity-0 animate-fadeInUp [animation-delay:0.6s]">
            <Image src="/veg.png" alt="Veg" width={32} height={32} />
            100% Veg
          </span>

          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fadeInUp [animation-delay:0.8s]">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition hover:scale-105">
              Order Now
            </button>
            <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-full font-semibold transition hover:scale-105">
              View Menu
            </button>
          </div>

          <div className="flex items-center space-x-2 opacity-0 animate-fadeInUp [animation-delay:1s]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
            <span className="text-gray-300 font-medium">4.9/5 Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
