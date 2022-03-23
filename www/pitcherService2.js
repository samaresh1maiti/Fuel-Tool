function sendPdf(){


    var evPar = JSON.parse(localStorage.getItem("report"));

// var evPar = {
//           "html": "<body>Test</body>  ",
//           "body": "E-mail body",
//           "fromName": "From name",
//           "emailSubject": "Email subject",
//           "filename": "Test.pdf",
//           "toAddresses":["testemailhua2016@gmail.com"]
//         };

       // this.storage.set("report", JSON.stringify(evPar));
       alert("email sent from pitcher service!" );

       Ti.App.fireEvent('sendStatsFromHTML',{'event_name':'event_redirect_sendPDFwithLink','event_params':evPar});


       // var sessionID = localStorage.getItem('sessionID');

       // Ti.App.fireEvent('saveFromHTML', {
       //          'variables': evPar.html,
       //          'closeWeb': false,
       //          'id': "htmlToSend" + sessionID
       //      });


        // alert("email sent from pitcher service!" );

        localStorage.removeItem('report');

}

function closeModal(){

    localStorage.removeItem('accountContactEmail');
    localStorage.removeItem('currencyCode');
    localStorage.removeItem("languageCode");
    localStorage.removeItem('fleetName');
    localStorage.removeItem('userEmail');
    
Ti.App.fireEvent('closeOpenModal', {});

}


function saveContent(value){

var tempIdStr = "default_NCO";

if (localStorage.getItem("accountId") != null && localStorage.getItem("accountId") != undefined){
  tempIdStr = localStorage.getItem("accountId");
}


var currentAccountID = localStorage.getItem("accountId");
Ti.App.fireEvent('saveFromHTML', {
'variables': value,
'closeWeb': false,
'id': tempIdStr
});

 // 'id': currentAccountID + "_NCO"

}

function  retrieveContentFromPitcher(){

// var currentAccountID = localStorage.getItem("accountId");

var tempIdForRetrieval = "default_NCO";

if (localStorage.getItem("accountId") != null && localStorage.getItem("accountId") != undefined){
  tempIdForRetrieval = localStorage.getItem("accountId");
}


Ti.App.fireEvent('getFromHTML', {
'id': tempIdForRetrieval,
'successScriptName': 'saveObtainedData',
'failedScriptName': 'getDataFailed'
});
  // 'id': currentAccountID + "_NCO",
}

function saveObtainedData(jsonData){


var parsedJsonData = JSON.parse(jsonData);

console.log(parsedJsonData);

var tempArr = Object.keys(parsedJsonData)


for (var i = 0; i < tempArr.length; i++){
  console.log(parsedJsonData[tempArr[i]]);
  console.log(tempArr[i])

localStorage.setItem(tempArr[i], JSON.stringify(parsedJsonData[tempArr[i]]));
}


}

function getDataFailed(){
}




var passedinFunction;

function triggerCameraService(photoName, func){
Ti.App.fireEvent("getCameraPhoto", {
  "caller": "html5",
  "allowEditing": "true",
  "source":"modal",
  "targetPhoto": photoName
});

passedinFunction = func;
}


function sendPdfWithValue(val){

    var evPar = val;


        

        alert("email sent from pitcher service!" + val.html.length);

       /*Ti.App.fireEvent('sendStatsFromHTML',{'event_name':'event_redirect_sendPDF','event_params':evPar});*/
       Ti.App.fireEvent('sendStatsFromHTML',{'event_name':'event_redirect_sendPDFwithLink','event_params':evPar});

        localStorage.removeItem('report');

}

var count = 1;

function gotPhoto(path) {
  localStorage.setItem("currentImage",path);
  count += 1;

document.getElementById("image1").src = path;
// document.getElementById("picturDesc").value = "";


var now = new Date();
// passedinFunction(path);

path += "?ts="+now.getTime();

photoPath = path;

}



