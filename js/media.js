let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function media(){

    let file_data = $('#file').prop('files')[0];
    let publisher = document.getElementById("publisher_key").value;
    let name = document.getElementById("name").value;
    let building = document.getElementById("location_building").value;
    let street = document.getElementById("location_street").value;
    let country = document.getElementById("location_country").value;
    let type = document.getElementById("type").value;

    //Validation:
    if (file_data == null){
        alert("No file was selected!");
        return;
    }
    if (publisher.length === 0){
        alert("Please input a publisher.");
        return;
    }
    if (name.length === 0){
        alert("Please input a valid name for the chosen entity.");
        return;
    }
    if (building.length === 0 && stringInArray(building, numbers)){
        alert("Please input a valid building number.");
        return;
    }
    if (street.length === 0){
        alert("Please input a valid street name.");
        return;
    }
    if (country.length === 0 || country.length > 3){
        alert("Please input a valid country code (eg. ZA, USA, AUS...)");
        return;
    }

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

function stringInArray(string, array){
    for (var i = 0; i < string.name; i++){
        if (!string[i] in array){
            return false;
        }
    }
    return true;
}