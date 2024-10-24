// Игра в пары

// Функция генерирующая массив парных чисел. count - количество пар
function createCardsNumberArray(count) {
    let a = [];
    for (let i = 1; i <= count; i++) {
        a.push(i, i);
    };
    return shuffleCardsNumberArray(a);
}

// Функция перемешивания массива чисел
function shuffleCardsNumberArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Функция запуска таймера
function timer(el) {
    let time = 60; // Задаём начальное время
    const timer = setInterval(() => {
        el.textContent = time;
        if (time >= 0) {
            // С каждой секундой уменьшаем время
            el.textContent = time--;
            if (cardsNumberArray.length === document.querySelectorAll(".success").length) {
                clearInterval(timer);
                alert(`Поздравляем! Вы выйграли! Ваше время: ${60 - time} сек.`);
            }
        } else {
            // Останавливаем таймер, поскольку время истекло
            clearInterval(timer);
            alert("Игра закончена! Прошла минута");
            // Запуск игры
            startGame(container, count);

        }
    }, 1000); // Интервал делаем одну секунду
}


// Функция старта игры
function startGame(container, count) {

    // Очистка игрового поля
    container.innerHTML = "";

    // Настройка количества пар карточек на поле от 1 до 10
    count = +prompt("Введите количество карточных пар (от 1 до 10)", 4);
    while (1 > count || count > 11) {
        count = +prompt("Введите количество карточных пар (от 1 до 10): ", 4);
    }

    // Таймер окончания игры в одну минуту
    const timerElement = document.createElement('span');
    timerElement.classList.add("timer");
    container.append(timerElement);
    timer(timerElement);

    // Создание обертки для группы карточек
    const wrapperCard = document.createElement("div");
    wrapperCard.classList.add("wrapper");

    // Создание массива карточек и перемешивание
    cardsNumberArray = createCardsNumberArray(count);
    console.log(cardsNumberArray);

    // Хранение открытой пары карточек
    let card1 = null;
    let card2 = null;

    // Создаём карточки из массива и добавляем в контейнер
    for (const cardNumber of cardsNumberArray) {
        let card = document.createElement('div')
        card.textContent = cardNumber;
        card.classList.add('card');

        // Изменение размера карточек от их количества
        // Чтобы все карточки были на одном экране
        if (4 < count) {
            card.classList.add("card-size-1");
        } if (9 < count) {
            card.classList.add("card-size-2");
        }

        // Клик по карточке
        card.addEventListener("click", function () {

            // Исключение повторного клика по карточке
            if (card.classList.contains("open") || card.classList.contains("success")) {
                return
            }

            // Открытие кликнутой карточки
            card.classList.add("open");

            // Если открыто две карточки
            if (card1 !== null && card2 !== null) {
                card1.classList.remove("open");
                card2.classList.remove("open");
                card1 = null;
                card2 = null;
            }

            // Присвоение двум переменным карточек-элементов
            if (card1 === null) {
                card1 = card;
            } else {
                card2 = card;
            }

            // Присвоение двум переменным значений карточек и их сравнение
            if (card1 !== null && card2 !== null) {
                let cardNumber1 = card1.textContent;
                let cardNumber2 = card2.textContent;

                if (cardNumber1 === cardNumber2) {
                    card1.classList.add("success");
                    card2.classList.add("success");
                }
            }

            // Когда все карточки открыты, появляется сообщение
            if (cardsNumberArray.length === document.querySelectorAll(".success").length) {

                // Создание кнопки «Сыграть ещё раз»
                const btnStartGame = document.createElement('button');
                btnStartGame.classList.add("btn");
                btnStartGame.textContent = "Сыграть ещё раз";
                container.append(btnStartGame);

                // Создание события клика по кнопке
                btnStartGame.addEventListener("click", function () {

                    // Перезапуск игры
                    startGame(container, count);
                })

            }

        })

        wrapperCard.append(card);
        container.append(wrapperCard);
    }

}


// НАЧАЛО

// Загружаем из HTML контейнер для игрового поля
const container = document.getElementById('container');

// Количество пар карточек по умолчанию
let count = 4;
// Массив карточек
let cardsNumberArray = [];
// Запуск игры
startGame(container, count);
