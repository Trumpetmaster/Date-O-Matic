"use-strict";

const
    deepExtend = require('deep-extend'),
    EventEmitter = require('events').EventEmitter;

function makeAppCtrl(peopleCtrl, quizCtrl) {
    var _appCtrl = {
        
    }
    return _appCtrl
}

function makePeopleCtrl(people, model, prompt) {
    var _peopleCtrl = {
        people: people,
        add: function (callback) {
            console.log('Enter your deets:');
            prompt.get(['firstname', 
                        'lastname'], 
                        function (err, input) {
                            var person = model.makePerson(input.firstname, 
                                                          input.lastname);
                            people.add(person);
                            callback(person);
                        });
        }
    };
    deepExtend(_peopleCtrl, new EventEmitter());
    return _peopleCtrl;
}
module.exports.makePeopleCtrl = makePeopleCtrl;


function makeQuizCtrl(prompt) {
    var _quizController = {
        take: function (quiz, callback) {
            var properties = [];
            
            // set up the prompt properties with our questions //
            var questions = quiz.questions;
            for (var i = 0; i < questions.length; i++) {
                properties.push({
                    name: i.toString(), 
                    validator: /^[yn]{1}$/,
                    message: questions[i].question + ': (y/n)',
                    required: true});
            }
            prompt.start();
            prompt.get(properties, function (err, result) {
                    if (err) return onErr(err);
                    for (var key in result) {
                        quiz.answers[key] = (result[key] === "y") ? true : false;
                        //quiz.questions[key].setAnswer((result[key] === "y") ? true : false);
                    }
                    callback(quiz);
            });
        }
    };
    return _quizController;
}
module.exports.makeQuizCtrl = makeQuizCtrl;

function onErr(err) {
    console.log(err);
    return 1;
}