import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { createUser, modifyUser, deleteUser, fetchUser, check } from './handlers/handleUser.js';
import { createAdvertisement, modifyAdvertisement, deleteAdvertisement } from './handlers/handleAdvertisement.js';
import { createNews, modifyNews, deleteNews } from './handlers/handleNews.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// for mongoose logs
mongoose.set('debug', true);

// .env file use
const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.PASSWORD
const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@hdcluster0.x8tr1.mongodb.net/?`

// connecting to mongoDB
try {
    mongoose.connect(URI);
    console.log("Connected to MongoDB")
}
catch (err) {
    console.log(err);
}

// END POINTS

// for handling User

app.post("/createUser", async (req, res) => {
    const { userId, name, email, photoURL, college, isAdvertiser } = req.body;
    try {
        createUser(userId, name, email, photoURL, college, isAdvertiser);
        res.status(200).json({ message: "User created Successfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create user", error: `${err}` })
    }
})

app.post("/modifyUser", async (req, res) => {
    const { userId, updates } = req.body;
    try {
        modifyUser(userId, updates)
        res.status(200).json({ message: "User updated Successfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update user", error: `${err}` })
    }
})

app.post("/deleteUser", async (req, res) => {
    const { userId } = req.body;
    try {
        deleteUser(userId)
        res.status(200).json({ message: "User deleted Successfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete user", error: `${err}` })
    }
})

app.post("/getUser", async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await fetchUser(userId);
        res.status(200).json({ user: user, message: "User fetched successfullly" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error while fetchinh user" })
    }
})

// for handling Advertisement

app.post("/createAd", async (req, res) => {
    const { ad } = req.body;
    console.log(ad)
    try {
        createAdvertisement(ad);
        res.status(200).json({ message: "Advertisement created Successfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create advertisement", error: `${err}` })
    }
})

app.post("/modifyAd", async (req, res) => {
    const { adId, updates } = req.body;
    try {
        modifyAdvertisement(adId, updates)
        res.status(200).json({ message: "Advertisement updated Successfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update advertisement", error: `${err}` })
    }
})


app.post("/deleteAd", async (req, res) => {
    const { adId } = req.body;
    try {
        deleteAdvertisement(adId)
        res.status(200).json({ message: "Advertisement deleted Successfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete advertisement", error: `${err}` })
    }
})

app.get('/checkEmail/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const user = await check(email);
        if (user) {
            res.status(200).send({ message: 'Email exists' });
        } else {
            return;
        }
    } catch (error) {
        console.error(error);
    }
});

// for handling news

app.post("/createNews", async (req, res) => {
    const { title, imgsrc, para1, para2, creator, creatorId } = req.body;
    try {
        createNews(title, imgsrc, para1, para2, creator, creatorId);
        res.status(200).json({ message: "News created Successfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create news", error: `${err}` })
    }
})

app.post("/modifyNews", async (req, res) => {
    const { newsId, updates } = req.body;
    try {
        modifyNews(newsId, updates)
        res.status(200).json({ message: "News updated Successfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update news", error: `${err}` })
    }
})


app.post("/deleteNews", async (req, res) => {
    const { newsId } = req.body;
    try {
        deleteNews(newsId)
        res.status(200).json({ message: "News deleted Successfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete news", error: `${err}` })
    }
})


// starting the server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/`);
});

