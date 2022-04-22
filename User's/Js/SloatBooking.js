
firebase.database().ref("Dr").orderByChild("DrUsername").once("value", function (snapshot) {
    var drPhoneNumber;
    snapshot.forEach(function (data) {
        var val = data.val();
        $("<option></option>").attr("value", val.DrUsername).text(val.DrUsername).appendTo('#pDr');
    });
});
nxtBtn.onclick = function () {

    const AgeFormate = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    const numberFormate = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;

    const pName = document.getElementById("pName").value;
    const pRelation = document.getElementById("pRelation").value;
    const pGender = document.getElementById("pGender").value;
    const pCaseStatus = document.getElementById("pCaseStatus").value;
    const pBgroup = document.getElementById("pBgroup").value;
    const pDr = document.getElementById("pDr").value;
    const pWeight = document.getElementById("pWeight").value;
    const pAddress = document.getElementById("pAddress").value;
    const pIssue = document.getElementById("pIssue").value;
    const pAge = document.getElementById("pAge").value;
    const pMobileNumber = document.getElementById("pMnumber").value;
    const allotment =   document.getElementById("sloatB").value;
    
    if (pName == "") {
        alert("Please Fillup The  Form!, Enter Patient Name!");
    } else if (pRelation == "") {
        alert("Please Enter Patient Relation!");
    } else if (pGender == "") {
        alert("Choose Patient Gender!");
    } else if (pCaseStatus == "") {
        alert("Please Choose Case Status!");
    } else if (pBgroup == "") {
        alert("Please Choose Blood Group!");
    } else if (pDr == "") {
        alert("Please Choose Dr!");
    } else if (pWeight == "") {
        alert("Please Enter Weight!");
    } else if (pAddress == "") {
        alert("Please Enter Address");
    } else if (pIssue == "") {
        alert("Please Enter Health issue");
    } else if (pAge == "") {
        alert("Please Enter Age");
    } else if (!pAge.match(AgeFormate)) {
        alert("Please Enter Valid Age!");
    } else if (pMobileNumber == "") {
        alert("Please Enter Mobile Number!");
    } else if (!pMobileNumber.toString().match(numberFormate)) {
        alert("Please Enter Valid Mobile Number!");
    }else if(!allotment){
        alert("Please Choose Allotment Time!");
    } else {
        firebase.database().ref("Dr").orderByChild("DrUsername").equalTo(pDr).once('value',function(s){
            s.forEach(function(dData){
                drPhoneNumber = dData.val().DrPhoneNumber;
            });
        });
        if(allotment!=""){
            firebase.database().ref("SloatBooking").orderByChild("allotment_time").equalTo(allotment).once('value',function(snapGet){
                if(snapGet.exists()){
                    alert("Time Sloat Already Booked!");
                }else{
                    var uid = sessionStorage.getItem("SID");
                    firebase.database().ref("SloatBooking").push({
                        paName: pName,
                        paRelation: pRelation,
                        paGender: pGender,
                        paCaseStatus: pCaseStatus,
                        paGroup: pBgroup,
                        paDr: pDr,
                        paDrPhoneNumber:drPhoneNumber,
                        paPhoneNumber: pMobileNumber,
                        paWeight: pWeight,
                        Prescription: "Pending",
                        Status:"Pending",
                        UID:uid,
                        allotment_time:allotment,
                        paAddress: pAddress,
                        paIssue: pIssue,
                        paAge: pAge
                    }).then(() => {
                        alert("Dear, " + pName + " Congratulations! You Have Successfully Booked Your Sloat!");
                        window.location.href = "index.html";
                    });
                }
            });
        }
    }
}