'use strict';

const N = 10;
let Current = 1;

const scoreDiv = document.querySelector('.score');
const btnNewGameElem = document.querySelector('.button');
const tableElem = document.createElement('table');

const clearAvailableCells = function () {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const cellElem = document.querySelector(`.cell--${i}--${j}`);
            if (cellElem.classList.contains('availableCell'))
                cellElem.classList.remove('availableCell');
        }
    }
};

const refreshTable = function () {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const cellElem = document.querySelector(`.cell--${i}--${j}`);
            cellElem.textContent = '';
            if (cellElem.classList.contains('availableCell'))
                cellElem.classList.remove('availableCell');
            if (cellElem.classList.contains('visitedCell'))
                cellElem.classList.remove('visitedCell');
            if (cellElem.classList.contains('currentCell'))
                cellElem.classList.remove('currentCell');
        }
    }
};

const setAvailableCells = function (cellElem) {
    const curr_i = Number(cellElem.getAttribute('i'));
    const curr_j = Number(cellElem.getAttribute('j'));
    let availableCellCount = 0;
    const moves = [
        [3, 0],
        [-3, 0],
        [0, -3],
        [0, 3],
        [2, 2],
        [2, -2],
        [-2, 2],
        [-2, -2],
    ];

    clearAvailableCells();

    moves.forEach((val, idx) => {
        const new_i = val[0] + curr_i;
        const new_j = val[1] + curr_j;

        const availCell = document.querySelector(`.cell--${new_i}--${new_j}`);

        if (
            val[0] + curr_i >= 0 &&
            val[0] + curr_i < N &&
            val[1] + curr_j >= 0 &&
            val[1] + curr_j < N &&
            !availCell.classList.contains('visitedCell')
        ) {
            availCell.classList.toggle('availableCell');
            availableCellCount++;
        }
    });

    // Game Over
    if (availableCellCount === 0) {
        // var audio = new Audio('./crowd.wav');
        // audio.play();

        scoreDiv.textContent = `Game over! Your score is ${Current}! 🎉🥳`;

        scoreDiv.classList.toggle('hidden');
        tableElem.classList.toggle('hidden');
        btnNewGameElem.classList.toggle('hidden');
    }
};

const createTable = function (N) {
    tableElem.style.width = `${4 * N}%`;

    tableElem.classList.add('board');

    let previousCell = undefined;

    for (let i = 0; i < N; i++) {
        const rowElem = document.createElement('tr');
        rowElem.classList.add('row');
        for (let j = 0; j < N; j++) {
            const cellElem = document.createElement('td');
            cellElem.setAttribute('i', `${i}`);
            cellElem.setAttribute('j', `${j}`);
            cellElem.textContent = ''; //i * N + j;
            cellElem.classList.add('cell');
            cellElem.classList.add(`cell--${i}--${j}`);

            cellElem.addEventListener('click', function () {
                if (
                    cellElem.classList.contains('availableCell') ||
                    Current === 1
                ) {
                    // var audio = new Audio('./bubble2.wav');
                    // audio.play();

                    cellElem.classList.add('visitedCell');
                    cellElem.textContent = Current;

                    if (previousCell != undefined) {
                        previousCell.classList.remove('currentCell');
                    }

                    if (Number(cellElem.textContent) === Current) {
                        cellElem.classList.add('currentCell');
                    }

                    // highlight available nodes
                    setAvailableCells(cellElem);
                    Current++;
                    previousCell = cellElem;
                }
            });

            rowElem.appendChild(cellElem);
        }
        tableElem.appendChild(rowElem);
    }

    document.body.appendChild(tableElem);
};

btnNewGameElem.addEventListener('click', function () {
    Current = 1;
    refreshTable();

    scoreDiv.classList.toggle('hidden');
    tableElem.classList.toggle('hidden');
    btnNewGameElem.classList.toggle('hidden');
});

// Create Table With the Given Parameters
createTable(N);
