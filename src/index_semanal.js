const content = document.getElementById('rel_list');
const button_logDate = document.getElementById("button-log_date");
const errDisplay = document.getElementById('input-log_date-err');

let test_id = 0;

function verifyDate(day, month, year) {
    if (day < 1 || month < 1 || year < 1965 || year > 9999)
        return false;

    if (month === 4 || month === 6 || month === 9 || month === 11)
        if (day > 30)
            return false;
    if (month === 2) {
        if ((year % 100 === 0 && year % 400 === 0) || (year % 4 === 0)) {
            if (day > 29)
                return false;
        }
        else if (day > 28)
            return false;
    }
    return true;
}

function convertToDateObj(date_data) {
    //Formato da data DD/MM/AAAA
    let dateArr = date_data.split('/');

    if (dateArr.length < 3)
        return 0;

    if (!verifyDate(parseInt(dateArr[0]), parseInt(dateArr[1]), parseInt(dateArr[2])))
        return 0;

    console.log(dateArr);

    let dateCheck = dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0];

    let dateObj = new Date(dateCheck);

    console.log(dateObj);
    console.log(!isNaN(dateObj));

    if (isNaN(dateObj)) {
        return 0;
    }

    let dateFormated = ("00" + dateArr[0]).slice(-2) + "/" +
        ("00" + dateArr[1]).slice(-2) + "/" +
        ("0000" + dateArr[2]).slice(-4);

    return dateFormated;
}

button_logDate.addEventListener('click', function () {
    let input_logDate = document.getElementById("input-log_date");

    new_relatorio(input_logDate.value);
    test_id++;
});

function remove_relatorio(tuple_id) {
    content.removeChild(document.getElementById('tuple-data-' + tuple_id));
}

function convertDateFormat(dateObj) {
    return (dateObj.getDay()) + "/" + (dateObj.getMonth()) + "/" + dateObj.getFullYear();
}

function new_relatorio(dateStr) {
    let dateFormated = convertToDateObj(dateStr);
    errDisplay.innerText = "";

    if (dateFormated === 0) {
        errDisplay.innerText = "ERRO - Data inválida!";
        return;
    }

    const tuple = document.createElement("div");

    tuple.setAttribute("id", "tuple-data-" + test_id);
    tuple.setAttribute("class", "row align-items-start tuple-data");

    let tupleContent =
        ` <div class="col-4 tuple-heading-text column"> 
        :date:
    </div>
    <div class="col-3 tuple-heading-text column">
        Pendente
    </div>
    <div class="col-3 tuple-heading-text column">
        Não
    </div>
    <div class="col-1 tuple-heading-text column" style="text-align: center;">
        <!-- Aqui o usuário é enviado para a tela de edição do relatório semanal -->
        <a href="rel_semanal.html">
            <img src="../res/lupa.svg" style="height: 25px;"></img>
        </a>
    </div>
    <div class="col-1 tuple-heading-text column" style="text-align: center;">
            <img id="button-remove-:tuple-id:" src="../res/lixo.svg" style="height: 25px; cursor: pointer;"></img>
        <!-- Deleção de relatório semanal -->
    </div>
    `;


    tupleContent = tupleContent.replace(":date:", dateFormated);
    tupleContent = tupleContent.replace(":tuple-id:", test_id);

    tuple.innerHTML = tupleContent;

    content.append(tuple);

    let button_remove = document.getElementById("button-remove-" + test_id);

    const tuple_id = test_id;

    button_remove.addEventListener('click', function () {
        remove_relatorio(tuple_id);
    });
}