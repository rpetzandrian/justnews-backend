const multer = require("multer");
const path = require("path")

const storageCover = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/cover");
  },
  filename: function (req, file, cb) {
    // let datetimestamp = Date.now();
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
  }
});

const storagePhoto = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/photo");
  },
  filename: function (req, file, cb) {
    // let datetimestamp = Date.now();
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
  }
});

const storageImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/images");
  },
  filename: function (req, file, cb) {
    // let datetimestamp = Date.now();
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
  }
});

const fileFilter = (req, file, cb) => {
  let ext = path.extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    return cb(new Error('Only images are allowed'))
  }
  cb(null, true)
};

const limitCover = {
  fileSize: 10000000
};

const limitPhoto = {
  fileSize: 5000000
}

const cover = multer({
  storage: storageCover,
  fileFilter: fileFilter,
  limits: limitCover
});

const photo = multer({
  storage: storagePhoto,
  fileFilter: fileFilter,
  limits: limitPhoto
})

const imageCategory = multer({
  storage: storageImages,
  fileFilter: fileFilter,
  limits: limitPhoto
})

const Upload = {
  uploadCover: (req, res, next) => {
    const uploadCover = cover.single('cover');
    uploadCover(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (err) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (req.file === undefined) {
        next();
      } else {
        next();
      }
    })
  },

  uploadPhoto: (req, res, next) => {
    const uploadPhoto = photo.single('photo');
    uploadPhoto(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (err) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (req.file === undefined) {
        next();
      } else {
        next();
      }
    })
  },

  uploadImageCategory: (req, res, next) => {
    const uploadImageCategory = imageCategory.single('image');
    uploadImageCategory(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (err) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (req.file === undefined) {
        next();
      } else {
        next();
      }
    })
  }
};

module.exports = Upload;