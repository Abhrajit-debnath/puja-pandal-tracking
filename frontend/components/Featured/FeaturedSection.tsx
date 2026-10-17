 import FeaturedClient from "./FeaturedClient";                                               
    import { PandalItem } from "./FeaturedCard";                                                 
    import { homeData } from "@/data/home";                                                      
    import { apiClient } from "@/app/config/apiClient/apiClient";                                
                                                                                                 
    const FeaturedSection = async () => {                                                        
      let pandals: PandalItem[] = [];                                                            
                                                                                                 
      try {                                                                                      
                                   
        const response = await apiClient.get("/pandals/top/pandals?limit=3", {            
          next: { revalidate: 3600 },                                                            
        });  
        
        
        console.log(response)
                                                                                                 
        if (response.success) {                                 
                                       
          pandals = response.data.map((item: any) => ({                                          
            id: item.id || item.topPandalId,                                                     
            name: item.name,                                                                     
            location: item.location || item.zone || "Chandannagar",                              
            visitorCount: item.liveVotes ? `${item.liveVotes} votes` : "Popular",                
            badge: item.liveCrowd && item.liveCrowd !== "UNKNOWN" ? item.liveCrowd : null,       
            badgeType: item.liveCrowd === "PACKED" ? "live" : "popular",                         
            image: item.image || item.imageUrl || "/assets/images/hero.png",                     
            href: `/pandal/${item.id}`,                                                          
          }));                                                                                   
        }   
        
        console.log(pandals)
      } catch (error) {                                                                          
        console.warn("FeaturedSection: Backend fetch failed, using fallback data.", error);      
      }                                                                                          
  

      if (pandals.length === 0) {
        pandals = homeData.featuredPandals;
      }
  
      return <FeaturedClient pandals={pandals} />;
    };
  
    export default FeaturedSection;