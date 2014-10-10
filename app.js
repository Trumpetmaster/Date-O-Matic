#!/usr/bin/env node

"use-strict";

const 
    model = require("./model"),
    controller = require("./controller"),
    collections = require("./util/collections"),
    prmpt = require("prompt");

// Load our question data //
var questions = collections
                    .makeList('questions.json', model.makeQuestionFromJSON)
                    .loadSync();

// Load our reponses data //
var responses = collections
                    .makeList("responses.json", model.makeResponseFromJSON)
                    .loadSync();
                    
// Load our people data (we could be saving profiles - for now, w're not) //
var people = collections
             .makeList('people.json', model.makePersonFromJSON)
             .loadSync();
             
var peopleCtrl = controller.makePeopleCtrl(people, model, prmpt);
var quizCtrl = controller.makeQuizCtrl(prmpt);

var profiles = [];

promptUser();

function createProfile(person, quiz) {
    var lines = process.stdout.getWindowSize()[1];
    for(var i = 0; i < lines; i++) {
        console.log('\r\n');
    }
    profiles.push(model.makeProfile(person, quiz));
    if (profiles.length === 2) {
        compare();
        return;
    }
    promptUser();
}

function promptUser() {
    peopleCtrl.add(function(person) {
        quizCtrl.take(model.makeQuiz(questions.values.concat()), function (quiz) {
            createProfile(person, quiz);
        });
    });
}

// TODO : Create our comparison function //
function compare() {
    var points = 0;
    var answersOne = profiles[0].quiz.answers;
    var answersTwo = profiles[1].quiz.answers;
    
    var length = questions.values.length;
    for (var i = 0; i < length; i++) {
        var o = answersOne[i];
        var t = answersTwo[i];
        if (o === t) {
            points++;
        }
    }
    console.log("Here is our evaluation: %s", responses.values[points-1].response);
}