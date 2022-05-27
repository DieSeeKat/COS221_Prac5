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
        let v_area = document.getElementById('location_area').value;
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
                area: v_area,
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
        let v_site_key = document.getElementById('site_site_key').value;
        let select = document.getElementById('location_select');

        let response = JSON.parse(jQuery.ajax({
            url: "../php/knightschess.php",
            type: "POST",
            data: {
                type: "insert_site",
                site_key: v_site_key,
                publisher_id: session_keyID,
                location_id: select.value,
            },
            async : false
        }).responseText);

        console.log(response);
        clear_refill();
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

function removeLocationFromDB(v_locationID){
    let response = JSON.parse(jQuery.ajax({
        url: "../php/knightschess.php",
        type: "POST",
        data: {
            type: "remove_location",
            location_id: v_locationID,
        },
        async : false
    }).responseText);

    console.log(response);
    clear_refill();
}

function removeSiteFromDB(v_siteID){
    let response = JSON.parse(jQuery.ajax({
        url: "../php/knightschess.php",
        type: "POST",
        data: {
            type: "remove_site",
            site_id: v_siteID,
        },
        async : false
    }).responseText);

    console.log(response);
    clear_refill();
}

function getLocation(id){
    let myobj = undefined;
    locations.forEach( (element) => {
        if(element.id == id){
            myobj = element;
        }
    })
    return myobj;
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
        paragraph.innerHTML+=element.area;
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
            removeLocationFromDB(element.id);
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

    let locations_list = document.getElementById("sites_list");
    response.forEach(element => {
        sites.push(element);
        let newdiv = document.createElement('div');
        let button = document.createElement('button');
        let paragraph = document.createElement('p');

        v_location = getLocation(element.location_id);
        console.log(v_location);
        paragraph.classList.add("list_paragraph");
		paragraph.innerHTML+=element.site_key;
        paragraph.innerHTML+=': ';
        paragraph.innerHTML+=v_location.country;
        paragraph.innerHTML+=', ';
        paragraph.innerHTML+=v_location.state;
        paragraph.innerHTML+=', ';
        paragraph.innerHTML+=v_location.city;
        paragraph.innerHTML+=', ';
        paragraph.innerHTML+=v_location.area;

        button.onclick = () =>{
            removeSiteFromDB(element.id);
        };
        button.classList.add("delete_button");
        button.textContent="X";

        newdiv.classList.add("list_container");
        newdiv.appendChild(button);
        newdiv.appendChild(paragraph);
        newdiv.appendChild(document.createElement('br'));
  
        locations_list.appendChild(newdiv);
    });
}

getKeyID(session_key);
list_locations();
list_sites();
// console.log(sites);