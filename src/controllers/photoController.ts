import { Request, Response } from "express";
import { getPhById } from "../services/photoServices"; 

export const getPhoto = async (req: Request, res: Response)=>{
    try{
        const{ id } = req.params;
        const photo = await getPhById(Number(id));
        res.json(photo);
    } catch (error){
        res.status(500).json({error: 'error occurred'});
    }
};