import { MongoClient } from "mongodb";
import { faker } from "@faker-js/faker"
import Utils from '../src/utils'
import Config from "../src/lib/config";

const client = new MongoClient(Config.MONGO_URL);

function getData(length: number) {
	const products = [...Array(length).keys()].map(() => ({
		gtin: Utils.makeId(13),
		brandName: Utils.makeBrandName(),
		stock: Utils.makeStocks(),
		category: Utils.makeCategory(),
		color: Utils.makeColor(),
		name: Utils.makeProductName(),
		image: faker.image.urlLoremFlickr({ category: "fashion" }),
		price: faker.finance.amount({ min: 30, max: 1500 }),
		createdAt: new Date(),
		updatedAt: new Date()
	}))

	return products;
}

async function main() {
	try {
		const products = getData(500);
		await client.connect();
		const db = client.db(Config.FASHION_CLOUD_DB);
		const collection = db.collection("products");
		await collection.insertMany(products);
	}
	catch (err) {
		console.log("error ", err)
	}
}

main().then(() => {
	client.close();
	console.log("products added to DB")
})
	.catch((error) => {
			client.close();
			console.log("error", error)
			process.exit(1);
	});
