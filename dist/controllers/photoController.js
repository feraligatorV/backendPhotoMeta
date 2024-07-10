"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredPh = exports.getPhoto = void 0;
const photoServices_1 = require("../services/photoServices");
const getPhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const photo = yield (0, photoServices_1.getPhById)(Number(id));
        res.json(photo);
    }
    catch (error) {
        res.status(500).json({ error: 'error occurred' });
    }
});
exports.getPhoto = getPhoto;
const getFilteredPh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = {
            title: req.query['title'],
            albumTitle: req.query['album.title'],
            userEmail: req.query['album.usr.email'],
        };
        const limit = req.query.limit ? parseInt(req.query.limit) : 25;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const photos = yield (0, photoServices_1.getPhFilter)(filters, limit, offset);
        if (photos.length === 0) {
            res.status(404).json({ message: 'No photos found' });
        }
        else {
            res.json(photos);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'error occurred' });
    }
});
exports.getFilteredPh = getFilteredPh;
