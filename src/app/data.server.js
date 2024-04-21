import express from 'express';

const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3306;

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Surendra1919@',
    database : 'mysql',
});

db.connect((err)=>{
    if(err){
        console.error('error connecting to mysql db:', err);
        return;
    }
    console.log('connected to mysql db');
});
app.get('http://localhost:8080/Getdetails',(req,res)=>{
    const page = parseInt(req.query.page)||1;
    const pageSize = parseInt(req.query.pageSize)|| 4;
    const offset = (page - 1)*pageSize;

    const query = `SELECT * FROM items LIMIT ${pageSize} OFFSET ${offset}`;

    db.query(countQuery,(err, results)=>{
        if(err){
            console.error('error excuting query:',err);
            res.status(500).json({error:'an error occured while fetching items'});
            return;
        }
        const countQuery = `SELECT COUNT(*) AS totalCount FROM items`;
        db.query(countQuery,(err, countResults)=>{
            if(err){
                console.error('error excuting count query:',err);
                res.status(500).json({error: 'an error occured while fetching the items'});
                return;
            }
            const totalCount = countResults[0].totalCount;
            const totalPages = Math.ceil(totalCount/pageSize);

            const response = {
                items:results,
                page:page,
                pageSize:pageSize,
                totalCount:totalCount,
                totalPages:totalPages,
            };
            res.json(response);
        });
    });
});
app.listen(port,()=>{
    console.log(`server is running on port ${8080}`);
})
