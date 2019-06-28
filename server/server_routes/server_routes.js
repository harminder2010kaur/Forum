const { Router } = require('express');
const router = Router();
const moment = require("moment");
const {User, Topic, Response} = require('../models');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const jsonSecretKey = 'secret';


const login = (req, res) => {    
    User.findOne({
        where: {
            email: req.body.email           
        }
    })
    .then(user => {
        bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (result === true) 
            {
                res.json({fname:user.fname, lname: user.lname, email: user.email, user_type: user.user_type, token: jwt.sign({ fname: user.fname , lname: user.lname, email: user.email}, jsonSecretKey)});
            } else 
            {            
                res.json(false);
            }
          });
        
    })
    .catch(error => {
        res.status(404).json({error: `Invalid User Id`});
    });
}

const getAllTopics = (req, res) => {
    Topic.findAll()
         .then(topics => {
             res.json(topics);
         }); 
}

const getResponse = (req, res) => {
    Response.findAll({
        where: {
            tid: req.params.id
        }
    })
    .then(result => {
        if(result === null)
        {
            res.json(result);
        }
        else{
            res.json(`Invalid topic`);
        }
    })
    .catch(error => {
        res.status(404).json({error: `Invalid topic`});
    });
}

const createTopic = async (req,res) => {
    const topicValues = {};    
    topicValues.topic = req.body.topic;
    topicValues.created_by = req.body.created_by;
    topicValues.createdAt = moment().subtract(4, "hours").format();    
    const newTopic = await Topic.create(topicValues);
    res.json(newTopic); 
}

const createResponse = async (req, res) => {
    const responseValue = {};
    responseValue.tid = req.params.id;
    responseValue.topic = req.body.topic;
    responseValue.response = req.body.response;
    responseValue.response_by = req.body.response_by;
    responseValue.createdAt = moment().subtract(4, "hours").format();    
    const newResponse = await Response.create(responseValue);
    res.json(newResponse);
}


const checkEmail = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,            
        }
    })
    .then(user => {
        if(user !== null)
        {
            res.json(false);
        }
        else{
            res.json(true);
        }
    })
    .catch(error => {
        res.status(404).json({error: `Invalid User Id`});
    });
}


const signUp = async (req, res) => {
    const userValue = {};

    let hash = bcrypt.hashSync(req.body.password, salt);

    userValue.fname = req.body.fname;
    userValue.lname = req.body.lname;
    userValue.email = req.body.email;    
    userValue.password = hash;  //req.body.password;
    userValue.user_type = 'u';
    userValue.createdAt = moment().subtract(4, "hours").format();
    const newUser = await User.create(userValue);
    res.json(newUser);
}

const profile = (req,res) => {
    res.json(jwt.decode(req.body.jwt));
}


const updatePassword = (req,res) => {
    let newPassword = bcrypt.hashSync(req.body.password, salt);

    User.update({ password: newPassword },
                                            {
                                            where: {
                                                  email: req.body.email
                                                }
                                            })
                                            .then(result => res.json(result))
                                            .catch( error => res.json(error));                                            
}

router.get('/email', checkEmail);
router.post('/login', login);
router.post('/profile', profile);
router.get('/topic', getAllTopics);
router.get('/response/:id', getResponse);
router.post('/topic/new', createTopic);
router.post('/response/:id/new', createResponse);
router.post('/signUp', signUp);
router.put('/update', updatePassword);

module.exports = router;
