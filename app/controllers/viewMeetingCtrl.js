'use strict';

app.controller('ViewMeetingCtrl', function($scope, $location, MeetingsFactory) {

  $scope.getMeetings = () => {
    // console.log("localStorage.day is", localStorage.day);
    MeetingsFactory.getMeetings(localStorage.day, localStorage.time, localStorage.city)
    .then( (meetings) => {
      $scope.meetings = meetings.data;
      // console.log("$SCOPE.MEETINGS", $scope.meetings);
    })
    .catch( (err) => {
      console.log('error', err);
    });
  }
  $scope.getMeetings();

  $scope.goHome = () => {
    $location.url('/');
  };

});