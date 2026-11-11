const questions = [
    { id: "1", type: "choice", question: "1. Укажите ваш игровой уровень:", options: ["Меньше 10", "10 и выше"], correct: 1 },
    { id: "2", type: "choice", question: "2. Укажите ваш реальный возраст:", options: ["Меньше 15", "15 и выше"], correct: 1 },
    { id: "3", type: "choice", question: "3. Согласны ли вы следить за соблюдением правил и наказывать нарушителей (в том числе друзей)?", options: ["Нет", "Да"], correct: 1 },
    { id: "4", type: "text", question: "4. Ник в игре (Nick_Name):", required: true },
    { id: "5", type: "text", question: "5. Ваш часовой пояс и удобное время для онлайна:", required: true },
    { id: "6", type: "choice", question: "6. Сколько часов в день вы готовы уделять игре и стажировке?", options: ["до 1 часа", "1–3 часа", "3–5 часов", "более 5 часов"], correct: null },
    { id: "7", type: "choice", question: "7. Есть ли у вас опыт работы в администрации или другой роли на проектах?", options: ["Нет", "Да"], correct: null },
    { id: "7а", type: "text", question: "7а. Если «Да» — где и что делали (если «Нет», поставьте прочерк):", required: true },
    { id: "8", type: "text", question: "8. Почему именно вы? Расскажите, чем будете полезны проекту (минимум 3–4 предложения):", required: true },
    { id: "9", type: "choice", question: "9. Были ли у вас наказания (бан/варн/кик) на сервере?", options: ["Нет", "Да"], correct: null },
    { id: "9а", type: "text", question: "9а. Если «Да» — укажите причину (если «Нет», поставьте прочерк):", required: true },
    { id: "10", type: "choice", question: "10. Подтверждаете, что ознакомились с правилами сервера и стажировки?", options: ["Нет", "Да"], correct: 1 },
    { id: "11", type: "text", question: "11. Контакт для связи (Discord / Telegram / VK):", required: true },
    { id: "12", type: "choice", question: "12. Что такое «метагейминг»?", options: ["Использование информации, полученной вне роли (OOC), внутри игры", "Нарушение всех правил сервера", "Быстрая езда по городу"], correct: 0 },
    { id: "13", type: "choice", question: "13. Что такое «powergaming» (ПГ)?", options: ["Навязывание своих действий без шанса на ответ другого игрока", "Игра со звуком на минимуме", "Пропуск бесплатных событий"], correct: 0 },
    { id: "14", type: "choice", question: "14. Вы получили выстрел в спину и упали. Ваши действия?", options: ["Отписать в чат и вернуться в бой", "Отыграть ранение; выйти из образа только через админ-чат", "Вернуться и добить обидчика"], correct: 1 },
    { id: "15", type: "choice", question: "15. Ваш друг нарушил правила на ваших глазах. Что делаете?", options: ["Позволяю — он друг", "Принимаю меры наравне с остальными игроками", "Жду, пока кто-то другой пожалуется"], correct: 1 },
    { id: "16", type: "choice", question: "16. Что такое DM (deathmatch)?", options: ["Убийство без РП-повода и отыгровки", "Парная поездка", "Скидка на транспорт"], correct: 0 },
    { id: "17", type: "choice", question: "17. Что влечёт разглашение засекреченной информации? (ст. 23 ФП)", options: ["Выговор с занесением", "Увольнение", "Замечание"], correct: 1 },
    { id: "18", type: "choice", question: "18. Сотрудник в свободное время появился в состоянии опьянения в общественном месте. Наказание? (ст. 8 ФП)", options: ["Наказания нет — рабочее время закончилось", "Выговор с занесением или увольнение", "Только устное предупреждение"], correct: 1 },
    { id: "19", type: "choice", question: "19. Сотрудник помогал коллеге проходить служебную проверку. Это… (ст. 5 ФП)", options: ["Взаимовыручка, допустимо", "Выговор с занесением", "Основание для увольнения в любом случае"], correct: 1 },
    { id: "20", type: "choice", question: "20. Какое наказание влечёт нефиксация правонарушения перед применением мер? (ст. 6 ФП)", options: ["Выговор с занесением или увольнение", "Замечание", "Ничего, если правонарушение реально было"], correct: 0 },
    { id: "21", type: "choice", question: "21. Несанкционированное использование спецсигналов на служебном транспорте влечёт… (ст. 17 ФП)", options: ["Штраф по КоАП", "Выговор с занесением", "Устное предупреждение"], correct: 1 },
    { id: "22", type: "choice", question: "22. Срок задержания подозреваемого без ареста составляет… (ст. 1, 11 Пк)", options: ["До 3 часов", "До 1 часа", "До 24 часов"], correct: 1 },
    { id: "23", type: "choice", question: "23. Сколько длится проверка сообщения о преступлении до принятия решения? (ст. 4 Пк)", options: ["Не более 3 суток", "Не более 5 суток", "Не более 24 часов"], correct: 0 },
    { id: "24", type: "choice", question: "24. Следственные действия в ночное время (с 22:00 до 06:00)… (ст. 6 Пк)", options: ["Проводятся свободно", "Не допускаются, кроме случаев, не терпящих отлагательства", "Допускаются только с санкции губернатора"], correct: 1 },
    { id: "25", type: "choice", question: "25. Задержанному нужен адвокат. Сколько ждать его прибытия? (ст. 12 Пк)", options: ["Ответ на требование — 2 минуты, прибытие — 5 минут", "Прибытие — 30 минут", "Адвоката можно не вызывать"], correct: 0 },
    { id: "26", type: "choice", question: "26. Осмотр места происшествия можно провести… (ст. 9 Пк)", options: ["Только после возбуждения уголовного дела", "До возбуждения уголовного дела", "Только по решению руководителя следственного органа ФСБ"], correct: 1 },
    { id: "27", type: "choice", question: "27. Умышленное лишение жизни наказывается сроком… (ст. 1 УК)", options: ["4 года", "6 лет", "8 лет"], correct: 2 },
    { id: "28", type: "choice", question: "28. Разбой наказывается лишением свободы сроком… (ст. 16 УК)", options: ["2 года", "3 года", "4 года"], correct: 2 },
    { id: "29", type: "choice", question: "29. Сотрудник за взятку освободил знакомого от ответственности без законных оснований. Это… (ст. 34, 39 УК)", options: ["Получение неправомерного вознаграждения — 5 лет", "Незаконное освобождение от уголовной ответственности — 5 лет", "Только дисциплинарное нарушение по ФП"], correct: 1 },
    { id: "30", type: "choice", question: "30. Незаконное проникновение на территорию ФСБ наказывается сроком… (ст. 44 УК)", options: ["4 года", "5 лет", "6 лет"], correct: 1 },
    { id: "31", type: "choice", question: "31. Управление транспортным средством в состоянии опьянения влечёт… (ст. 3.2 КоАП)", options: ["Штраф 2000 рублей + лишение водительского удостоверения", "Только штраф 5000 рублей", "Арест до 1 часа"], correct: 0 },
    { id: "32", type: "choice", question: "32. Кто в Свердловской области назначает руководителей силовых структур и главного врача больницы? (ст. 17 ОЗ)", options: ["Правительство области", "Начальник области по согласованию с Администрацией Московской области", "Руководитель ФСБ"], correct: 1 },
    { id: "33", type: "choice", question: "33. В оперативных вопросах ФСБ координирует действия… (ст. 21 ОЗ)", options: ["Только МВД", "МВД, ГИБДД и ВЧ", "Никого — работает автономно"], correct: 1 },
    { id: "34", type: "text", question: "34. [Ситуационная задача] Ваш напарник на ваших глазах превышает должностные полномочия в отношении гражданина. Опишите по шагам: что вы делаете, как оформляете, куда сообщаете.", required: true },
    { id: "35", type: "text", question: "35. [Ситуационная задача] Вы задерживаете нарушителя. Опишите полный порядок задержания по шагам — от подхода к нарушителю до действий в отделении.", required: true },
    { id: "36", type: "text", question: "36. [Ситуационная задача] Задержанный на улице заявляет: «Дайте телефон и адвоката прямо сейчас!». Что вы делаете: когда положен звонок, сколько ждать адвоката, куда доставить?", required: true },
    { id: "37", type: "text", question: "37. [Ситуационная задача] Вы задержали подозреваемого, час подходит к концу, вина не доказана. Ваши действия? Что будет, если удерживать его дольше?", required: true },
    { id: "38", type: "text", question: "38. [Ситуационная задача] Гражданин подаёт заявление о готовящемся преступлении, доказательств нет. Как вы оформляете обращение, сколько времени на проверку, какие решения возможны?", required: true },
    { id: "39", type: "text", question: "39. [Ситуационная задача] Во время задержания вы устанавливаете личность задержанного — это Начальник области. Что делаете? Можно ли задерживать его дальше?", required: true },
    { id: "40", type: "text", question: "40. [Ситуационная задача] Водитель совершил выезд на полосу встречного движения. Назовите статью КоАП и меру ответственности. Чем это отличается от движения по дороге с односторонним движением?", required: true },
    { id: "41", type: "text", question: "41. [Ситуационная задача] Коллега просит «не фиксировать» его прогул в ваше дежурство. Что вы делаете и почему?", required: true }
];
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
        document.getElementById("timer").textContent = `Время: ${mins}:${secs}`;
    }, 1000);
}

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question-counter").textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;
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

