const content = document.getElementById('rel_list');
const button_logDate = document.getElementById("button-log_date");

let test_id = 0;

button_logDate.addEventListener('click', function() {
    let input_logDate = document.getElementById("input-log_date");

    new_relatorio(input_logDate.value);
    test_id++;
});

function remove_relatorio(tuple_id) {
    content.removeChild(document.getElementById('tuple-data-'+tuple_id));
}

function new_relatorio(date_data) {   
    const tuple = document.createElement("div");
    let idAttr = "tuple-data-" + date_data;


    tuple.setAttribute("id", "tuple-data-" + test_id);
    tuple.setAttribute("class", "row align-items-start tuple-data");

    let tupleContent = 
    ` <div class=\"col-4 tuple-heading-text column\"> 
        :date:
       </div>
        <div class="col-3 tuple-heading-text column">
            Pendente
        </div>
        <div class="col-3 tuple-heading-text column">
            Não
        </div>
        <div class="col-1 tuple-heading-text column">
            <!-- Aqui o usuário é enviado para a tela de edição do relatório semanal -->
            <a href="rel_semanal.html" style="color: white">D</a>
        </div>
        <div class="col-1 tuple-heading-text column">
            <button id="button-remove-:tuple-id:" style="height: 27px;">E</button>
            <!-- Deleção de relatório semanal -->
        </div>
        `;
    
    tupleContent = tupleContent.replace(":date:", date_data);
    tupleContent = tupleContent.replace(":tuple-id:", test_id);

    tuple.innerHTML = tupleContent;

    content.append(tuple);

    let button_remove = document.getElementById("button-remove-" + test_id);

    const tuple_id = test_id;

    button_remove.addEventListener('click', function() {
        remove_relatorio(tuple_id);
    });
}