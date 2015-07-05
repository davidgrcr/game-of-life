/**
 * Created by david on 5/07/15.
 */
var liveGame = function () {

    var generateTable = function () {
        var $content = document.getElementById('content');
        var filaLength = 15, columnLength = 15;
        var $table = '<table>';
        for (var fila = 0; fila < filaLength; fila++) {
            $table += '<tr>';
            for (var column = 0; column < columnLength; column++) {
                $table += '<td data_position="' + fila + '_' + column + '"></td>';
            }
            $table += '</tr>';
        }

        $table += '</table>';

        $content.innerHTML = $table;

    }

    var doSomething = function (e) {
        var element = e.target;
        var position = element.getAttribute('data_position');
        if (element.classList.contains('live')) {
            element.classList.remove("live");
        } else {
            element.classList.add("live");
        }

    }

    var addEventListeners = function () {
        var theParent = document.querySelector("table");
        theParent.addEventListener("click", doSomething, false);
    }

    var isAlive = function ($td) {
        var bool = false;
        if (typeof $td !== undefined && $td !== null) {
            if ($td.classList.contains('live')) {
                bool = true;
            }
        }

        return bool;
    }

    var getAliveNeighbors = function (f, c) {
        var numberAlive = 0;
        var fLess = f - 1, fPlus = parseInt(f) + 1;
        var columnLess = c - 1, columnPlus = parseInt(c) + 1;

        if (isAlive(document.querySelector("[data_position='" + fLess + "_" + c + "']")))numberAlive++;
        if (isAlive(document.querySelector("[data_position='" + fLess + "_" + columnLess + "']")))numberAlive++;
        if (isAlive(document.querySelector("[data_position='" + f + "_" + columnLess + "']")))numberAlive++;
        if (isAlive(document.querySelector("[data_position='" + fPlus + "_" + columnLess + "']")))numberAlive++;
        if (isAlive(document.querySelector("[data_position='" + fPlus + "_" + c + "']")))numberAlive++;
        if (isAlive(document.querySelector("[data_position='" + fPlus + "_" + columnPlus + "']")))numberAlive++;
        if (isAlive(document.querySelector("[data_position='" + f + "_" + columnPlus + "']")))numberAlive++;
        if (isAlive(document.querySelector("[data_position='" + fLess + "_" + columnPlus + "']")))numberAlive++;

        return numberAlive;
    }

    var check = function (element) {
        // element.style.backgroundColor = "red";
        var position = element.getAttribute('data_position').split('_');
        var number = parseInt(getAliveNeighbors(position[0], position[1]));
        if (element.classList.contains('live')) {
            if (number > 3 || number < 2) {
                element.classList.add("todie");
            }

        } else {
            if (number === 3) {
                element.classList.add("tolive");
            }
        }
    }

    var liveOrDie = function () {
        var cells = document.querySelectorAll("td");
        var i;
        var somethingHappens = false;
        for (i = 0; i < cells.length; i++) {
            element = cells[i];
            if (element.classList.contains('tolive')) {
                element.classList.remove("tolive");
                element.classList.add("live");
                somethingHappens = true;
            } else if (element.classList.contains('todie')) {
                element.classList.remove("live", "todie");
                somethingHappens = true;
            }
        }

        return somethingHappens;
    }

    var myStopFunction = function (myInterval) {
        clearInterval(myInterval);
    }


    var start = function () {
        console.log('START');
        var k = 0;
        var myInterval = setInterval(function () {
            var cells = document.querySelectorAll("td");
            var i;
            for (i = 0; i < cells.length; i++) {
                // cells[i].style.backgroundColor = "red";
                check(cells[i]);
            }
            if (!liveOrDie()) {
                myStopFunction(myInterval);
            }
            console.log(k++);
        }, 800);

    }

    var addListenerToInitButton = function () {
        var $button = document.querySelector("button");
        $button.addEventListener("click", start, false);
    }

    // public functions
    return {
        init: function () {
            generateTable();
            addEventListeners();
            addListenerToInitButton();
        }
    }

}();

liveGame.init();