
import type { CrowdLevelEnum, LocationCoordinates } from "../types/pandal.types.js";
import { createCheckin, findPandalsNear } from "../repository/pandal.repository.js";
import { findPandalById } from "../repository/pandal.repository.js";
import id from "zod/v4/locales/id.js";




export const findNearbyPandals= async(coords: LocationCoordinates)=>{

    try {
        const nearbyPandals = await findPandalsNear(coords);
        return nearbyPandals;
    } catch (error) {
        throw new Error(`Error finding nearby pandals: ${error}`);
    }


}




export const getPandalById = async (id: string) => {
    try {
        const pandal = await findPandalById(id);
        return pandal;
    } catch (error) {
        throw new Error(`Error finding pandal by id: ${error}`);
    }
};





export const createCheckinService = async (pandalId:string,crowdLevel: CrowdLevelEnum) => {
    try {
        const checkIn = await createCheckin(pandalId,crowdLevel);
        return checkIn;
    } catch (error) {
        throw new Error(`Error creating checkin: ${error}`);
    }
};