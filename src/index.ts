import express, { Request, Response, Application, NextFunction } from "express";
import "dotenv/config";
import router from "./router/index.js";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check route first
app.get("/", (req: Request, res: Response) => {
    res.send("Backend is running");
});

// Register main router
app.use('/', router);

// 404 Not Found
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

// Start server
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
