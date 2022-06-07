function addMatch(){
    let type = document.getElementById("type").value;
    let material_difference_end = document.getElementById("mat-diff-end").value;
    let material_difference_avg = document.getElementById("mat-diff-avg").value;
    let total_time = document.getElementById("TTime").value;
    let increment = document.getElementById("increment").value;
    let total_moves = document.getElementById("moves").value;
    let victory_status = document.getElementById("victory_status").value;
    let victory_reason = document.getElementById("reason").value;
    let given_time = document.getElementById("GTime").value;
    let white_time = document.getElementById("WhiteTime").value;
    let black_time = document.getElementById("BlackTime").value;
    let opening_name = document.getElementById("opening").value;
    let ID_tournament = document.getElementById("tournament").value;
    let ID_whitePlayer = document.getElementById("white").value;
    let ID_blackPlayer = document.getElementById("black").value;

    let form_data = new FormData();
    form_data.append('opening_name', opening_name);
    form_data.append('ID_tournament', ID_tournament);
    form_data.append('ID_whitePlayer', ID_whitePlayer);
    form_data.append('ID_blackPlayer', ID_blackPlayer);
    form_data.append('type', type);
    form_data.append('material_difference_end', material_difference_end);
    form_data.append('material_difference_avg', material_difference_avg);
    form_data.append('total_time', total_time);
    form_data.append('increment', increment);
    form_data.append('total_moves', total_moves);
    form_data.append('victory_status', victory_status);
    form_data.append('victory_reason', victory_reason);
    form_data.append('given_time', given_time);
    form_data.append('white_time', white_time);
    form_data.append('black_time', black_time);

    let requestReturn = jQuery.ajax({
        url: "../php/capturescores.php",
        dataType: 'text',
        processData: false,
        type: "post",
        cache: false,
        contentType: false,
        data: form_data,
        async : false
    }).responseText;

    console.log(requestReturn);

    alert(JSON.parse(requestReturn).data.message);
}