//variables
const pregunta = document.getElementById('question');
const eleccion = Array.from(document.getElementsByClassName('choice-text'));
const barraProgreso = document.getElementById('progressText');
const textoScore = document.getElementById('score');
const barraProgresoFull = document.getElementById('progressBarFull');
let preguntaActual = {};
let respuestasElegidas = false;
let score = 0;
let ContadorPreguntas = 0;
//variables para almacenar preguntas
let PreguntasDisponibles = [];
let preguntas = [];

//petición fetch
fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple')
    .then((res) => {
        return res.json();
    })
    .then((preguntasCargadas) => {
        preguntas = preguntasCargadas.results.map((preguntaCargada) => {
            console.log(preguntaCargada)
            const preguntaFormateada = {
                pregunta: preguntaCargada.question,
            };
            const RespuestaElec = [...preguntaCargada.incorrect_answers];
            preguntaFormateada.respuesta = Math.floor(Math.random() * 4) + 1;
            RespuestaElec.splice(
                preguntaFormateada.respuesta - 1,
                0,
                preguntaCargada.correct_answer  
            );
            RespuestaElec.forEach((choice, index) => {
                preguntaFormateada['choice' + (index + 1)] = choice;
            });

            return preguntaFormateada;
        });
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTES
const resCorrecta = 100;
const maxPreguntas = 10;
startGame = () => {
    ContadorPreguntas = 0;
    score = 0;
    PreguntasDisponibles = [...preguntas];
    getNewQuestion();
};
getNewQuestion = () => {
    if (PreguntasDisponibles.length === 0 || ContadorPreguntas >= maxPreguntas) {
        localStorage.setItem('mostRecentScore', score);
    //Redirección a la página de resultados
        return window.location.assign('end.html');
}
ContadorPreguntas++;
    barraProgreso.innerText = `Pregunta ${ContadorPreguntas}/${maxPreguntas}`;
    //Aquí actualizo la barra de progreso
    barraProgresoFull.style.width = `${(ContadorPreguntas / maxPreguntas) * 100}%`;

    const indexPregunta = Math.floor(Math.random() * PreguntasDisponibles.length);
    preguntaActual = PreguntasDisponibles[indexPregunta];
    pregunta.innerText = preguntaActual.pregunta;

    eleccion.forEach((choice) => {
        const numero = choice.dataset['number'];
        choice.innerText = preguntaActual['choice' + numero];
    });

    PreguntasDisponibles.splice(indexPregunta, 1);
    respuestasElegidas = true;
};

eleccion.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!respuestasElegidas) return;

        respuestasElegidas = false;
        const almacenaRes = e.target;
        const resElegida = almacenaRes.dataset['number'];

        const clase =
            resElegida  == preguntaActual.respuesta ? 'correct' : 'incorrect';

        if (clase === 'correct') {
            incrementScore(resCorrecta);
        }

        almacenaRes.parentElement.classList.add(clase);

        setTimeout(() => {
            almacenaRes.parentElement.classList.remove(clase);
            getNewQuestion();
        }, 1000);
    });
});
incrementScore = (num) => {
    score += num;
    textoScore.innerText = score;
};