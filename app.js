#!/usr/bin/env node

"use-strict";

const 
    util = require("util"),
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

promptUser(profiles.length+1);

function createProfile(person, quiz) {
    console.log('------------------------------------------------');
    process.stdout.write('\033c');
    profiles.push(model.makeProfile(person, quiz));
    if (profiles.length === 2) {
        console.log('------------------------------------------------');
        compare();
        return;
    }
    promptUser(profiles.length+1);
}

function promptUser(index) {
    peopleCtrl.add(util.format("Candidate %d, enter your deets:", index), function(person) {
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
    console.log("Here is our evaluation: %s", responses.values[points].response);
}