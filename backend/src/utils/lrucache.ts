import { nearbyPandalsCache } from "../config/cache.config.js";
import type { LocationCoordinates, NearbyPandal } from "../types/pandal.types.js";

export const getNearbyPandalsfromCache = (coords: LocationCoordinates) => {


    const { latitude, longitude } = coords;

    const cacheKey = `${Number(latitude).toFixed(3)},${Number(longitude).toFixed(3)}`;


    const cachedData = nearbyPandalsCache.get(cacheKey);


    if (cachedData) {
        return cachedData;
    } else {
        return null;
    }


}


export const setNearbyPandalsInCache = (coords: LocationCoordinates, data: NearbyPandal[]) => {




    const { latitude, longitude } = coords;

    const cacheKey = `${Number(latitude).toFixed(3)},${Number(longitude).toFixed(3)}`;

    nearbyPandalsCache.set(cacheKey, data);

}