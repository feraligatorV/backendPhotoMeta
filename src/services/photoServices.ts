import axios from "axios";

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

