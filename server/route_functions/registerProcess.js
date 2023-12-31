import {  createUser, checkUser } from "../database.js";
import bcrypt from 'bcrypt'

export default function registerProcess(req, res){
    if(req.body.username == '' || req.body.password == ''){
        res.status(400).send("Please insert a username and a password")
        return null
    }
    checkUser(req.body.username)
    .then((doesntExist) => {
        if(doesntExist) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err){
                res.send("There was a problem with handling your password")
            } else {
                const user = createUser(req.body.username, hash);
                res.send("User was created!")
                return user;
            }
        })
        } else {
            res.status(400).send("Account with that username already exists!")
            return null
        }
    }
    )
}