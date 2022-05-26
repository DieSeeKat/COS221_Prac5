function media(){

    let file_data = $('#file').prop('files')[0];
    let publisher = document.getElementById("publisher_key").value;
    let name = document.getElementById("name").value;
    let building = document.getElementById("location_building").value;
    let street = document.getElementById("location_street").value;
    let country = document.getElementById("location_country").value;
    let type = document.getElementById("type").value;

    let form_data = new FormData();
    form_data.append('file', file_data);
    form_data.append('name', name);
    form_data.append('publisher', publisher);
    form_data.append('building', building);
    form_data.append('street', street);
    form_data.append('country', country);
    form_data.append('type', type);

    let requestReturn = jQuery.ajax({
        url: "../php/media.php",
        dataType: 'text',
        processData: false,
        type: "post",
        cache: false,
        contentType: false,
        data: form_data,
        async : false
    }).responseText;

    console.log(requestReturn);

}