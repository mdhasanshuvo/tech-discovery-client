import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
              className="object-cover w-full h-[75vh]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 bg-gradient-to-b from-black via-transparent to-black text-blue-200 text-center px-4">
              <button className="btn btn-primary px-6 text-lg font-semibold rounded-full shadow-md hover:bg-primary-focus transition">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerSlider;
