import DisplayCards from "@/components/ui/display-cards";

export default function ServiceSection() {
  return (
    <section id="service" className="py-20 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We offer a range of services to make your dining experience unforgettable.
          </p>
        </div>
        <div className="flex justify-center">
          <DisplayCards />
        </div>
      </div>
    </section>
  );
}