import express from "express";
import { getPhoto, getFilteredPh } from "./controllers/photoController";

const app = express();
const port = process.env.PORT || 3000;

app.get('/externalapi/photos/:id', getPhoto);
app.get('/externalapi/photos', getFilteredPh);


app.listen(port, ()=> {
    console.log(`server is running on http://localhost:${port}`);
});