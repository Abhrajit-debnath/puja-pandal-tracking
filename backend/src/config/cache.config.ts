import { LRUCache } from 'lru-cache';

const nearbyPandalsCache = new LRUCache<string, any>({ max: 500
    ,
    ttl: 5 * 60 * 1000 
 });


export { nearbyPandalsCache };