import NextImage from "next/image";
import { homeData } from "@/data/home";
import { Search, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 w-full px-4 py-4 z-50">
      <div className="max-w-(--container-max-width) mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5">
          <div className="shrink-0 w-8 h-8 flex items-center justify-center">
            <NextImage 
              src={homeData.hero.logo} 
              alt="Jagadhatri Logo" 
              width={32} 
              height={32} 
              priority 
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-sans text-lg font-bold text-alpona-ivory-luminous tracking-tight">
                Jagadhatri
              </span>
            </div>
            <span className="font-sans text-[11px] font-medium text-amber-200/90 tracking-wide mt-0.5">
              • Parikrama
            </span>
          </div>
        </div>

        {/* Action Buttons: Search & Menu */}
        <div className="flex items-center gap-2">
          <button 
            type="button"
            aria-label="Search"
            className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
          
          <button 
            type="button"
            aria-label="Menu"
            className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition cursor-pointer"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;