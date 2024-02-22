const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("mongo connection open");
  })
  .catch((err) => {
    console.log("mongo connection error");
    console.log(err);
  });

//creates a random sample from array to use for title
const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const seedsDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum odit saepe soluta quasi ad suscipit nam labore. Quod quidem dolorum, incidunt fugiat eos neque quis veritatis officiis omnis, ea voluptatum!",
      price,
    });
    await camp.save();
  }
};

seedsDB().then(() => {
  mongoose.connection.close();
});
