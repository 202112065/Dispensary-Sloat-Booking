firebase.database().ref("SloatBooking").orderByChild("UID").equalTo(sessionStorage.getItem("SID")).once("value", function (snapshot) {
    var content = '';
    var sloatNo = 0;
    snapshot.forEach(function (data) {
        var val = data.val();
            sloatNo++; 
            content += '<tr>';
            content += '<td>' + sloatNo + '</td>';
            content += '<td style="color: green;">&bull; ' + val.Status + '</td>';
            content += '<td>' + val.paName + '</td>';
            content += '<td>' + val.paAge + '</td>';
            content += '<td>' + val.paAddress + '</td>';
            content += '<td>' + val.paCaseStatus + '</td>';
            content += '<td>' + val.paGender + '</td>';
            content += '<td>' + val.paGroup + '</td>';
            content += '<td>' + val.paIssue + '</td>';
            content += '<td>' + val.paPhoneNumber + '</td>';
            content += '<td>' + val.paWeight + '</td>';
            content += '<td>'+val.Prescription+'</td>';
            content += '</tr>';
    });
    if(content==""){
        document.getElementById("show").style.display = "none";
    }else{
        document.getElementById("display").style.display = "none";
        $('#ex-table').append(content);
    }
});
// });
