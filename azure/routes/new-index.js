require('dotenv').config(); // Charge les variables d'environnement

let express = require('express');
let router = express.Router();
let MongoClient = require('mongodb').MongoClient;

let url = process.env.MONGO_URI; // Correct pour récupérer MONGO_URI

router.get('/', async (req, res, next) => {
	try {
		let client = await MongoClient.connect(url);
		let dbo = client.db("azure-mern-boilerplate-db");

		let result = await dbo.collection("collection1").find({}).toArray();
		
		console.log('Mongo data coming in hot');
		console.log(result);
		
		res.json(result);
		client.close();
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Erreur lors de la connexion à MongoDB" });
	}
});

module.exports = router;