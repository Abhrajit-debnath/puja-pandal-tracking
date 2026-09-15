
import type { LocationCoordinates } from "../types/pandal.types.js";
import { findPandalsNear } from "../repository/pandal.repository.js";

export const findNearbyPandals= async(coords: LocationCoordinates)=>{

    try {
        const nearbyPandals = await findPandalsNear(coords);
        return nearbyPandals;
    } catch (error) {
        throw new Error(`Error finding nearby pandals: ${error}`);
    }


}