nxtBtn.onclick = function () {

    const AgeFormate = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    const numberFormate = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    const emailFormate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const pwdFormate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    const BgFormate  =  /^(A|B|AB|O)[+-]$/; 

    const Gender = document.getElementById("inlineFormCustomSelectPref").value;
    const FullName = document.getElementById("username").value;
    const Age = document.getElementById("age").value;
    const MobileNumber = document.getElementById("Mnumber").value;
    var email = document.getElementById("email").value;
    const pwd = document.getElementById("password").value;
    var bg = document.getElementById("bg").value;

    if (Gender == "" && FullName == "" && Age == "" && bg == "" && MobileNumber == "" && email == "") {
        alert("Please Fillup the Form!");
    } else if (Gender == "") {
        alert("Please Select Gender!");
    } else if (FullName == "") {
        alert("Please Enter Full Name!");
    } else if (Age == "") {
        alert("Please Enter Age!");
    } else if (!Age.match(AgeFormate)) {
        alert("Please Enter Valid Age!");
    } else if (MobileNumber == "") {
        alert("Please Enter Mobile Number!");
    } else if (!MobileNumber.toString().match(numberFormate)) {
        alert("Please Enter Valid Mobile Number!");
    }else if(bg == ""){
        alert("Please Select Your Blood Group!");
    } else if (!email.match(emailFormate) && email != "") {
        alert("Please Enter Valid Email Address!");
    } else if (pwd == "") {
        alert("Please Enter Password!");
    } else if (!pwd.match(pwdFormate)) {
        alert("Please Enter Password should be At least 1 Uppercase At least 1 Lowercase At least 1 Number,At least 1 Symbol, symbol allowed-->!@#$%^&*_=+- Min 8 chars and Max 12 chars Valid Password!");
    } else {
        if(email == ""){
            email =  "default";
        }
        if(bg == "dknow"){
            bg = "dknow";
        }
        firebase.database().ref("Users/Registration").orderByChild("PhoneNumber").equalTo(MobileNumber).once("value",snap=>{
            if(snap.exists()){
                alert("Mobile Number Already Exist!");
            }else{
                firebase.database().ref("Users/Registration").push({
                    Uage: Age,
                    BloodGroup: bg,
                    Email: email,
                    Password:pwd,
                    FullName: FullName,
                    Gender: Gender,
                    PhoneNumber: MobileNumber
                }).then(() => {
                    alert("Dear,"+ FullName +" Congratulations! You Have Successfully Registration!");
                    window.location.href = "index.html";
                });
            }
        });
    }
}