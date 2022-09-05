
const Users = require('../models/Users');
const bcrypt = require('bcrypt-nodejs');

module.exports = (app) => {
    const encryptPassword = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {
        console.log(req.body)
        encryptPassword(req.body.password, (hash) => {
            const {name, email} = req.body;

            Users.create({  name, email, password: hash })
                .then( (result)=>{
                    const client = {
                        name: result.name,
                        email: result.email
                    }
                    res.status(201).send(client)
                } )
                .catch( (err) => res.status(500).json(err) )
        });
    }

    return { save }
}