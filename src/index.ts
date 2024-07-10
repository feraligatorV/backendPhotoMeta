import express from "express";
import cors from "cors";
import { getPhoto, getFilteredPh } from "./controllers/photoController";


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.get('/externalapi/photos/:id', getPhoto);
app.get('/externalapi/photos', getFilteredPh);


app.listen(port, ()=> {
    console.log(`server is running on http://localhost:${port}`);
});