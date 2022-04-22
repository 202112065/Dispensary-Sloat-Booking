var retrievedObject = sessionStorage.getItem('dataStorage');
var parsedObject = JSON.parse(retrievedObject);

    var mNumber = document.getElementById("mNumber");
    var pwd = document.getElementById("pwd");

    mNumber.value =  parsedObject.data[0].Store;
    pwd.value     =  parsedObject.data[1].Store;

    firebase.database().ref("Dr").orderByChild("DrPhoneNumber").equalTo(parsedObject.data[0].Store).once('value',function(snap){
        snap.forEach(function(ChildData){
            document.getElementById("dgree").value = ChildData.val().DrDegree;
            document.getElementById("dusername").value = ChildData.val().DrUsername;
            document.getElementById("mNumber").value = ChildData.val().DrPhoneNumber;
            document.getElementById("dremail").value = ChildData.val().DrEmail;
            document.getElementById("pwd").value = ChildData.val().DrPassword;
        });
    });
