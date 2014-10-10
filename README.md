Date-O-Matic
=============

This app will determine the compatibility levels of two people.

The app separates concerns by storing our data outside of the app in json files, technically meaning we could change that data without changing any code, or even change the data while the app is running.

Our app quizes two people by asking them each a number of questions, then compares their results. 

We load our questions and responses, we prompt each user for their names, then quiz them. 

Our app's logic resides in our controller module. Our players are mananged by the people controller, and our quizzes are managed by their own controller. Controllers are specialized objects designed to oversee the behavior of the objects they manange. One powerful feature of this design pattern is that we can change the behavior of objects by swapping controllers, instead of changing the objects themselves. 

**TODO**

The only thing missing is to see if our possible lovebirds are indeed a match. We need to finish our app by writing a comparison function that will evaluate the compatibility of our two players:


```javascript
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
```
