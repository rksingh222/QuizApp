
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalscore = document.getElementById("finalscore");
const mostRecentScore = localStorage.getItem("mostrecentscore");
finalscore.innerText = mostRecentScore;
const highscores = JSON.parse(localStorage.getItem("highscore")) || [];
console.log(highscores);

const MAX_HIGH_SCORES = 5;


username.addEventListener("keyup",()=>{
    if(username.value){
        saveScoreBtn.disabled = false;
    }else{
        saveScoreBtn.disabled = true;
    }
    
});

saveHighScore = (e)=>{
    e.preventDefault();
    console.log("save button clicked");

    const score = {
        score: Math.floor(Math.random()*100),
        name: username.value,
    };

    highscores.push(score);

    highscores.sort((a,b) =>{
        return b.score - a.score;
    });

    highscores.splice(5);
    localStorage.setItem("highscore",JSON.stringify(highscores));

    console.log(highscores);

};