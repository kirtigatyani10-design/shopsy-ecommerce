import React from "react";
import Banner from "../../assets/Footer.png";
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const HelpLinks = [
  "Your Account",
  "Returns Centre",
  "Recalls and Product Safety Alerts",
  "100% Purchase Protection",
  "Help",
];


const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return ( 
    <footer className="bg-white dark:bg-gray-900 mt-10 py-8 border-t">

    <div style={BannerImg} className="container text-black/300 mb-25 bg-primary">
      <div className="container">
        <div data-aoa="zoom-in" className="grid md:grid-cols-3 pv-44 pt-5">
          {/* company details */}
          <div className="py-8 px-4">
            <h1
              className="sm:text-3xl text-xl font-bold
            sm:text-left text-justify mb-3 flex
            items-center gap-3 "
            >
            </h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora,
              nobis aut quaerat iusto magni non excepturi at dignissimos amet
              fugiat commodi laboriosam quis, esse, pariatur vitae sapiente
              ullam cumque consectetur?
            </p>
          </div>

          {/* Footer Links */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3
          col-span-2 md:pl-10"
          >
            <div>
              <div className="py-8 px-4">
                <h1
                  className="sm:text-xl text-xl
                font-bold sm:text-left text-justify mb-3"
                >
                  Important Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      className="cursor-pointer hover:text-primary
                        hover:translate-x-1 duration-300
                        text-gray-800"
                      key={link.title}
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="py-8 px-4">
                <h1
                  className="sm:text-xl text-xl
                font-bold sm:text-left text-justify mb-3"
                >
                  Lets Us Help You
                </h1>
                <ul className="flex flex-col gap-3">
                  {HelpLinks.map((text, index) => (
                    <li
                      className="cursor-pointer hover:text-primary
                        hover:translate-x-1 duration-300
                        text-gray-800"
                      key={index}
                    >
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social Links */}
            <div>
                <div className="flex items-center gap-3 mt-6">
                    <a href="#">
                        <FaFacebook className="text-3xl" />
                    </a>
                    <a href="#">
                        <FaInstagram className="text-3xl" />
                    </a>
                    <a href="#">
                        <FaLinkedin className="text-3xl" />
                    </a>
                </div>
                <div className="mt-6">
                    <div className="flex items-center gap-3">
                        <FaLocationArrow />
                        <p>Noida, Uttar Pradesh</p>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                        <FaMobileAlt />
                        <p>+91 123456789</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <p className="text-center text-bold text-gray-900 mt-10">
            © {year} Shopsy.Com . All rights reserved !!
          </p>
    </footer>
  );
};

export default Footer;
