 "use client";                                                                                                           
                                                                                                                            
    import { useUsersStore } from "@/store/useUsersStore";                                                                  
    import { useEffect, useState } from "react";                                                                            
    import { Users } from "lucide-react";                                                                                   
    import { motion } from "motion/react";                                                                                  
    import { BannerAnimator } from "@/app/animators/Banner.animator";                                                       
                                                                                                                            
    const TopFloatingUserCountBar = () => {                                                                                 
      const usersCount = useUsersStore((state) => state.usersCount);                                                        
      const [mounted, setMounted] = useState(false);                                                                        
                                                                                                                            
      useEffect(() => {                                                                                                     
        setMounted(true);                                                                                                   
      }, []);                                                                                                               
                                                                                                                            
      if (!mounted) return null;                                                                                            
                                                                                                                            
      const displayCount = usersCount > 0 ? usersCount : 1;                                                                 
                                                                                                                            
      return (                                                                                                              
        <motion.div                                                                                                         
          initial={BannerAnimator.AuraGlowPulse.initials}                                                                   
          animate={BannerAnimator.AuraGlowPulse.animate}                                                                    
          transition={BannerAnimator.AuraGlowPulse.transition}                                                              
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c0508]/85 backdrop-blur-md border border-saffron-gold shadow-lg"                                                                                                   
        >                                                                                                                   
                                                                             
          <span className="relative flex h-2.5 w-2.5">                                                                      
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>                          
          </span>                                                                                                           
                                                                                                                            
                                                                                         
          <div className="flex items-center gap-1.5 font-sans">                                                             
            <Users className="w-3.5 h-3.5 text-[#f4b244]" />                                                                
            <span className="font-bold text-[#fffbf5] tracking-tight text-xs">                                              
              {displayCount.toLocaleString()}                                                                               
            </span>                                                                                                         
            <span className="text-[11px] text-amber-200/80 font-medium">                                                    
              {displayCount === 1 ? "Parikrama Explorer" : "Devotees Live"}                                                 
            </span>                                                                                                         
          </div>
        </motion.div>
      );
    };
  
    export default TopFloatingUserCountBar;