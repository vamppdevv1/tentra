const mongoose = require("mongoose");
const Campground = require("../models/campground");
const { places, descriptors } = require("./seedHelpers");
const cities = require("./cities");
mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("error, failed to connect to mongodb");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const price = Math.floor(Math.random() * 30) + 10;
    const rand1000 = Math.floor(Math.random() * 1000) + 1;
    const camp = new Campground({
      author: "69c47d277678c91c6c43d96b",
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[rand1000].longitude,
          cities[rand1000].latitude,
        ],
      },
      title: `${sample(places)} ${sample(descriptors)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, quae obcaecati mollitia soluta possimus rerum consectetur, fugiat autem nostrum corrupti, tempora consequatur magnam laborum sit dolores vel atque numquam quas!",
      price: price,
      images: [
        {
          url: "https://res.cloudinary.com/du7o3bbcv/image/upload/v1778187060/Tentra/ecm9vviqpwklk8asbm4z.jpg",
          filename: "Tentra/ecm9vviqpwklk8asbm4z",
        },
        {
          url: "https://res.cloudinary.com/du7o3bbcv/image/upload/v1778187060/Tentra/eiqdycdr6ug6rmgoxnxc.jpg",
          filename: "Tentra/eiqdycdr6ug6rmgoxnxc",
        },
        {
          url: "https://res.cloudinary.com/du7o3bbcv/image/upload/v1778187060/Tentra/ba4agvxkh7xd6zeggir0.jpg",
          filename: "Tentra/ba4agvxkh7xd6zeggir0",
        },
      ],
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
