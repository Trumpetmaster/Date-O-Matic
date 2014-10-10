'use-strict';

// TODO 1 : create the makePerson factory //
function makePerson(firstName, lastName, email, telephone, gender, birthDate, birthPlace) {
    var _person = {
        firstName:  firstName,
        lastName:   lastName,
        email:      email,
        telephone:  telephone,
        gender:     gender,
        birthDate:  birthDate,
        birthPlace: birthPlace,
        
        name:       function() { return _person.firstName + ' ' + _person.lastName; }
    };
    return _person;
}
module.exports.makePerson = makePerson;

module.exports.makePersonFromJSON = function (data) {
    return makePerson(data.firstName, data.lastName, data.email, data.telephone, data.gender, data.birthDate, data.birthPlace);
};

function makeProfile(person, quiz) {
    var _profile = {
        person: person,
        quiz: quiz
    };
    return _profile;
}
module.exports.makeProfile = makeProfile;

function makeQuiz(questions) {
    var _quiz = {
        answers: {},
        questions: questions,
    };
    return _quiz;
}
module.exports.makeQuiz = makeQuiz;

function makeQuestion(question) {
    var _question = {
        question:   question,
    };
    return _question;
}
module.exports.makeQuestion = makeQuestion;

module.exports.makeQuestionFromJSON = function (data) {
    return makeQuestion(data);
};

function makeResponse(response) {
    var _response = {
        response:   response,
    };
    return _response;
}
module.exports.makeResponse = makeResponse;

module.exports.makeResponseFromJSON = function (data) {
    return makeResponse(data);
};
