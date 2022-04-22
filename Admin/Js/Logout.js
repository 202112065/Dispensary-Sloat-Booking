logout.onclick=function(){
    if(sessionStorage.getItem("dataStorage")){
        sessionStorage.clear();
        window.location.href="login.html";
    }else{
        window.location.href="login.html";
    }   
}