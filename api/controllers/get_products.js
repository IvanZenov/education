'use strict';

var util = require('util');
var dummyjson = require('dummy-json')
var jstoxml = require('jstoxml')
var o2x = require('object-to-xml')



var userSchema = '{\
  "name" : "{{firstName}}",\
  "surname" : "{{lastName}}",\
  "nickname" : "{{nickname}}",\
  "country" : "{{country}}",\
  "email" : "{{email}}",\
  "contact" : "{{phone "+64 (x) xxx xxxx"}}"\
}';

module.exports.getUserByName = function getUser(req, res, next) {
  var nickname = req.query.nickname || 'Alex';
  var product = req.param("userId");

  var user = {};
  user['application/json'] =
  JSON.parse(dummyjson.parse(userSchema, {mockdata: {"nickname": nickname}}));

  if(Object.keys(user).length > 0){

      res.setHeader('Content-Type', 'application/json');
      res.json(user[Object.keys(user)[0]]);
  } else {
    res.end();
  }
}

var recommendedCourseSchema = '{\
  "course name" : "{{lorem 1}}",\
  "the creator of the course" : "{{lorem 4}}",\
  "rating" : "{{rating}}"\
}';

var RecommendedCoursesSchema = '[\
  {{#repeat 10}} \
  '+ recommendedCourseSchema + '\
  {{/repeat}}\
]';

module.exports.recommendedCourses = function getreccourse(req, res, next) {
  var rating = req.query.rating || '3.00';
  var product = req.param("corseId");

  var courses = {};
  courses['application/json'] =
  JSON.parse(dummyjson.parse( RecommendedCoursesSchema, {mockdata: {"rating": rating}}));

  if(Object.keys(courses).length > 0){

      res.setHeader('Content-Type', 'application/json');
      res.json(courses[Object.keys(courses)[0]]);
  } else {
    res.end();
  }
}

var PassedCourseSchema = '{\
  "course name" : "{{lorem 1}}",\
  "the creator of the course" : "{{lorem 4}}",\
  "completion date" : "{{date "2015-06-01" "2015-06-30"}}",\
  "rating" : "{{rating}}"\
}';

var PassedCoursesSchema = '[\
  {{#repeat 10}} \
  '+ PassedCourseSchema + '\
  {{/repeat}}\
]';

module.exports.GetPassedCourses = function getpascourse(req, res, next) {
  var rating = req.query.rating || "3.58";
  var product = req.param("corseId");

  var pascourses = {};
  pascourses['application/json'] =
  JSON.parse(dummyjson.parse(PassedCoursesSchema, {mockdata: {"rating": rating}}));

  if(Object.keys(pascourses).length > 0){

      res.setHeader('Content-Type', 'application/json');
      res.json(pascourses[Object.keys(pascourses)[0]]);
  } else {
    res.end();
  }
}

var mentorSchema = '{\
  "name" : "{{firstName}}",\
  "surname" : "{{lastName}}",\
  "nickname" : "{{lorem 1}}",\
  "lineofbusiness" : "{{lineofbusiness}}",\
  "rating" : "{{float 0 5 round=0.1}}"\
}';

var mentorsSchema = '[\
  {{#repeat 10}} \
  '+ mentorSchema + '\
  {{/repeat}}\
]';

module.exports.getMentors = function getMentors(req, res, next) {
  var lineofbusiness = req.query.lineofbusiness || "Game Theoty";
  var product = req.param("corseId");

  var mentors = {};
  mentors['application/json'] =
  JSON.parse(dummyjson.parse(mentorsSchema, {mockdata: {"lineofbusiness": lineofbusiness}}));

  if(Object.keys(mentors).length > 0){

      res.setHeader('Content-Type', 'application/json');
      res.json(mentors[Object.keys(mentors)[0]]);
  } else {
    res.end();
  }
}

var mentor_1_Schema = '{\
  "name" : "{{firstName}}",\
  "surname" : "{{lastName}}",\
  "nickname" : "{{lorem 1}}",\
  "country" : "{{country}}",\
  "line of busibess" : "{{lorem 1}}",\
  "contact" : "{{domain}}",\
  "chat link" : "{{domain}}",\
  "rating" : "{{float 0 5 round=0.1}}"\
}';

module.exports.getMentor = function getmentors(req, res, next) {
  var product = req.param("corseId");

  var mentors = {};
  mentors['application/json'] =
  JSON.parse(dummyjson.parse(mentor_1_Schema));

  if(Object.keys(mentors).length > 0){

      res.setHeader('Content-Type', 'application/json');
      res.json(mentors[Object.keys(mentors)[0]]);
  } else {
    res.end();
  }
}

var balanceSchema = '{\
  "current balance" : "{{int 0 1000}}",\
  "last costs" : "{{int 10 250}}"\
}';

module.exports.getcash = function getcsh(req, res, next) {
  var product = req.param("corseId");

  var balance = {};
  balance['application/json'] =
  JSON.parse(dummyjson.parse(balanceSchema));

  if(Object.keys(balance).length > 0){

      res.setHeader('Content-Type', 'application/json');
      res.json(balance[Object.keys(balance)[0]]);
  } else {
    res.end();
  }
}
