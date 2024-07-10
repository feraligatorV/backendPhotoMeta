import axios from "axios";
import { userInfo } from "os";
import { off } from "process";

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


export const getPhFilter = async(filters:any, limit: number = 25, offset: number = 0): Promise<Photo[]>=>{
    const responsePh = await axios.get(`${URL}/photos`);
    const ph = responsePh.data;

    const responseAlbm = await axios.get(`${URL}/albums`);
    const albums = responseAlbm.data;

    const responseUsr = await axios.get(`${URL}/users`);
    const usr = responseUsr.data;

    const combinedPh = ph.map((photo:any)=>{
        const album = albums.find((a:any) => a.id === photo.albumId);
        const user = usr.find((x:any)=> x.id === album.userId );
        return{
            ...photo,
            album: {
                ...album,
                user,
            },
        };
    });

    //filtered data
    let filteredPh = combinedPh; 
    if(filters.title){
        filteredPh = filteredPh.filter((photo: Photo) => photo.title.includes(filters.title));
    }
    if(filters.albumTitle){
        filteredPh = filteredPh.filter((photo: Photo) => photo.album.title.includes(filters.albumTitle));
    }
    if(filters.userEmail){
        filteredPh = filteredPh.filter((photo: Photo) => photo.album.user.email === filters.userEmail);
    }

    //pagination
    const paginationPhotos = [];
    for (let i = offset; i < offset + limit && i < ph.length; i++) {
        paginationPhotos.push(ph[i]);
      }

 return paginationPhotos;
}

