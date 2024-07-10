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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhFilter = exports.getPhById = void 0;
const axios_1 = __importDefault(require("axios"));
const URL = 'https://jsonplaceholder.typicode.com';
const getPhById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responsePh = yield axios_1.default.get(`${URL}/photos/${id}`);
    const ph = responsePh.data;
    const responseAlbm = yield axios_1.default.get(`${URL}/albums/${ph.albumId}`);
    const album = responseAlbm.data;
    const responseUsr = yield axios_1.default.get(`${URL}/users/${album.userId}`);
    const usr = responseUsr.data;
    return Object.assign(Object.assign({}, ph), { album: Object.assign(Object.assign({}, album), { usr }) });
});
exports.getPhById = getPhById;
const getPhFilter = (filters_1, ...args_1) => __awaiter(void 0, [filters_1, ...args_1], void 0, function* (filters, limit = 25, offset = 0) {
    const responsePh = yield axios_1.default.get(`${URL}/photos`);
    const ph = responsePh.data;
    const responseAlbm = yield axios_1.default.get(`${URL}/albums`);
    const albums = responseAlbm.data;
    const responseUsr = yield axios_1.default.get(`${URL}/users`);
    const usr = responseUsr.data;
    const combinedPh = ph.map((photo) => {
        const album = albums.find((a) => a.id === photo.albumId);
        const user = usr.find((x) => x.id === album.userId);
        return Object.assign(Object.assign({}, photo), { album: Object.assign(Object.assign({}, album), { user }) });
    });
    //filtered data
    let filteredPh = combinedPh;
    if (filters.title) {
        filteredPh = filteredPh.filter((photo) => photo.title.includes(filters.title));
    }
    if (filters.albumTitle) {
        filteredPh = filteredPh.filter((photo) => photo.album.title.includes(filters.albumTitle));
    }
    if (filters.userEmail) {
        filteredPh = filteredPh.filter((photo) => photo.album.user.email === filters.userEmail);
    }
    //pagination
    const paginationPhotos = [];
    for (let i = offset; i < offset + limit && i < filteredPh.length; i++) {
        paginationPhotos.push(ph[i]);
    }
    return paginationPhotos;
});
exports.getPhFilter = getPhFilter;
