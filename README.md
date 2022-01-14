# HTML / CSS / JS Project <-> Fetch request to an API for the creation of a Quiz about videogames.

_Practice developed for the presentation of a project at ![image](https://user-images.githubusercontent.com/93273286/149514438-1a016288-abba-4c23-b3ec-7ad73581393d.png)_

## About the project 📖

The project consists of a quiz based on video games. It consists of 10 questions, which we extract from an API (https://opentdb.com/). This quiz consists of 10 questions about video games. The correct questions will be highlighted in green. Otherwise, they will be highlighted in red. The second you choose an answer, you will move on to the next question. Once the quiz is finished, you will be taken to the end.html page, where you can register your score in the leaderboard, and/or replay another quiz.

Using the fetch(9 method i extract everything i need for the project:

```
fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple')
    .then((res) => {
        return res.json();
    }).then(){
    return formattedQuestions;
 }
```

![image](https://user-images.githubusercontent.com/93273286/149513444-80564810-2123-450b-8c35-8493bf52cf55.png)


## Project components 🏠

  HTML 🔩
->  Index.html
->  end.html
->  highscore.html
 
  CSS 🎨
->  app.css
->  game.css
->  highscores.css

  JS  🔧
->  end.js
->  game.js
->  highscores.js

## Author ✒️

* **Miguel Talavera** - *Initial work* - [Mik3Tab](https://github.com/Mik3Tab)
* **API quiz documentation** - [Opendtb](https://opentdb.com/)  
