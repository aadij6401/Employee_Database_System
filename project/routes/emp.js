var express = require('express');
var router = express.Router();

var Employee = require('../models/employee');


router.get('/', (req, res) => {
    Employee.find({})
        .then(emp => {
            res.render('index', {
                emp: emp
            });
        })
        .catch(err => {
            req.flash('error_msg', 'Error: ' + err);
            console.log(err);
        })
});

router.get('/employee/new', (req, res) => {
    res.render('new');
});

router.post('/employee/new', (req, res) => {
    var newEmployee = {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    };

    Employee.create(newEmployee)
        .then(employee => {
             req.flash('success_msg', 'Employee data added successfully.');
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'Error: ' + err);
            console.log(err);
        })
});


router.get('/employee/search', (req, res) => {
    res.render('search', {
        emp: ""
    });
});


router.get('/employee', (req, res) => {
    var searchQuery = {
        name: req.query.name
    };
    Employee.findOne(searchQuery)
        .then(emp => {
            res.render('search', {
                emp: emp
            });
        })
        .catch(err => {
            req.flash('error_msg', 'Error: ' + err);
            console.log(err);
        })

});

router.get('/edit/:id',(req,res)=>{
    var searchQuery={ _id:req.params.id };
    Employee.findOne(searchQuery)
       .then(emp=>{
           res.render('edit',{emp:emp});
       })
       .catch(err=>{
           req.flash('error_msg', 'Error: ' + err);
           console.log(err);
       })
});

router.put('/edit/:id',(req,res)=>{
    var searchQuery={_id:req.params.id};
    Employee.updateOne(searchQuery,{ $set: {
        name:req.body.name,
        designation:req.body.designation,
        salary:req.body.salary
    }})
     .then(emp=>{
         req.flash('success_msg', 'Employee data updated successfully.');
         res.redirect('/');
     })
     .catch(err=>{
         req.flash('error_msg', 'Error: ' + err);
        console.log(err);
     })
});


router.delete('/delete/:id',(req,res)=>{
    var searchQuery = {_id : req.params.id};
    Employee.deleteOne(searchQuery)
      .then(emp=>{
        req.flash('success_msg','Employee data deleted successfully.');
        res.redirect('/');
      })
      .catch(err=>{
          req.flash('error_msg', 'Error: '+err);
          console.log(err);
      })
});



module.exports = router;