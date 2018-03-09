var config = {
  apiKey: "AIzaSyDleiG1JfaWhA0rNbaoONfEZMq_tuzlRyU",
  authDomain: "ucdavis-bc.firebaseapp.com",
  databaseURL: "https://ucdavis-bc.firebaseio.com",
  projectId: "ucdavis-bc",
  storageBucket: "ucdavis-bc.appspot.com",
  messagingSenderId: "521049669933",
};
firebase.initializeApp(config);

let database = firebase.database();

$("#submitButton").on("click", function(event) {
  event.preventDefault();
  let trainName = $("#trainNameInput")
    .val()
    .trim();
  let destination = $("#destinationInput")
    .val()
    .trim();
  let firstTime = $("#timeInput")
    .val()
    .trim();
  let frequency = $("#frequencyInput")
    .val()
    .trim();
  console.log(trainName, destination, firstTime, frequency);
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP,
  });
});

database
  .ref()
  .orderByChild("dateAdded")
  .on("child_added", function(Snapshot) {
    //define a variable for snapshot value
    let sv = Snapshot.val();

    //clears all of the text boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#timeInput").val("");
    $("#frequencyInput").val("");

    var trainName = Snapshot.val().name;
    var destination = Snapshot.val().tdestination;
    var firstTime = Snapshot.val().tFirst;
    var frequency = Snapshot.val().tfreq;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    //console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    //difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //console.log("DIFFERENCE IN TIME: " + diffTime);

    //time apart (remainder)
    var tRemainder = diffTime % frequency;
    //console.log(tRemainder);

    //minute until train
    var tMinutesTillTrain = frequency - tRemainder;
    //console.log("MINUTES TIL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainConverted = moment(nextTrain).format("hh:mm a");

    //parse each trains data into the table
    $("#trainTable > tbody").append(
      "<tr><td>" +
        trainName +
        "</td><td>" +
        destination +
        "</td><td>" +
        "Every " +
        frequency +
        " minutes" +
        "</td><td>" +
        nextTrainConverted +
        "</td><td>" +
        tMinutesTillTrain +
        "</td></tr>"
    );
  });

//when a new item is added (child) do this function
// newScheduleData.on("child_added", function(Snapshot, prevChildKey) {
//   // console.log(Snapshot.val());
//   //store everything into a variable
//   // var trainName = Snapshot.val().name;
//   // var destination = Snapshot.val().tdestination;
//   // var firstTime = Snapshot.val().tFirst;
//   // var frequency = Snapshot.val().tfreq;
//   // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
//   // var currentTime = moment();
//   // // console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
//   // //difference between the times
//   // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//   // // console.log("DIFFERENCE IN TIME: " + diffTime);
//   // //time apart (remainder)
//   // var tRemainder = diffTime % frequency;
//   // // console.log(tRemainder);
//   // //minute until train
//   // var tMinutesTillTrain = frequency - tRemainder;
//   // // console.log("MINUTES TIL TRAIN: " + tMinutesTillTrain);
//   // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//   // var nextTrainConverted = moment(nextTrain).format("hh:mm a");
//   // //parse each trains data into the table
//   // $("#trainTable > tbody").append(
//   //   "<tr><td>" +
//   //     trainName +
//   //     "</td><td>" +
//   //     destination +
//   //     "</td><td>" +
//   //     "Every " +
//   //     frequency +
//   //     " minutes" +
//   //     "</td><td>" +
//   //     nextTrainConverted +
//   //     "</td><td>" +
//   //     tMinutesTillTrain +
//   //     "</td></tr>"
//   // );
// });
