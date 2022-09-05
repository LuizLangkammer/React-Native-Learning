
module.exports = (app) => {

    app.post('/signup', app.src.api.user.save)

    app.get('/opa', (req, res)=>{
        res.status(200).send("Opa")
    })

}