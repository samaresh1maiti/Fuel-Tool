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
       alert("email sent!" );

       Ti.App.fireEvent('sendStatsFromHTML',{'event_name':'event_redirect_sendPDF','event_params':evPar});
Ti.App.fireEvent('sendStatsFromHTML', {
'event_name': "customPresEvent",
'event_params': 'cpk-3.3.21 Valorization Report Sent',
'event_extra': ''
});

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


function saveContent(value, type){
if(type=="countryDB"){
var tempIdStr = "default_NCO_fuel_countryDB";
//   if (localStorage.getItem("accountId") != null && localStorage.getItem("accountId") != undefined){
//   	tempIdStr = localStorage.getItem("accountId") + "_" + type;
//   }


//   var currentAccountID = localStorage.getItem("accountId");
Ti.App.fireEvent('saveFromHTML', {
'variables': value,
'closeWeb': false,
'id': tempIdStr
});

 // 'id': currentAccountID + "_NCO"
}else{
 var tempIdStrinfo = "default_NCO_fuel_infoDB";
 Ti.App.fireEvent('deleteFromHTML', {
'id': tempIdStrinfo,
});

 Ti.App.fireEvent('saveFromHTML', {
'variables': value,
'closeWeb': false,
'id': tempIdStrinfo
});
}
}

function  retrieveContentFromPitcher(){

// var currentAccountID = localStorage.getItem("accountId");

var tempIdForRetrieval = "default_NCO_fuel_countryDB";


//  if (localStorage.getItem("accountId") != null && localStorage.getItem("accountId") != undefined){
//   	tempIdForRetrieval = localStorage.getItem("accountId")+"_countryDB";
//  }


Ti.App.fireEvent('getFromHTML', {
'id': tempIdForRetrieval,
'successScriptName': 'saveObtainedData',
'failedScriptName': 'getDataFailed'
});

  // 'id': currentAccountID + "_NCO",
}

function saveObtainedDatainfo(jsonData){


var parsedJsonData = JSON.parse(jsonData);

console.log(parsedJsonData);

var tempArr = Object.keys(parsedJsonData);
for (var i = 0; i < tempArr.length; i++){
  console.log(parsedJsonData[tempArr[i]]);
  console.log(tempArr[i])

localStorage.setItem(tempArr[i], parsedJsonData[tempArr[i]]);
}

//   for (var i = 0; i < tempArr.length; i++){
//       console.log(parsedJsonData[tempArr[i]]);
//       console.log(tempArr[i])
// alert("option" + parsedJsonData["name"]);
// localStorage.setItem("customerFullName", parsedJsonData["customerFullName"]);
// localStorage.setItem("company", parsedJsonData["company"]);
// localStorage.setItem("customerPhone", parsedJsonData["customerPhone"]);
// localStorage.setItem("customerMail", parsedJsonData["customerMail"]);
// localStorage.setItem("vehicleConfiguration", parsedJsonData["vehicleTrailerNondrivenMap"]);
// localStorage.setItem("unit_system", parsedJsonData["units"]);
// localStorage.setItem("fleetName", parsedJsonData["fleet_name"]);
// localStorage.setItem("fleetsizetrucks", parsedJsonData["fleetsizetrucks"]);
// localStorage.setItem("fleetsizetrailer", parsedJsonData["fleetsizetrailers"]);
// localStorage.setItem("annualmilespervehicle", parsedJsonData["annualmilespervehicle"]);
// localStorage.setItem("currentpriceoffuel", parsedJsonData["currentpriceoffuel"]);
// localStorage.setItem("annualmpgpervehicle", parsedJsonData["annualmpgpervehicle"]);
// localStorage.setItem("percentageOfFuelSaving", parsedJsonData["percentageOfFuelSaving"]);
// localStorage.setItem("regional", parsedJsonData["regional"]);
// localStorage.setItem("urban", parsedJsonData["urban"]);
// localStorage.setItem("annualaverageloadoftruck", parsedJsonData["annualaverageloadoftruck"]);
// localStorage.setItem("fuelCalculation", parsedJsonData["fuel_calculation_toggle"]);
// localStorage.setItem("mileageCalculation", parsedJsonData["mileage_calculation_toggle"]);




}

function saveObtainedData(jsonData){


var parsedJsonData = JSON.parse(jsonData);

console.log(parsedJsonData);
var tempArr = Object.keys(parsedJsonData);
var tempIdForRetrievalinfo = "default_NCO_fuel_infoDB";
for (var i = 0; i < tempArr.length; i++){
  console.log(parsedJsonData[tempArr[i]]);
  console.log(tempArr[i])

localStorage.setItem(tempArr[i], parsedJsonData[tempArr[i]]);
}
//   for (var i = 0; i < tempArr.length; i++){
//       console.log(parsedJsonData[tempArr[i]]);
//       console.log(tempArr[i])
// alert(parsedJsonData["previouscountry"]);
// localStorage.setItem("previouscountry", parsedJsonData["previouscountry"]);
// localStorage.setItem("previouslanguage", parsedJsonData["previouslanguage"]);
//}
Ti.App.fireEvent('getFromHTML', {
'id': tempIdForRetrievalinfo,
'successScriptName': 'saveObtainedDatainfo',
'failedScriptName': 'getDataFailedinfo'
});

}

function getDataFailed(){
//alert("failed");
}
function getDataFailedinfo(){
// alert("No previous information found");
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


        

        alert("Email sent!");

       Ti.App.fireEvent('sendStatsFromHTML',{'event_name':'event_redirect_sendPDF','event_params':evPar});
       /*Ti.App.fireEvent('sendStatsFromHTML',{'event_name':'event_redirect_sendPDFwithLink','event_params':evPar});*/
Ti.App.fireEvent('sendStatsFromHTML', {
'event_name': "customPresEvent",
'event_params': 'Valorization Report Sent from CPK tool.',
'event_extra': ''
});

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



