'use strict';

app.controller('ViewMeetingCtrl', function($scope, $location, MeetingsFactory) {

  // on page redirect after adding a new meeting and clicking submit, brings back all meetings related to the day, time and city of newly added meeting
  $scope.getMeetings = () => {
    MeetingsFactory.getMeetings(localStorage.day, localStorage.time, localStorage.city)
    .then( (meetings) => {
      $scope.meetings = meetings.data;
      $scope.meetingDay = meetings.data[0].day
      $scope.meetingTime = meetings.data[0].time
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
