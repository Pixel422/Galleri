const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const { resourceLimits } = require("worker_threads");
const unlinkFile = util.promisify(fs.unlink);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).any();

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  let images = [];
  fs.readdir("./public/uploads", (err, files) => {
    if (!err) {
      files.forEach((file) => {
        images.push(file);
      });
      res.render("index", { images: images });
    } else {
      console.log(err);
    }
  });
});

app.get("/", (req, res) => {
  let images = [];
  fs.readdir("./public/uploads", (err, files) => {
    if (!err) {
      files.forEach((file) => {
        images.push(file);
      });
      res.render("index", { images: images });
    } else {
      console.log(err);
    }
  });
});

app.get("/gallery", (req, res) => {
  let images = [];
  fs.readdir("./public/uploads", (err, files) => {
    if (!err) {
      files.forEach((file) => {
        images.push(file);
      });
      res.render("gallery", { images: images });
    } else {
      console.log(err);
    }
  });
});

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (!err && req.files != "") {
      res.status(200).send();
    } else if (!err && req.files == "") {
      res.statusMessage = "No file selected";
      res.status(400).end();
    } else {
      res.statusMessage =
        err === "Error: Images Only!" ? err : "File is not an image";
      res.status(400).end();
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
