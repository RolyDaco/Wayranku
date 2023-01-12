const express = require('express');
const { Router } = require('express');
const { lugar, climas } = require('../controllers/lugar');


const router = Router();
     // this.app.use( this.paths.auth, require('../routes/auth'));
    router.post("/", express.json(), lugar );
    router.get("/", express.json(), climas );
    

    router.get('*', (req, res) => {
        res.status(404).render("404", {
            titulo: "404",
            descripción: "Page not Found"
        })
    });


module.exports = router;
