const express = require("express");
const routers = express.Router();
const path = require("path");
const fs = require ("fs");
const multer = require ("multer");
const client = require("./mongodb");
const ObjectId = require("mongodb").ObjectId;


const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(null, false);
  }
  cb(null, true);
};

const upload = multer({ dest: "public", fileFilter: imageFilter });

// Routing
// Get all users
routers.get("/users", async (req, res) => {
  try {
    const db = client.db("latihan");
    const users = await db.collection("users").find().toArray();
    res.json({
      status: "success",
      message: "list users",
      data: users,
    });
  } catch (error) {
    res.json({
      status: "error",
    });
  }
});

// Get single user
routers.get("/users/:id", async (req, res) => {
  try {
    const db = client.db("latihan");
    const user = await db.collection("users").findOne({
      _id: new ObjectId(req.params.id),
    });
    res.status(200).json({
      status: "success",
      message: "single user",
      data: user,
    });
  } catch (error) {
    res.json({
      status: "error",
    });
  }
});

// insert users
routers.post("/users", async (req, res) => {
    try {
      const db = client.db("latihan");
      const user = await db.collection("users").insertOne(req.body);
      res.status(200).json({
        status: "success",
        message: "user inserted",
        data: user,
      });
    } catch (error) {
      res.json({
        status: "error",
      });
    }
  });
  // update users
  routers.put("/users/:id", async (req, res) => {
    try {
      const db = client.db("latihan");
      const user = await db
        .collection("users")
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
      res.status(200).json({
        status: "success",
        message: "user update",
        data: user,
      });
    } catch (error) {
      res.json({
        status: "error",
      });
    }
  });
  // delete users
  routers.delete("/users/:id", async (req, res) => {
    try {
      const db = client.db("latihan");
      const user = await db.collection("users").deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.status(200).json({
        status: "success",
        message: "user deleted",
        data: user,
      });
    } catch (error) {
      res.json({
        status: "error",
      });
    }
  });
  // get order user (join/aggregate)
  routers.get("/order", async (req, res) => {
    try {
      const db = client.db("latihan");
      const user = await db
        .collection("users")
        .aggregate([
          {
            $lookup: {
              from: "order",
              localField: "_id",
              foreignField: "userId",
              as: "orders",
            },
          },
        ])
        .toArray();
      res.status(200).json({
        status: "success",
        message: "list users with orders",
        data: user,
      });
    } catch (error) {
      res.json({
        status: "error",
      });
    }
  });


module.exports = routers;
