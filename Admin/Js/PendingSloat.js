var retrievedObject = sessionStorage.getItem('dataStorage');
var parsedObject = JSON.parse(retrievedObject);
var StoreNumber = parsedObject.data[0].Store;

firebase.database().ref("SloatBooking").orderByChild("paDrPhoneNumber").equalTo(StoreNumber).once("value", function (snapshot) {
        var content = '';
        var sloatNo = 0;
        snapshot.forEach(function (data) {
            var val = data.val();
            if(val.Status == "Pending"){
                sloatNo++;
                content += '<tr>';
                content += '<td>' + sloatNo + '</td>';
                content += '<td style="color: orange;">&bull;' + val.Status + '</td>';
                content += '<td>' + val.paName + '</td>';
                content += '<td>' + val.paAge + '</td>';
                content += '<td>' + val.paAddress + '</td>';
                content += '<td>' + val.paCaseStatus + '</td>';
                content += '<td>' + val.paGender + '</td>';
                content += '<td>' + val.paGroup + '</td>';
                content += '<td>' + val.paIssue + '</td>';
                content += '<td>' + val.paPhoneNumber + '</td>';
                content += '<td>' + val.paWeight + '</td>';
                content += '<td><a href="Prescription.html?id=' + data.key + '"><button>Presciption</button></a></td>';
                content += '</tr>';
            }
        });
        $('#ex-table').append(content);
    });
// });
