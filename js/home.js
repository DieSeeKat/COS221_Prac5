function login_form(){
    let login_id = document.getElementById("login_publisher_name").value;
    let login_key = document.getElementById("login_publisher_key").value;

    let requestReturn = jQuery.ajax({
        url: "../php/knightschess.php",
        type: "POST",
        data: {
            type: "login",
            id : login_id,
            key : login_key
        },
        async : false
    }).responseText;

    console.log(JSON.parse(requestReturn));

    if (JSON.parse(requestReturn).status === "success"){
        login(login_id);
    }else {
        alert(JSON.parse(requestReturn).data.message);
    }
}

function login(id){
    sessionStorage.setItem("id", id);
    window.location.href = "../html/home.html";
}

function signup_form(){
    let signup_id = document.getElementById("signup_publisher_name").value;
    let signup_key = document.getElementById("signup_publisher_key").value;

    let requestReturn = jQuery.ajax({
        url: "../php/knightschess.php",
        type: "POST",
        data: {
            type: "signup",
            id : signup_id,
            key : signup_key
        },
        async : false
    }).responseText;

    console.log(JSON.parse(requestReturn));

    if (JSON.parse(requestReturn).status === "success"){
        alert("Success: User created with name: " + signup_id + " and key: " + signup_key);
        login(signup_id);
    }else {
        alert(JSON.parse(requestReturn).data.message);
    }

}