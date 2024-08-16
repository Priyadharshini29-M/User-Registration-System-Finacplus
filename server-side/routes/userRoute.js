import express from "express";
import {create, deleteUser, getAll, getGenders, getOne, update} from "../controller/userController.js"

const genders = ['male', 'female', 'non-binary'];
const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put("/updateuser/:id", update);
route.delete("/delete/:id", deleteUser);


route.get('/genders', (req, res) => {
  res.json(genders);
})

export default route;