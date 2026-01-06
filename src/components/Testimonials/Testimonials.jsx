import React from "react";
import Slider from "react-slick";

const TestimonialsData = [
  {
    id: 1,
    name: "Victor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolorum ipsa molestiae ratione labore tempora",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Satya Nadella",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolorum ipsa molestiae ratione labore tempora",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Virat Kohli",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolorum ipsa molestiae ratione labore tempora",
    img: "https://picsum.photos/103/103",
  },
  {
    id: 4,
    name: "Jamenis W.",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolorum ipsa molestiae ratione labore tempora",
    img: "https://picsum.photos/104/104",
  },
  {
    id: 5,
    name: "Henry Willam",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolorum ipsa molestiae ratione labore tempora",
    img: "https://picsum.photos/105/105",
  },
];

const Testimonials = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 mb-10">
      <div className="container">
        
        {/* Header Section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            What our customers are saying
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Testimonials
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Unde doloremque ea ex quisquam ut harum non culpa nam vitae.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {TestimonialsData.map((data) => (
              <div key={data.id} className="px-4 my-6">
                
                <div
                  className="flex flex-col gap-4 shadow-lg bg-primary/15
                  py-8 px-6 rounded-xl dark:bg-gray-800 relative"
                >
                  
                  {/* User Image */}
                  <div className="flex justify-center mb-4">
                    <img
                      src={data.img}
                      alt=""
                      className="rounded-full w-20 h-20 object-cover"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col items-center gap-4 text-center">
                    <p className="text-xs text-gray-700">{data.text}</p>

                    <h1 className="text-lg font-bold text-black/90">
                      {data.name}
                    </h1>
                  </div>

                  {/* Quote Icon */}
                  <p className="text-black/20 text-7xl font-serif absolute top-2 right-4">
                    ”
                  </p>
                </div>

              </div>
            ))}
          </Slider>
        </div>

      </div>
    </div>
  );
};

export default Testimonials;

