/**
 * Created by david on 5/07/15.
 */

function putBack() {
    document.getElementById('form_init').classList.remove("hidden");
    document.getElementById('gameArea').classList.add("hidden");
}

var gameOfLive = function () {

    var generateTable = function (rowLength, columnLength) {
        var $content = document.getElementById('content'),
        //rowLength = row, columnLength = files,
            $table = '<table class="">',
            $gameArea = document.getElementById('gameArea');

        for (var row = 0; row < rowLength; row++) {
            $table += '<tr>';
            for (var column = 0; column < columnLength; column++) {
                $table += '<td data_position="' + row + '_' + column + '"></td>';
            }
            $table += '</tr>';
        }

        $table += '</table>';

        $content.innerHTML = $table;
        $gameArea.classList.remove('hidden');

    };

    var handleLiveClass = function (e) {
        var element = e.target;
        //var position = element.getAttribute('data_position');
        if (element.classList.contains('live')) {
            element.classList.remove("live");
        } else {
            element.classList.add("live");
        }

    };

    var addEventListeners = function () {
        var theParent = document.querySelector("table");
        theParent.addEventListener("click", handleLiveClass, false);
    };

    var isAlive = function ($td) {
        var bool = false;
        if (typeof $td !== undefined && $td !== null) {
            if ($td.classList.contains('live')) {
                bool = true;
            }
        }

        return bool;
    };

    var getAliveNeighbors = function (f, c) {
        var numberAlive = 0,
            fLess = f - 1, fPlus = parseInt(f) + 1,
            columnLess = c - 1, columnPlus = parseInt(c) + 1;

        if (isAlive(document.querySelector("[data_position='" + fLess + "_" + c + "']")))numberAlive++;
        if (isAlive(document.querySelector("[data_position='" + fLess + "_" + columnLess + "']")))numberAlive++;
        if (isAlive(document.querySelector("[data_position='" + f + "_" + columnLess + "']")))numberAlive++;
        if (isAlive(document.querySelector("[data_position='" + fPlus + "_" + columnLess + "']")))numberAlive++;
        if (isAlive(document.querySelector("[data_position='" + fPlus + "_" + c + "']")))numberAlive++;
        if (isAlive(document.querySelector("[data_position='" + fPlus + "_" + columnPlus + "']")))numberAlive++;
        if (isAlive(document.querySelector("[data_position='" + f + "_" + columnPlus + "']")))numberAlive++;
        if (isAlive(document.querySelector("[data_position='" + fLess + "_" + columnPlus + "']")))numberAlive++;

        return numberAlive;
    };

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
    };

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
    };

    var myStopFunction = function (myInterval) {
        clearInterval(myInterval);
    };


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
                putBack();
            }
            console.log(k++);
        }, 800);

    };

    var addListenerToInitButton = function () {
        var $button = document.querySelector("button#initGame");
        $button.addEventListener("click", start, false);
    };

    // public functions
    return {
        init: function (row, files) {
            generateTable(row, files);
            addEventListeners();
            addListenerToInitButton();
        }
    };
}();

var Form = {
    div_form: '',
    form: '',
    btn: '',
    rows: '',
    files: '',
    init: function () {
        Form.form = document.getElementById('form1'),
            Form.btn = document.getElementById('sendForm'),
            Form.div_form = document.getElementById('form_init');

        Form.addEventListeners();

    },
    addEventListeners: function () {
        Form.btn.addEventListener("click", Form.checkDataFilled, false);
        Form.form.addEventListener("keypress", Form.checkKeyPress, false);
    },
    checkKeyPress: function (e) {
        if (e.keyCode == 13) {
            Form.btn.click();
        }
    },
    checkDataFilled: function () {
        Form.rows = document.getElementById('rows'),
            Form.files = document.getElementById('files');
        var checkRows = Form.rows.value == '' || Form.rows.value < 1 || isNaN(Form.rows.value),
            checkFiles = Form.files.value == '' || Form.files.value < 1 || isNaN(Form.files.value);

        //console.log(checkRows, checkFiles);
        //console.log(Form.rows.value, Form.files.value);
        if (checkRows || checkFiles) {
            alert("Is not a number");
            return false;
        } else {
            //alert("we gonna play");
            //console.log(Form.div_form);
            Form.div_form.classList.add("hidden");
            gameOfLive.init(Form.rows.value, Form.files.value);
        }
    }
};

(function () {
    var $btn = document.querySelector("button.refresh");
    $btn.addEventListener("click", function () {
        location.reload();
    }, false);
})();

Form.init();

