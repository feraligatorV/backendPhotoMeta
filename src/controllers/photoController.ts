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
            title: req.query['title'] as string,
            albumTitle: req.query['album.title'] as string,
            userEmail: req.query['album.usr.email'] as string,
        };

        const limit = req.query.limit ? parseInt(req.query.limit as string) : 25;
        const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

        const photos= await getPhFilter(filters, limit, offset);
        if (photos.length === 0) {
            res.status(404).json({ message: 'No photos found' });
          } else {
                res.json(photos);
          }
    }catch(error){
        res.status(500).json({error: 'error occurred'});
    }
};