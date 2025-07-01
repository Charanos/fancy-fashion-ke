import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="flex shadow-lg mb-30 sm:mb-10 xs:mb-100 flex-col sm:flex-row h-[60vh] sm:h-60vh ">
      {/* Left Hero  section*/}
      <div className="w-full sm:w-1/2 flex items-center justify-center sm:py-0 py-10 px-8">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>

            <p className="font-medium text-sm md:text-base uppercase">
              Premium Fashion Collection
            </p>
          </div>

          <h1 className="md:text-xl text-md mb-2 sm:py-8 py-4 xs:text-center font-semibold leading-relaxed capitalize prata-regular">
            Curated Men's & Women's Apparel | Fine Jewelry Selection (Earrings,
            Necklaces, Bracelets, Watches) Luxury Footwear | Custom Sourcing
            Available
          </h1>

          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base uppercase teal">
              shop now
            </p>

            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* right hero section  */}
      <img
        alt="hero image"
        src={assets.hero_img}
        className="w-full mx-auto sm:h-auto h-full sm:w-1/2 object-fit sm:object-fill "
      />
    </div>
  );
};

export default Hero;
