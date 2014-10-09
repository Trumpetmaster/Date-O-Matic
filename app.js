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

// Load our people data //
var people = collections
             .makeList('people.json', model.makePersonFromJSON)
             .loadSync();
             
var peopleCtrl = controller.makePeopleCtrl(people, model, prmpt);
var quizCtrl = controller.makeQuizCtrl(prmpt);

var profiles = [];

promptUser();

function createProfile(person, quiz) {
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

function compare() {
    var points = 0;
    var quizOneAnswers = profiles[0].quiz.answers;
    var quizTwoAnswers = profiles[1].quiz.answers;
    for (var i = 0; i < profiles[0].quiz.questions.length; i++) {
        var o = quizOneAnswers[i];
        var t = quizTwoAnswers[i];
        if (o === t) {
            points++;
        }
    }
    console.log('Match rate: %d out of %d', points, profiles[0].quiz.questions.length);
}