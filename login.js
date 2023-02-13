/* login check with sha1 encryption*/ 
/*
function validate() {
    let uname = document.getElementById("uname").value;
    let passwd = CryptoJS.SHA1(document.getElementById("psw").value);
    console.log(passwd);
    passwd = CryptoJS.enc.Hex.stringify(passwd);
    console.log(passwd);
    if (uname == "admin" && passwd.localeCompare("d033e22ae348aeb5660fc2140aec35850c4da997") == 0) {
        document.getElementById("login").style.display = "none";
        document.getElementById("orders").style.display = "table";
        displayOrderList();
    }
    else{
        console.log("login failed");
    }
}
*/

/* Obfuscated validate() function - Siyuan Xu */
function _0x548c(){const _0x3dc8bb=['22456413KldlRr','localeCompare','orders','login\x20failed','table','style','getElementById','enc','464300dMqPTu','psw','none','value','admin','log','6198948nnmyVo','display','2096210FUulRx','2449270IbeSZQ','86128ialyEg','2958870QuyNdQ','Hex'];_0x548c=function(){return _0x3dc8bb;};return _0x548c();}(function(_0x5020f0,_0x265dee){const _0x24fce9=_0x2954,_0x3a663a=_0x5020f0();while(!![]){try{const _0x455624=parseInt(_0x24fce9(0x76))/0x1+parseInt(_0x24fce9(0x74))/0x2+parseInt(_0x24fce9(0x77))/0x3+parseInt(_0x24fce9(0x6c))/0x4+parseInt(_0x24fce9(0x75))/0x5+parseInt(_0x24fce9(0x72))/0x6+-parseInt(_0x24fce9(0x79))/0x7;if(_0x455624===_0x265dee)break;else _0x3a663a['push'](_0x3a663a['shift']());}catch(_0x23086a){_0x3a663a['push'](_0x3a663a['shift']());}}}(_0x548c,0x86a7f));function _0x2954(_0x527590,_0x2a7196){const _0x548cd3=_0x548c();return _0x2954=function(_0x2954cd,_0x489d86){_0x2954cd=_0x2954cd-0x67;let _0x415a95=_0x548cd3[_0x2954cd];return _0x415a95;},_0x2954(_0x527590,_0x2a7196);}function validate(){const _0x4fef74=_0x2954;let _0xcd31a7=document[_0x4fef74(0x6a)]('uname')[_0x4fef74(0x6f)],_0x208579=CryptoJS['SHA1'](document['getElementById'](_0x4fef74(0x6d))[_0x4fef74(0x6f)]);console['log'](_0x208579),_0x208579=CryptoJS[_0x4fef74(0x6b)][_0x4fef74(0x78)]['stringify'](_0x208579),console[_0x4fef74(0x71)](_0x208579),_0xcd31a7==_0x4fef74(0x70)&&_0x208579[_0x4fef74(0x7a)]('d033e22ae348aeb5660fc2140aec35850c4da997')==0x0?(document[_0x4fef74(0x6a)]('login')[_0x4fef74(0x69)][_0x4fef74(0x73)]=_0x4fef74(0x6e),document[_0x4fef74(0x6a)](_0x4fef74(0x7b))[_0x4fef74(0x69)][_0x4fef74(0x73)]=_0x4fef74(0x68),displayOrderList()):console[_0x4fef74(0x71)](_0x4fef74(0x67));}

function pageInit(){
    document.getElementById("orders").style.display = "none";
    document.getElementById("products").style.display = "none";
    document.getElementById("receipt").style.display = "none";
}
