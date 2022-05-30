let players = [];
let session_key =  sessionStorage.getItem('key');
let session_keyID = undefined;


function getKeyID(v_key){
    let response = JSON.parse(jQuery.ajax({
        url: "../php/knightschess.php",
        type: "POST",
        data: {
            type: "getKeyID",
            key: v_key,
        },
        async : false
    }).responseText);

    console.log(response[0].id);
    session_keyID = parseInt(response[0].id);
}

function isDupPlayer(vName, vLast, vTit, vCountry, vSex, vRat){
    let to_return = false;
    locations.forEach((element)=>{
        if(element.firstname == vName)
            if(element.lastname == vLast)
                if(element.title == vTit)
                    if(element.country == vCountry)
                        if(element.sex == vSex)
                            if(element.rating == vRat)
                                        to_return = true;
    })
    return to_return;
}


function add_Player(){
    if(isNaN(session_keyID)){
        alert("Please log in or sign up before adding a site")
    }
    else{
        let select = document.getElementById('player_select');
     
        if(isDuplicateSite(v_site_key, select.value)){
            alert("Duplicate player.");
            return;
        }
        let response = JSON.parse(jQuery.ajax({
            url: "../php/knightschess.php",
            type: "POST",
            data: {
                type: "insert_player",
                player_key: v_player_key,
                publisher_id: session_keyID,
                player_id: select.value,
            },
            async : false
        }).responseText);

        console.log(response);
        clear_refill();
    }

}

function clear_refill(){
    let player_list = document.getElementById("player_list");
    let select = document.getElementById('player_select');
    player_list.innerHTML = "";
    select.innerHTML=""
    players = [];
    list_players();
}

function removePlayer(v_playerID){
    let response = JSON.parse(jQuery.ajax({
        url: "../php/knightschess.php",
        type: "POST",
        data: {
            type: "remove_player",
            player_id: v_playerID,
        },
        async : false
    }).responseText);

    console.log(response);
    clear_refill();
}

function getPlayer(id){
    let myobj = undefined;
    locations.forEach( (element) => {
        if(element.id == id){
            myobj = element;
        }
    })
    return myobj;
}


function list_players(){
    let response = JSON.parse(jQuery.ajax({
        url: "../php/knightschess.php",
        type: "POST",
        data: {
            type: "players_list",
        },
        async : false
    }).responseText);

    //console.log(response);
    let locations_list = document.getElementById("players_list");
    let select = document.getElementById('players_select');
    response.forEach(element => {
        locations.push(element);
        let newdiv = document.createElement('div');
        let button = document.createElement('button');
        let paragraph = document.createElement('p');

        paragraph.classList.add("list_paragraph");
		paragraph.innerHTML+=element.firstname;
        paragraph.innerHTML+=', ';
        paragraph.innerHTML+=element.lastname;
        paragraph.innerHTML+=', ';
        paragraph.innerHTML+=element.title;
        paragraph.innerHTML+=', ';
        paragraph.innerHTML+=element.country;
        paragraph.innerHTML+=', ';
        paragraph.innerHTML+=element.sex;
        paragraph.innerHTML+=', ';
        paragraph.innerHTML+=element.rating;
        button.onclick = () =>{
            removePlayer(element.id);
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

getKeyID(session_key);
list_players();