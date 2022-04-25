const express = require("express");
const router = express.Router();
// const users = require("./users");
const objectId = require("mongoose").Types.ObjectId;
const usermodel = require("./usermodel");

router.get("/:id", (req, res) => {
  usermodel.findById(req.params.id, (err, doc) => {
    if (err) {
      console.log("Err in get API " + err);
      // res.status(500).send({message:err})
    } else {
      res.status(200).send(doc);
    }
  });
});

//for user login
router.post("/login", (req, res) => {
  console.log('In Login Back end ');
  usermodel.findOne({ username: req.body.username }, (err, doc) => {
    if (doc) {
      
      if(req.body.password===doc.password)
      {
       
          const test = {name:doc.name,username:doc.username,mobile:doc.mobile,address:doc.address,auth:true};
          console.log('In Login Back end '+test);
        res.status(200).send(test);
      }
      else{
        res.status(401).send({message:'Invalid credentials'});
        console.log('Invalid credentials')
      }
     
    } else {
      console.log("User not  found " + err);
      res.status(401).send(err);
    }
  });
});

router.get("/", (req, res) => {
  // res.send(users);
  usermodel.find((err, doc) => {
    if (err) {
      console.log("Err in get API " + err);
      // res.status(500).send({message:err})
    } else {
      res.status(200).send(doc);
    }
  });
});

// Post API
router.post("/", (req, res) => {
  let newUser = new usermodel({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    mobile: req.body.mobile,
    address: req.body.address,
  });
  newUser.save((err, doc) => {
    if (err) {
      console.log("Err " + err);
      res.status(500).send({ message: err });
    } else {
      res.status(200).send(doc);
      console.log("User registered");
    }
  });
});
router.patch("/:id", (req, res) => {
  let updateUser = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    mobile: req.body.mobile,
    address: req.body.address,
  };

  usermodel.findByIdAndUpdate(
    req.params.id,
    { $set: updateUser },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Err " + err);
        res.status(500).send({ message: "User Not found with Id" });
      } else {
        res.status(200).send({ message: `User updated` });
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    usermodel.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!doc) {
        //   console.log("Err in get API " + err);
        res.status(400).json({ message: "User not found" });
      } else {
        res.status(200).send({ message: `User deleted successfully`, doc });
      }
    });
  } else {
    res.status(400).send({ message: `Enter Valid User ID` });
  }
});

module.exports = router;
