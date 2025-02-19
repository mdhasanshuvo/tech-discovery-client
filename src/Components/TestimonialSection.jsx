import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay, Pagination } from "swiper/modules";

const testimonials = [
    {
        name: "John Doe",
        role: "Tech Enthusiast",
        feedback:
            "Tech Discovery is an amazing platform! I found so many cool apps and AI tools that I wouldn't have discovered otherwise.",
        image:
            "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Emma Watson",
        role: "Startup Founder",
        feedback:
            "As a founder, getting my product featured here was a game-changer. The community engagement is top-notch!",
        image:
            "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Michael Lee",
        role: "Software Developer",
        feedback:
            "I love how easy it is to explore new tech trends. The upvoting system ensures only the best products shine!",
        image:
            "https://randomuser.me/api/portraits/men/29.jpg",
    },
    {
        name: "Sophia Martinez",
        role: "Product Designer",
        feedback:
            "Tech Discovery has helped me stay ahead in the industry. I get daily inspiration from the latest innovative products.",
        image:
            "https://randomuser.me/api/portraits/women/56.jpg",
    },
];

const TestimonialSection = () => {
    return (
        <section className="bg-base-200">
            <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-primary mb-6">
                        What Our Users Say
                    </h2>
                    <p className="text-lg text-gray-500 mb-12">
                        See how Tech Discovery is helping innovators and enthusiasts
                        worldwide!
                    </p>

                    <Swiper
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            1024: { slidesPerView: 2 },
                        }}
                        modules={[Autoplay, Pagination]}
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 mb-10">
                                    <img
                                        className="w-20 h-20 rounded-full object-cover border-4 border-primary"
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                    />
                                    <p className="text-gray-500 italic mt-4">"{testimonial.feedback}"</p>
                                    <h3 className="text-lg font-semibold text-gray-800 mt-4">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
