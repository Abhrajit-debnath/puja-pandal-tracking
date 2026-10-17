export interface ApiResponse<T>{
    success: boolean;
    message: string;
    data: T;
}


export interface TopPandalApiResponse {

    id: string;
    name: string;
    location?: string;
    zone?: string;
    image?: string;
    imageUrl?: string;
    liveCrowd?: string;
    liveVotes?: number;
    topPandalId?: string;
    [key: string]: any;
  };





