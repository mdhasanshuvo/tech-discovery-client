import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

const BannerSlider = () => {
  const slides = [
    {
      id: 1,
      image: "https://i.ibb.co.com/1Qs8g7N/6373cc9fc7ac670379e6869d-Email-Header.png",
    },
    {
      id: 2,
      image: "https://i.ibb.co/sQ5J7yd/ph-launch-blog-post-cover.png",
    },
    {
      id: 3,
      image: "https://i.ibb.co.com/4FrzwMj/image-asset.png",
    },
  ];

  return (
    <div className="w-full bg-base-100 shadow-lg">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
        showStatus={false}
        swipeable={true}
        className="rounded-lg overflow-hidden"
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="object-cover w-full h-[75vh] sm:h-[60vh] lg:h-[80vh]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 sm:pb-8 lg:pb-16 bg-gradient-to-b from-black/60 via-transparent to-black/80 text-white text-center px-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                {slide.title}
              </h2>
              <Link to="/products">
                <button className="btn btn-primary px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-primary-focus transition duration-300 transform hover:scale-105">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );

};

export default BannerSlider;
