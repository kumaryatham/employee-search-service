const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'employeedb'
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log('DB connection started');
    }else{
        console.log('DB connection failed \n erro :'+ JSON.stringify(err,undefined,2));
    }
});
const PORT = 8089;

const app = express();

app.use(bodyParser.json())

app.use(cors())

app.listen(PORT,function(){
    console.log("server runnig on host :"+PORT);
})
app.get('/', function(reg, res){
    res.send('Hello from server');
})

//get employee list
app.get('/employees', (req, res)=>{
    mysqlConnection.query('select * from employee',(err, rows,fields)=>{
        if(!err){
            console.log(rows);
            res.send(rows);
        }else{
            console.log(err)
        }
    })
});

//get employee information
app.get('/employees/:id', (req, res)=>{
    mysqlConnection.query('select * from employee where id=?',[req.params.id],(err, rows,fields)=>{
        if(!err){
            console.log(rows);
            res.send(rows);
        }else{
            console.log(err)
        }
    })
});

//delete employee information
app.delete('/employees/:id', (req, res)=>{
    
    mysqlConnection.query('delete from employee where id=?',[req.params.id],(err, rows,fields)=>{
        if(!err){
            console.log(rows);
            res.send('Deleted successfully');
        }else{
            console.log(err)
        }
    })
});


//add employee information
app.post('/employees', (req, res)=>{
    let emp = req.body

   //  if(!err && rows.length > 0){

    mysqlConnection.query('insert into employee(name,username,email) values (?,?,?)',[emp.name, emp.username,emp.email],(err, rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err)
            res.status(500)
            res.send('Error while storing data')
        }
    })

});

app.put('/employees', (req, res)=>{
    let emp = req.body

   //  if(!err && rows.length > 0){

    mysqlConnection.query('update employee set name=?, username=?, email=? where id=? ',[emp.name, emp.username,emp.email,emp.id],(err, rows,fields)=>{
        if(!err){
            res.send('Updated successfully');
        }else{
            console.log(err)
        }
    })

});



