let locations = [];
let sites = [];
let session_key =  sessionStorage.getItem('key');
let session_keyID = undefined;

function getKeyID(key){
    let response = JSON.parse(jQuery.ajax({
        url: "../php/knightschess.php",
        type: "POST",
        data: {
            type: "getKeyID",
            key: session_key,
        },
        async : false
    }).responseText);

    console.log(response[0].id);
    session_keyID = parseInt(response[0].id);
}

function add_location(){
    if(isNaN(session_keyID)){
        alert("Please log in or sign up before adding a location")
    }
    else{
        let v_city = document.getElementById('location_city').value;
        let v_state = document.getElementById('location_state').value;
        let v_country = document.getElementById('location_country').value;
        let v_timezone = document.getElementById('location_timezone').value;
        let v_latitude = document.getElementById('location_latitude').value;
        let v_longitude = document.getElementById('location_longitude').value;
        let v_country_code = document.getElementById('location_country_code').value;


        let response = JSON.parse(jQuery.ajax({
            url: "../php/knightschess.php",
            type: "POST",
            data: {
                type: "insert_location",
                city: v_city, 
                state: v_state, 
                country: v_country,
                timezone: v_timezone,
                latitude: v_latitude,
                longitude: v_longitude,
                country_code: v_country_code,
            },
            async : false
        }).responseText);

        console.log(response);
        clear_refill();
    }
}

function add_site(){
    if(isNaN(session_keyID)){
        alert("Please log in or sign up before adding a site")
    }
    else{
        alert("New site has been added");
    }
}

function clear_refill(){
    let locations_list = document.getElementById("locations_list");
    let select = document.getElementById('location_select');
    let sites_list = document.getElementById("sites_list");
    locations_list.innerHTML = "";
    select.innerHTML="";
    sites_list.innerHTML="";
    list_locations();
    list_sites();
}

function removeFromDB(v_city, v_state, v_country, v_timezone, v_latitude, v_longitude, v_country_code){
    let response = JSON.parse(jQuery.ajax({
        url: "../php/knightschess.php",
        type: "POST",
        data: {
            type: "remove_location",
            city: v_city, 
            state: v_state, 
            country: v_country,
            timezone: v_timezone,
            latitude: v_latitude,
            longitude: v_longitude,
            country_code: v_country_code,
        },
        async : false
    }).responseText);

    console.log(response);
    clear_refill();
}

function list_locations(){
    let response = JSON.parse(jQuery.ajax({
        url: "../php/knightschess.php",
        type: "POST",
        data: {
            type: "locations_list",
        },
        async : false
    }).responseText);

    //console.log(response);
    let locations_list = document.getElementById("locations_list");
    let select = document.getElementById('location_select');
    response.forEach(element => {
        locations.push(element);
        let newdiv = document.createElement('div');
        let button = document.createElement('button');
        let paragraph = document.createElement('p');

        paragraph.classList.add("list_paragraph");
		paragraph.innerHTML+=element.city;
        paragraph.innerHTML+=', ';
        paragraph.innerHTML+=element.state;
        paragraph.innerHTML+=', ';
        paragraph.innerHTML+=element.country;
        paragraph.innerHTML+=', ';
        paragraph.innerHTML+=element.timezone;
        paragraph.innerHTML+=', ';
        paragraph.innerHTML+=element.latitude;
        paragraph.innerHTML+=', ';
        paragraph.innerHTML+=element.longitude;
        paragraph.innerHTML+=', ';
        paragraph.innerHTML+=element.country_code;
        button.onclick = () =>{
            removeFromDB(element.city, element.state, element.country, element.timezone, element.latitude, element.longitude, element.country_code);
        };
        button.classList.add("delete_button");
        button.textContent="X";

        newdiv.classList.add("list_container");
        newdiv.appendChild(button);
        newdiv.appendChild(paragraph);
        newdiv.appendChild(document.createElement('br'));
  
        locations_list.appendChild(newdiv);

        let option = document.createElement('option');
        option.value=element.id;
        option.textContent=paragraph.textContent;
        select.appendChild(option);
    });


}

function list_sites(){
    let response =  JSON.parse(jQuery.ajax({
        url: "../php/knightschess.php",
        type: "POST",
        data: {
            type: "sites_list",
        },
        async : false
    }).responseText);

    //console.log(response);

    response.forEach(element => {
        sites.push(element);
        let newdiv = document.createElement('div');
        let button = document.createElement('button');
        button.textContent = i++;
        button.onclick = () =>{
            alert(button.textContent);
        };
        locations_list.appendChild(button);
    });
}

getKeyID(session_key);
list_locations();
list_sites();
console.log(locations);
console.log(sites);