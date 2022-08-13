var highscorelist = document.getElementById("finalscorelist");
var highscores = JSON.parse(localStorage.getItem("highscore")) || [];
console.log(highscores);
highscorelist.innerHTML = highscores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join("");