function finishQuiz() {
    clearInterval(timerInterval);
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    document.getElementById("final-score").textContent = `${score} / ${totalGradable}`;
    
    const minPassScore = 21;
    const passed = score >= minPassScore;
    document.getElementById("result-status").textContent = passed 
        ? "Тестовая часть пройдена! Скопируйте отчёт ниже и отправьте проверяющему для оценки ситуационных задач." 
        : `Тестовая часть не пройдена (набрано меньше ${minPassScore} баллов).`;

    const timeSpent = document.getElementById("timer").textContent.replace("Время: ", "");
    
    let report = `=== ОТЧЁТ О ПРОХОЖДЕНИИ ТЕСТА В УСБ (05 СЕРВЕР) ===\n`;
    report += `Результат тестовой части: ${score} из ${totalGradable} баллов\n`;
    report += `Затрачено времени: ${timeSpent}\n`;
    report += `Предварительный статус: ${passed ? "ДОПУЩЕН К ПРОВЕРКЕ ЗАДАЧ" : "НЕ СДАНО"}\n`;
    report += `==================================================\n\n`;

    userAnswers.forEach(item => {
        report += `${item.question}\nОтвет: ${item.answer}\n\n`;
    });
    
    document.getElementById("report-text").textContent = report;
}

function copyReport() {
    const text = document.getElementById("report-text").textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert("Полный отчёт со всеми ответами скопирован! Вставьте его в сообщение проверяющему.");
    });
}
