const { authSecret } = require('../../.env');
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const Users = require('../models/Users');



module.exports = (app) => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        Users.findOne({_id: payload._id})
        .then( (user) => {
            if(user) {
                done( null, user);
            }else{
                done(null, false);
            }
        } )
        .catch( (err) => {
            done(err, false);
        })
    });

    passport.use(strategy);
    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
} 
