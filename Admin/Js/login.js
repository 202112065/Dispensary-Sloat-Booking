signIn.onclick=function(){
    var mNumber =   document.getElementById("Mobilenumber").value;
    var nFormate    = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    var pwd     =   document.getElementById("pwd").value;
    var pwdFormate  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

    if(mNumber=="" && pwd.value == ""){
        alert("Please Fillup the form!");
    }else if(!mNumber.match(nFormate)){
        alert("Please Enter Valid Mobile Number!");
    }else if(!pwd.match(pwdFormate)){
        alert("Please Enter Min 1 uppercase letter,Min 1 lowercase letter, Min 1 special character, Min 1 number, Min 8 characters, Max 30 characters Password:!");
    }else{
        firebase.database().ref("Dr").orderByChild("DrPhoneNumber").equalTo(mNumber).once("value",snap=>{
            if(snap.exists()){
                firebase.database().ref("Dr").orderByChild("DrPassword").equalTo(pwd).once("value",snap=>{
                    if(snap.exists()){
                        var loginCred = '{"data":[{"Store":"'+mNumber+'"},{"Store":"'+pwd+'"}]}';
                        sessionStorage.setItem('dataStorage', loginCred);
                        window.location.href = "SloatBookingList.html";
                    }else{
                        alert("Password is Incorrect!");
                    }
                });
            }else{
                alert("Mobile Number Not Found!");
            }
        });
    }
}