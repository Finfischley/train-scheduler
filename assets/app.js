$(document).ready(function(){
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjx361VBfHmz25MtH0iecOZgFW7nkGju4",
    authDomain: "train-scheduler-e58f7.firebaseapp.com",
    databaseURL: "https://train-scheduler-e58f7.firebaseio.com",
    projectId: "train-scheduler-e58f7",
    storageBucket: "train-scheduler-e58f7.appspot.com",
    messagingSenderId: "298681796380"
  };
  firebase.initializeApp(config);

 
 var database = firebase.database();

 	var name = "";
	var dest = "";
	var fTime = "";
	var freq = "";

// function click event adds train to schedule
 $("#add-train").on("click", function(event){

 	event.preventDefault();
// objectifies input values
 	name = $("#name-input").val().trim();
 	dest = $("#dest-input").val().trim();
 	fTime = $("#fTime-input").val().trim();
 	freq = $("#freq-input").val().trim();

// adds data to firebase
 	database.ref().push({
 		name : name,
 		dest : dest,
 		fTime : fTime,
 		freq : freq

 	});
// clears values from table after click
 	$("#name-input").val("");
 	$("#dest-input").val("");
 	$("#fTime-input").val("");
 	$("#freq-input").val("");

 });
 // appends values to firebase and DOM
database.ref().on("child_added", function(cSnap) {
	var child = cSnap.val();
	var row = $("<tr>");
	var tFtime = child.fTime;
	var tName = $("<td>" + child.name + "</td>");
	var tDest = $("<td>" + child.dest + "</td>");
	var tFreq = child.freq;
	
	var convertTime = moment(tFtime, "HH:mm");
	var dayDiff = moment().diff(convertTime, "minutes");
	
	if(dayDiff < 0) {
		var trainFormat = tFtime;
		var minutesAway = moment(convertTime).diff(moment(), "minutes");
	}else{
	// var arrivals = Math.floor(dayDiff / tFreq);
		var tDiff = dayDiff % tFreq;
		var minutesAway = tFreq - tDiff;
		var nextArrival = moment().add(minutesAway, "minutes");
		var trainFormat = moment(nextArrival).format("HH:mm");
	}
	
	var tFormat = $("<td>" + trainFormat +"</td>");
	var tMinutesAway = $("<td>" + minutesAway + "</td>");
	var timeFreq = $("<td>" + tFreq + "</td>");
	
	row.append(tName);
	row.append(tDest);
	row.append(timeFreq);
	row.append(tFormat);
	row.append(tMinutesAway);


	$("#choochoo").prepend(row);
	

 	});

})
