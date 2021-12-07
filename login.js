
function validate(){
    let uname = document.getElementById("uname").value;
    let passwd = document.getElementById("psw").value;

    if(uname == "admin" && passwd == "admin")
    {
        document.getElementById("login").style.display = "none";
        document.getElementById("orders").style.display = "table";
        updateOrderList();
        console.log("login succesfull");
    }
}

function pageInit(){
    document.getElementById("orders").style.display = "none";
    document.getElementById("pList").style.display = "none";
    //hide ready button(LILI)
    document.getElementById("goPrint").style.display = "none";
}