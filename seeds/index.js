const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp";
// process.env.DB_URL || "mongodb://localhost:27017/yelp-camp";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "601027d1d6a8957548613ba3",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed dolore beatae est natus dolores quibusdam! Error quae distinctio, ab explicabo ad, quam velit consequatur nisi alias provident, minima aut nemo.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url:
            "https://res.cloudinary.com/dhiuj6txw/image/upload/v1611748464/YelpCamp/dpyapb3cdpgzjbxvoiqj.jpg",
          filename: "YelpCamp/dpyapb3cdpgzjbxvoiqj",
        },
        {
          url:
            "https://res.cloudinary.com/dhiuj6txw/image/upload/v1611748403/YelpCamp/zb9y5zgz9wi3pvowmjmt.jpg",
          filename: "YelpCamp/zb9y5zgz9wi3pvowmjmt",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
