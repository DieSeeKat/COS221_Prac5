let session_key =  sessionStorage.getItem('key');
let session_keyID = undefined;
let players = [];
let max = 0;

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

    session_keyID = parseInt(response[0].id);
}

function clear(){
    console.log("Clearing");
    max = 0;
    players = [];
    document.getElementById("locations_list").innerHTML = "";
    listPlayer();
}

function addPlayer(){
    let _name = document.getElementById("firstname").value;
    let _surname = document.getElementById("lastname").value;
    let _title = document.getElementById("title").value;
    let _country = document.getElementById("country").value;
    let _sex = document.getElementById("sex").value;
    let _rating = document.getElementById("rating").value;

    let response = JSON.parse(jQuery.ajax({
        url: "../php/knightschess.php",
        type: "POST",
        data: {
            type: "player_add",
            pub_id : session_keyID,
            name: _name,
            surname: _surname,
            title: _title,
            country: _country,
            sex: _sex,
            rating: _rating,
            id: max
        },
        async : false
    }).responseText);
    clear();
}

function listPlayer(){
    console.log("LISTING > > > ");
    let list_div = document.getElementById("locations_list");

    let response = JSON.parse(jQuery.ajax({
        url: "../php/knightschess.php",
        type: "POST",
        data: {
            type: "players_list",
        },
        async : false
    }).responseText);


    console.log(response);
    max = 0;
    response.forEach(element => {
        players.push(element);
        if(parseInt(element.id) > max){
            max = parseInt(element.id);
        }
        console.log([max, element.id]);

        let newdiv = document.createElement('div');
        let button = document.createElement('button');
        let paragraph = document.createElement('p');

        paragraph.classList.add("list_paragraph");
        paragraph.innerHTML+=element.title;
        paragraph.innerHTML+=" ";
        paragraph.innerHTML+=element.firstname;
        paragraph.innerHTML+=" ";
        paragraph.innerHTML+=element.lastname;
        paragraph.innerHTML+=", ";
        paragraph.innerHTML+=element.country;

        button.onclick = () =>{
            let response = JSON.parse(jQuery.ajax({
                url: "../php/knightschess.php",
                type: "POST",
                data: {
                    type: "player_remove",
                    id: element.id,
                },
                async : false
            }).responseText);
            clear();
        };
        button.classList.add("delete_button");
        button.textContent="X";

        newdiv.classList.add("list_container");
        newdiv.appendChild(button);
        newdiv.appendChild(paragraph);
        list_div.appendChild(newdiv);

    });
    max++;
    console.log([max]);
    console.log(response);
}


if(!(session_key == null)){
    getKeyID(session_key);
    listPlayer();
    document.getElementById("add_btn").addEventListener("click", ()=>{
        addPlayer();
    });
}
else{
    alert("Please log in before continuing");
    location = "home.html";
}