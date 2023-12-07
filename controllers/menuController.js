
const Menu = require('../models/Menu');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(__dirname, "../public/uploads/");
      
      cb(null, uploadPath);
     
    },
    filename: function (req, file, cb) {
      const imagePath = path.join(__dirname, '../public/uploads/', Date.now() + '-' + file.originalname);
      console.log('Chemin de l\'image uploadée :', imagePath);
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage: storage });

exports.createMenuItem = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const image = req.file.filename;
    const menuItem = new Menu({ name, price,image: image });
    const newMenuItem = await menuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    next(error);
  }
};

exports.getAllMenuItems = async (req, res, next) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json(menuItems);
  } catch (error) {
    next(error);
  }
};

exports.getMenuItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menuItem = await Menu.findById(id);
    res.status(200).json(menuItem);
  } catch (error) {
    next(error);
  }
};

exports.updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const updatedMenuItem = await Menu.findByIdAndUpdate(id, { name, price }, { new: true });
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    next(error);
  }
};

exports.deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMenuItem = await Menu.findByIdAndRemove(id);
    res.status(200).json(deletedMenuItem);
  } catch (error) {
    next(error);
  }
};

exports.uploadImage = async (req, res, next) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Erreur lors de l\'upload du fichier' });
      } else if (err) {
        return res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'upload du fichier' });
      }
      
      const { id } = req.params;
      const imageUrl = req.file.path; // Chemin de l'image uploadée
      
      const menuItem = await Menu.findByIdAndUpdate(id, { imageUrl }, { new: true });
      res.status(200).json(menuItem);
    });
  } catch (error) {
    next(error);
  }
};
