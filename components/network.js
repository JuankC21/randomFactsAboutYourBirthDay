const dependencies = require('../dependencies')
const express = dependencies.express
const response = require('../network/response')
const router = express.Router()
const controller = require('./controller')

router.get('/birthDayinfo', (req, res)=>{
    controller.getBirthdayInfo(req.query.month.toString(), req.query.day.toString(), req.query.year.toString())
    .then((obj) => {
        response.success(req, res, "OK", obj);
    })
    .catch((err) => {
        response.error(req, res, err, "error", 500);
    });
})

module.exports = router