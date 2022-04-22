/* User's Sign in Code */

nxtBtn.onclick = function () {

    const numberFomrate = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    
    const MobileNumber = document.getElementById("Mnumber").value;
    const pwd = document.getElementById("password").value;

    if (MobileNumber == "" && pwd == "") {
        alert("Please Fillup the Form!");
    } 
    else if (MobileNumber == "") {
        alert("Please Enter Mobile Number!");
    } else if (!MobileNumber.match(numberFomrate)) {
        alert("Please Enter Valid Mobile Number!");
    }else if (pwd == "") {
        alert("Please Enter Password!");
    }else {
        
        firebase.database().ref("Users/Registration").orderByChild("PhoneNumber").equalTo(MobileNumber).once('value',function(snapShot){
            if(snapShot.exists()){
                var arr = snapShot.val();
                var arr2 = Object.keys(arr);
                var key = arr2[0];
                sessionStorage.setItem("SID",key);
            }
        }).then(()=>{
            document.getElementById("Mnumber").value = "";
            document.getElementById("password").value = "";
    
            window.location.href="index.html";
    
        });
    }
}
/* User's Sign in Code End */