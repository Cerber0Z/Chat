const router = require("express").Router();

router.get("/",(req, res)=>{
    res.send("Estas utlizando la ruta de user")
})

module.exports = router