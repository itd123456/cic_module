const router = require("express").Router();
const sql = require("mssql");
const dbConfig = require('../conn');

router.post("/sofia",  (req, res) => {

    let {dateFrom, dateTo} = req.body;

    if(!dateFrom || !dateTo){
        res.status(403).json({msg:'Empty date from and date to'});
        
    }

     sql.connect(dbConfig, function(err){
        if(err){
            console.log("Error while connecting database :- " + err);
        }else{
            console.log("Database connected!");

            const sqlReq = new sql.Request();
            sqlReq.input('datefrom', sql.VarChar(10), dateFrom);
            sqlReq.input('dateto', sql.VarChar(10), dateTo);
            sqlReq.execute("GLOBAL_SOFIADB.dbo.CICMODULE").then(function(recordsets, returnValue, affected){
                // res.json(recordsets);
                res.json(recordsets)
            }).catch(function(err){
                res.json(err);
            })
        }
    })
})

module.exports = router