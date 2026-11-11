// База вопросов (вы можете легко добавлять новые блоки по аналогии)
const questions = [
    {
        question: "Что означает RP-термин DM (DeathMatch)?",
        options: [
            "Убийство или нанесение урона без веской IC-причины",
            "Убийство игрока с помощью автомобиля",
            "Возвращение на место смерти",
            "Использование багов игры"
        ],
        correct: 0 // Индекс правильного ответа (счет начинается с 0)
    },
    {
        question: "Что такое MG (MetaGaming)?",
        options: [
            "Убийство на месте появления (спавне)",
            "Использование информации из реального мира (OOC) в игровом чате (IC)",
            "Выход из игры во время RP-ситуации",
            "Провокация сотрудников полиции"
        ],
        correct: 1
    },
    {
        question: "Какое наказание чаще всего выдается за оскорбление родных?",
        options: [
            "Кик с сервера",
            "Деморган на 30 минут",
            "Блокировка аккаунта (Ban) или длительный мут",
            "Предупреждение в чат"
        ],
        correct: 2
    },
    {
        question: "Что означает термин SK (SpawnKill)?",
        options: [
            "Убийство или нанесение урона на месте появления игрока",
            "Убийство членов своей фракции",
            "Стрельба из окна автомобиля",
            "Быстрый бег с помощью прыжков"
        ],
        correct: 0
    },
    {
        question: "Что такое PG (PowerGaming)?",
        options: [
            "Воображение из себя супергероя (например, драка 1 против 5 вооруженных)",
            "Езда по встречной полосе",
            "Покупка игровой валюты за реальные деньги",
            "Уход от погони в воду"
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let playerNick = "";
let playerServer = "";
let seconds = 0;
let timerInterval;

// Запуск теста
function startQuiz() {
    const nickInput = document.getElementById("nickname").value.trim();
    if (!nickInput) {
        alert("Пожалуйста, введите ваш игровой Nick_Name!");
        return;
    }
    playerNick = nickInput;
    playerServer = document.getElementById("server").value;

    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");

    startTimer();
    showQuestion();
}

// Секундомер
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        document.getElementById("timer").textContent = `Время: ${mins}:${secs}`;
    }, 1000);
}

// Вывод текущего вопроса
function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question-counter").textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;
    document.getElementById("question-text").textContent = q.question;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

// Проверка ответа и переход к следующему
function selectAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

// Завершение теста и вывод результатов
function finishQuiz() {
    clearInterval(timerInterval);
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    document.getElementById("final-score").textContent = `${score} / ${questions.length}`;
    
    const passed = score >= Math.ceil(questions.length * 0.8);
    document.getElementById("result-status").textContent = passed 
        ? "Отличный результат! Тест сдан успешно." 
        : "Тест не сдан. Рекомендуем повторить правила проекта.";

    const timeSpent = document.getElementById("timer").textContent.replace("Время: ", "");
    const report = `Игрок: ${playerNick}\nСервер: ${playerServer}\nРезультат: ${score} из ${questions.length} баллов\nЗатрачено времени: ${timeSpent}\nСтатус: ${passed ? "СДАНО" : "НЕ СДАНО"}`;
    
    document.getElementById("report-text").textContent = report;
}

// Копирование отчета в буфер обмена
function copyReport() {
    const text = document.getElementById("report-text").textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert("Отчет скопирован в буфер обмена! Отправьте его проверяющему.");
    });
}
