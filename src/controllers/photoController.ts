import { Request, Response } from "express";
import { getPhById, getPhFilter } from "../services/photoServices"; 

export const getPhoto = async (req: Request, res: Response)=>{
    try{
        const{ id } = req.params;
        const photo = await getPhById(Number(id));
        res.json(photo);
    } catch (error){
        res.status(500).json({error: 'error occurred'});
    }
};

export const getFilteredPh = async (req: Request, res: Response)=>{
    try{
        const filters={
            title: req.query.title as string,
            albumTitle: req.query['album.title'] as string,
            userEmail: req.query['album.usr.email'] as string,
        };

        const photos= await getPhFilter(filters);
        res.json(photos);
    }catch(error){
        res.status(500).json({error: 'error occurred'});
    }
};