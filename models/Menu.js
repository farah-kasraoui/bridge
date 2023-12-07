const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
    // required: true,
  },
  imageUrl: { // Ajout d'un champ pour l'URL de l'image
    type: String,
    default: '' // Vous pouvez définir une URL par défaut si nécessaire
  }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;