import { homeData } from "@/data/home";
import HeroFeatureCard from "./HeroFeatureCard";

const HeroFeatureBox = () => {
  return (
    <div className="relative z-30 max-w-(--container-max-width) mx-auto px-4 sm:px-6">

      {/* Lotus Emblem Badge on Top Border */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-40 bg-[#faf4ec] border border-[#f0e5d3] px-3.5 py-1 rounded-full shadow-xs flex items-center justify-center">
        <span className="text-base select-none">🪷</span>
      </div>

      {/* Main Feature Container */}
      <div className="w-full bg-[#faf4ec] border border-[#f0e5d3] shadow-lg rounded-2xl sm:rounded-3xl py-3 sm:py-6 px-2">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {homeData.quickActions.map((card, index) => {

            const isLeftColumnMobile = index % 2 === 0;
            const isBottomRowMobile = index >= 2;
            const isNotFirstDesktop = index > 0;

            const borderClasses = `
              ${isLeftColumnMobile ? "border-r border- border-[#f0e5d3]" : "border-r-0"}
              ${isBottomRowMobile ? "border-t border-[#f0e5d3]" : "border-t-0"}
              ${isNotFirstDesktop ? "md:border-l md:border-[#f0e5d3] md:border-t-0" : "md:border-l-0 md:border-t-0"}
            `;

            return (
              <div
                key={card.id}
                className={`py-3 md:py-0 px-1 sm:px-2 ${borderClasses}`}
              >
                <HeroFeatureCard card={card} />
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default HeroFeatureBox;