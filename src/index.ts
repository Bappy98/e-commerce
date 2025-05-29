import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();

app.get("/", (req:Request, res:Response) => {
    res.send("Backend is running");
})

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});