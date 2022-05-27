function login_form(){
    let login_name = document.getElementById("login_publisher_name").value;
    let login_key = document.getElementById("login_publisher_key").value;

    let requestReturn = jQuery.ajax({
        url: "../php/knightschess.php",
        type: "POST",
        data: {
            type: "login",
            name : login_name,
            key : login_key
        },
        async : false
    }).responseText;

    console.log(requestReturn)
    console.log(JSON.parse(requestReturn));

    if (JSON.parse(requestReturn).status === "success"){
        login(login_key);
    }else {
        alert(JSON.parse(requestReturn).data.message);
    }
}

function login(key){
    sessionStorage.setItem("key", key);
    // window.location.href = "../html/media.html";
}

function signup_form(){
    let signup_name = document.getElementById("signup_publisher_name").value;
    let signup_key = document.getElementById("signup_publisher_key").value;

    let requestReturn = jQuery.ajax({
        url: "../php/knightschess.php",
        type: "POST",
        data: {
            type: "signup",
            name : signup_name,
            key : signup_key
        },
        async : false
    }).responseText;

    console.log(requestReturn);
    console.log(JSON.parse(requestReturn));

    if (JSON.parse(requestReturn).status === "success"){
        alert("Success: User created with name: " + signup_name + " and key: " + signup_key);
        login(signup_key);
    }else {
        alert(JSON.parse(requestReturn).data.message);
    }

}