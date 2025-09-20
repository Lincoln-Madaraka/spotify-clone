import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config();

const songs = [
	{
    title: "BBB",
    artist: "Carmen DeLeon",
    imageUrl: "/cover-images/1.jpg", // pick any cover image you want
    audioUrl: "/songs/Carmen DeLeon - BBB .mp3",
    duration: 0, // update later with real duration if needed
  },
  {
    title: "Mala memoria",
    artist: "Carmen DeLeon",
    imageUrl: "/cover-images/2.jpg",
    audioUrl: "/songs/Carmen DeLeon - Mala memoria .mp3",
    duration: 0,
  },
  {
    title: "On Yah",
    artist: "Nikita Kering",
    imageUrl: "/cover-images/3.jpg",
    audioUrl: "/songs/Nikita Kering - On Yah .mp3",
    duration: 0,
  },
  {
    title: "Vamp",
    artist: "Travis Scott & Playboi Carti",
    imageUrl: "/cover-images/4.jpg",
    audioUrl: "/songs/Travis Scott _ Playboi Carti - Vamp.mp3",
    duration: 0,
  },
  {
    title: "Shu-Peru",
    artist: "Kizz Daniel",
    imageUrl: "/cover-images/5.jpg",
    audioUrl: "/songs/Kizz Daniel - Shu-Peru .mp3",
    duration: 0,
  },
];

const seedSongs = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing songs
		await Song.deleteMany({});

		// Insert new songs
		await Song.insertMany(songs);

		console.log("Songs seeded successfully!");
	} catch (error) {
		console.error("Error seeding songs:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedSongs();
