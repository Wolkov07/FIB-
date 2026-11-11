// === ВСТАВЬТЕ ВАШУ ССЫЛКУ ИЗ GOOGLE APPS SCRIPT НИЖЕ ===
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyxXLbjh3sDZUA9tL4wV3hf0mICNi56zkv9XttIXkMvKyeLPhQUaL9zJkY1rlKtd4qmHA/exec"; 
// ======================================================

let currentQuestion = 0;
let score = 0;
let seconds = 0;
let timerInterval;
let userAnswers = [];

const totalGradable = questions.filter(q => q.type === "choice" && q.correct !== null).length;

function startQuiz() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    startTimer();
    showQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        document.getElementById("timer").textContent = "Время: " + mins + ":" + secs;
    }, 1000);
}

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question-counter").textContent = "Вопрос " + (currentQuestion + 1) + " из " + questions.length;
    document.getElementById("question-text").textContent = q.question;

    const optionsContainer = document.getElementById("options-container");
    const textContainer = document.getElementById("text-input-container");
    const textArea = document.getElementById("text-answer");

    optionsContainer.innerHTML = "";
    textArea.value = "";

    if (q.type === "choice") {
        optionsContainer.classList.remove("hidden");
        textContainer.classList.add("hidden");

        q.options.forEach((option, index) => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.textContent = option;
            btn.onclick = () => selectChoiceAnswer(index, option);
            optionsContainer.appendChild(btn);
        });
    } else {
        optionsContainer.classList.add("hidden");
        textContainer.classList.remove("hidden");
        textArea.focus();
    }
}

function selectChoiceAnswer(selectedIndex, optionText) {
    const q = questions[currentQuestion];
    let mark = "";

    if (q.correct !== null) {
        if (selectedIndex === q.correct) {
            score++;
            mark = " [ВЕРНО]";
        } else {
            mark = " [НЕВЕРНО]";
        }
    }

    userAnswers.push({
        id: q.id,
        question: q.question,
        answer: optionText + mark
    });

    nextStep();
}

function submitTextAnswer() {
    const q = questions[currentQuestion];
    const textVal = document.getElementById("text-answer").value.trim();

    if (q.required && !textVal) {
        alert("Пожалуйста, заполните поле ответа перед тем как продолжить!");
        return;
    }

    userAnswers.push({
        id: q.id,
        question: q.question,
        answer: textVal || "Не указано"
    });

    nextStep();
}

function nextStep() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

async function finishQuiz() {
    clearInterval(timerInterval);
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    document.getElementById("final-score").textContent = score + " / " + totalGradable;
    
    const minPassScore = 21;
    const passed = score >= minPassScore;
    const statusText = passed ? "ДОПУЩЕН К ПРОВЕРКЕ ЗАДАЧ" : "НЕ СДАНО";
    const timeSpent = document.getElementById("timer").textContent.replace("Время: ", "");

    // Достаем ник игрока из 4-го вопроса для отдельного столбца в таблице
    const nickItem = userAnswers.find(item => item.id === "4");
    const playerNick = nickItem ? nickItem.answer : "Не указан";

    let report = "=== ОТЧЁТ О ПРОХОЖДЕНИИ ТЕСТА В УСБ (05 СЕРВЕР) ===\n";
    report += "Игрок: " + playerNick + "\n";
    report += "Результат тестовой части: " + score + " из " + totalGradable + " баллов\n";
    report += "Затрачено времени: " + timeSpent + "\n";
    report += "Предварительный статус: " + statusText + "\n";
    report += "==================================================\n\n";

    userAnswers.forEach(item => {
        report += item.question + "\nОтвет: " + item.answer + "\n\n";
    });
    
    document.getElementById("report-text").textContent = report;

    // Отправка в Google Таблицу
    if (GOOGLE_SHEET_URL) {
        document.getElementById("result-status").textContent = "Сохраняем ваши ответы в таблицу УСБ...";
        try {
            await fetch(GOOGLE_SHEET_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify({
                    nickname: playerNick,
                    score: score + " / " + totalGradable,
                    status: statusText,
                    time: timeSpent,
                    answers: userAnswers
                })
            });
            document.getElementById("result-status").textContent = passed 
                ? "Тестовая часть пройдена! Ваши ответы автоматически записаны в таблицу проверяющих." 
                : "Тест завершён (набрано меньше " + minPassScore + " баллов). Результат записан в таблицу.";
        } catch (e) {
            document.getElementById("result-status").textContent = "Не удалось отправить автоматически. Скопируйте отчёт ниже и отправьте проверяющему вручную.";
        }
    } else {
        document.getElementById("result-status").textContent = passed 
            ? "Тестовая часть пройдена! Скопируйте отчёт ниже и отправьте проверяющему." 
            : "Тестовая часть не пройдена (набрано меньше " + minPassScore + " баллов).";
    }
}

function copyReport() {
    const text = document.getElementById("report-text").textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert("Полный отчёт со всеми ответами скопирован!");
    });
}
