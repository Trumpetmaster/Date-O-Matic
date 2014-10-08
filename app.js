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
var quiz = model.makeQuiz(questions.values);

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
        quizCtrl.take(quiz, function (quiz) {
            createProfile(person, quiz);
        });
    });
}

function compare() {
    var points = 0;
    var quizOneQuestions = profiles[0].quiz.questions;
    var quizTwoQuestions = profiles[1].quiz.questions;
    for (var i = 0; i < quizOneQuestions.length; i++) {
        if (quizOneQuestions[i] === quizTwoQuestions[i]) {
            points++;
        }
    }
    console.log('Match rate: %d out of %d', points, quiz.questions.length);
}