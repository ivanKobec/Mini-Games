// Получение уровня сложности для таймера
function getDifficultyMultiplier() {
    const difficulty = document.getElementById("difficulty").value;
    if (!difficulty) {
        alert("Пожалуйста, выберите уровень сложности перед началом игры!");
        throw new Error("Уровень сложности не выбран");
    }
    switch (difficulty) {
        case "easy":
            return 2 * 60; // 2 минуты в секундах
        case "medium":
            return 1.5 * 60; // 1,5 минуты в секундах
        case "hard":
            return 30; // 30 секунд
        default:
            return 60; // Значение по умолчанию: 1 минута
    }
}

// Получение цели для кликера
function getClickerTarget() {
    const difficulty = document.getElementById("difficulty").value;
    if (!difficulty) {
        alert("Пожалуйста, выберите уровень сложности перед началом игры!");
        throw new Error("Уровень сложности не выбран");
    }
    switch (difficulty) {
        case "easy":
            return 100; // Лёгкий уровень: 100 кликов
        case "medium":
            return 150; // Средний уровень: 150 кликов
        case "hard":
            return 155; // Сложный уровень: 160 кликов
        default:
            return 50; // Значение по умолчанию
    }
}

// Запуск таймера
function startTimer(duration, onTimeUp) {
    const timerDisplay = document.createElement("p");
    timerDisplay.style.fontSize = "18px";
    timerDisplay.style.fontWeight = "bold";

    let timeLeft = duration;
    const timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.innerText = `Осталось времени: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval); // Остановка таймера
            onTimeUp();
        }
    }, 1000);

    // Функция остановки таймера
    timerDisplay.stopTimer = function () {
        clearInterval(timerInterval);
    };

    return timerDisplay;
}

// Функция для игры "Поймай шарик"
function startCatchBallGame() {
    const menu = document.getElementById("menu");
    const gameArea = document.getElementById("gameArea");

    menu.style.display = "none";
    gameArea.style.display = "block";
    gameArea.innerHTML = "";

    let score = 0;
    const targetScore = 20;
    const ball = document.createElement("div");
    ball.className = "ball";

    const scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = `Очки: ${score} / ${targetScore}`;

    const winMessage = document.createElement("p");
    winMessage.style.fontSize = "24px";

    const timerDisplay = startTimer(getDifficultyMultiplier(), () => {
        winMessage.innerText = "Время вышло! Попробуйте снова.";
        ball.remove();
    });

    gameArea.appendChild(scoreDisplay);
    gameArea.appendChild(ball);
    gameArea.appendChild(winMessage);
    gameArea.appendChild(timerDisplay);

    function moveBall() {
        const maxX = gameArea.clientWidth - ball.offsetWidth;
        const maxY = gameArea.clientHeight - ball.offsetHeight;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        ball.style.left = `${randomX}px`;
        ball.style.top = `${randomY}px`;
    }

    ball.addEventListener("click", function () {
        score++;
        scoreDisplay.innerText = `Очки: ${score} / ${targetScore}`;
        if (score >= targetScore) {
            winMessage.innerText = "Поздравляем! Вы выиграли!";
            ball.remove();
            timerDisplay.stopTimer();
        } else {
            moveBall();
        }
    });

    moveBall();
}

// Функция для игры "Кликер"
function startClickerGame() {
    const menu = document.getElementById("menu");
    const gameArea = document.getElementById("gameArea");

    menu.style.display = "none";
    gameArea.style.display = "block";
    gameArea.innerHTML = "";

    let score = 0;
    const targetScore = getClickerTarget();
    const button = document.createElement("button");
    button.innerText = "Кликни меня!";
    const scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = `Очки: ${score} / ${targetScore}`;

    const timerDisplay = startTimer(getDifficultyMultiplier(), () => {
        button.remove();
        scoreDisplay.innerText = "Время вышло! Попробуйте снова.";
    });

    gameArea.appendChild(scoreDisplay);
    gameArea.appendChild(button);
    gameArea.appendChild(timerDisplay);

    button.addEventListener("click", function () {
        score++;
        scoreDisplay.innerText = `Очки: ${score} / ${targetScore}`;
        if (score >= targetScore) {
            scoreDisplay.innerText = "Поздравляем! Вы выиграли!";
            button.remove();
            timerDisplay.stopTimer();
        }
    });
}

// Функция для игры "Простая математика"
function startMathGame() {
    const menu = document.getElementById("menu");
    const gameArea = document.getElementById("gameArea");

    menu.style.display = "none";
    gameArea.style.display = "block";
    gameArea.innerHTML = "";

    let score = 0;
    const targetScore = 5;

    const scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = `Очки: ${score} / ${targetScore}`;
    scoreDisplay.style.fontSize = "20px";

    const question = document.createElement("p");
    const input = document.createElement("input");
    const button = document.createElement("button");
    const message = document.createElement("p");

    button.innerText = "Ответить";

    gameArea.appendChild(scoreDisplay);
    gameArea.appendChild(question);
    gameArea.appendChild(input);
    gameArea.appendChild(button);
    gameArea.appendChild(message);

    const timerDisplay = startTimer(getDifficultyMultiplier(), () => {
        button.remove();
        input.remove();
        message.innerText = "Время вышло! Попробуйте снова.";
    });
    gameArea.appendChild(timerDisplay);

    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = num1 + num2;

        question.innerText = `Сколько будет: ${num1} + ${num2}?`;

        button.onclick = function () {
            const answer = parseInt(input.value);
            if (answer === correctAnswer) {
                score++;
                message.innerText = "Правильно! Молодец!";
                scoreDisplay.innerText = `Очки: ${score} / ${targetScore}`;
                input.value = "";
                if (score >= targetScore) {
                    message.innerText = "Поздравляем! Вы выиграли!";
                    input.remove();
                    button.remove();
                    timerDisplay.stopTimer();
                } else {
                    generateQuestion();
                }
            } else {
                message.innerText = "Неправильно. Попробуйте ещё раз!";
            }
        };
    }

    generateQuestion();
}