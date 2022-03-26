import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Car Mats",
    description: "featured category",
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img18/Automotive/Revamp/Car_Revamp/Revised/Car_Mats._CB1198675309_.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Car Tyres",
    description: "featured category",
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img18/Automotive/Revamp/Car_Revamp/Car_Tyres._CB453410835_.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Vehicle Cleaners",
    description: "",
  },
  {
    _id: uuid(),
    categoryName: "Car Lighting",
    description: "featured category",
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img18/Automotive/Revamp/Car_Revamp/Car_Lighting._CB453410832_.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Car Covers",
    description: "featured category",
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img18/Automotive/Revamp/Car_Revamp/Car_Cover._CB453410833_.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Glass Cleaner",
    description: "car cleaning equipment",
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img18/Automotive/Revamp/Car_Revamp/Glass_Cleaner._CB453410835_.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Pressure Washer",
    description: "car cleaning equipment",
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img18/Automotive/Revamp/Car_Revamp/pressure_Washer._CB453410835_.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Air Purifiers",
    description: "car cleaning equipment",
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img18/Automotive/Revamp/Car_Revamp/Air_Purifiers._CB453410833_.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Vacuum Cleaner",
    description: "car cleaning equipment",
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img18/Automotive/Revamp/Car_Revamp/Vacuum_Cleaner._CB453410834_.jpg",
  },
];
