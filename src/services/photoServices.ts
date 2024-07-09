import axios from "axios";
import { userInfo } from "os";

const URL = 'https://jsonplaceholder.typicode.com';

export interface Photo{
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    album: Album;
}

export interface Album{
    id: number;
    title: string;
    user: User;
}

export interface User{
    id: string;
    name:string;
    username: string;
    email: string;
    adress: Address;
    phone: string;
    website: string
    company: Company;
}

export interface Address{
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export interface Geo{
    lat:string;
    lng: string;
}

export interface Company{
    name:string;
    catchPhrase:string;
    bs: string;
}

export const getPhById = async(id: number): Promise<Photo>=>{
    const responsePh = await axios.get(`${URL}/photos/${id}`);
    const ph = responsePh.data;

    const responseAlbm = await axios.get(`${URL}/albums/${ph.albumId}`);
    const album = responseAlbm.data;

    const responseUsr = await axios.get(`${URL}/users/${album.userId}`);
    const usr = responseUsr.data;

    return{
        ...ph,
        album: {
            ...album,
            usr,
        },
    };
}

