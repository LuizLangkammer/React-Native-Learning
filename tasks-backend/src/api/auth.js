const { authSecret } = require('../../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

const Users = require('../models/Users');


module.exports = (app) => {
    const signin = async (req,res) => {
        if(!req.body.email || !req.body.password){
            return res.status(400).send('Dados Incompletos');
        }

        const user = await Users.findOne({email: req.body.email})
            .then((result) => {
                return result
            })
            .catch((err) => {
                res.status(404).send('Usuário ou senha inválidos');
                return;
            });
        
        if(!user) return;
       
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if(err || !isMatch){
                return res.status(404).send('Usuário ou senha inválidos');
            }

            const payload = {
                _id: user._id,
                email: user.email
            }

            res.status(200).send({
                name: user.name,
                email: user.email,
                token: jwt.encode(payload, authSecret)
            })

        })
    }

    return { signin }
}