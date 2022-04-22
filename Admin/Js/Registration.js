nxtBtn.onclick = function () {

    const numberFormate = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    const emailFormate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const pwdFormate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

    const drname    =   document.getElementById("drname").value;
    const drdegree  = document.getElementById("drdegree").value;
    const drusername = document.getElementById("drusername").value;
    const drnumber = document.getElementById("drnumber").value;
    var dremail = document.getElementById("dremail").value;
    const drpassword = document.getElementById("drpassword").value;
   
    if (drname == "" && drdegree == "" && drusername == "" && drnumber == "" && dremail == "" && drpassword == "") {
        alert("Please Fillup the Form!");
    } else if (drusername == "") {
        alert("Please Enter Dr Username!");
    } else if (drname == "") {
        alert("Please Enter Full Name!");
    } else if (drdegree == "") {
        alert("Please Enter dr Degree!");
    } else if (drnumber == "") {
        alert("Please Enter Mobile Number!");
    } else if (!drnumber.toString().match(numberFormate)) {
        alert("Please Enter Valid Mobile Number!");
    }else if(dremail == ""){
        alert("Please Enter Dr's Email!");
    } else if (!dremail.match(emailFormate) && dremail != "") {
        alert("Please Enter Valid Email Address!");
    } else if (drpassword == "") {
        alert("Please Enter Password!");
    } else if (!drpassword.match(pwdFormate)) {
        alert("Please Enter Password should be At least 1 Uppercase At least 1 Lowercase At least 1 Number,At least 1 Symbol, symbol allowed-->!@#$%^&*_=+- Min 8 chars and Max 12 chars Valid Password!");
    } else {
    
        firebase.database().ref("Dr").orderByChild("DrPhoneNumber").equalTo(drnumber).once("value",snap=>{
            if(snap.exists()){
                alert("Mobile Number Already Exist!");
            }else{
                firebase.database().ref("Dr").push({
                    DrUsername: drusername,
                    DrFullName: drname,
                    DrDegree: drdegree,
                    DrPhoneNumber:drnumber,
                    DrEmail: dremail,
                    DrPassword: drpassword
                }).then(() => {
                    alert("Dear Dr,"+ drusername +" Congratulations! You Have Successfully Registration!");
                    var loginCred = '{"data":[{"Store":"'+drnumber+'"},{"Store":"'+drpassword+'"}]}';
                    sessionStorage.setItem('dataStorage', loginCred);
                    window.location.href = "SloatBookingList.html";
                });
            }
        });
    }
}