import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: [
        'http://127.0.0.1:5500',
        'https://newisdomcenter.vercel.app'
    ]
}));

const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
if (!serviceAccountPath) throw new Error('FIREBASE_SERVICE_ACCOUNT_PATH is not set');

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();



// CV Submission
app.post('/submit-cv', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        const { fullName, email, phone } = req.body;

        const stream = cloudinary.uploader.upload_stream(
            { folder: 'cvs' },
            async (error, result) => {
                if (error) return res.status(500).json({ error: error.message });

                await db.collection('submissions').add({
                    fullName,
                    email,
                    phone,
                    cvURL: result.secure_url,
                    timestamp: new Date(),
                });

                res.json({ url: result.secure_url, message: "CV submitted successfully" });
            }
        );

        stream.end(req.file.buffer);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Contact Form Submission
app.post('/submit-contact', async (req, res) => {
    try {
        const { fullName, phone, message } = req.body;

        if (!fullName || !phone || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        await db.collection('contacts').add({
            fullName,
            phone,
            message,
            timestamp: new Date()
        });

        res.json({ message: "Contact form submitted successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
