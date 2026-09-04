import shirtImage from "../assets/img/Shirt.png";
import textbookImage from "../assets/img/Textbook.png";
import calculatorImage from "../assets/img/Calculator.png";
import hoodieImage from "../assets/img/Hoodie.png";
import labGownImage from "../assets/img/LabGown.png";

const getProductImage = (productName) => {
  const images = {
    "National University T-Shirt": shirtImage,
    "Introduction to Java Programming": textbookImage,
    "Scientific Calculator fx-991EX": calculatorImage,
    "NU Hoodie": hoodieImage,
    "Medical Lab Gown (Medium)": labGownImage,
  };

  return images[productName] || null;
};

export default getProductImage;