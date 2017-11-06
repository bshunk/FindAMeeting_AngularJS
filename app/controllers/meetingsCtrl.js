'use strict';

app.controller('MeetingsController', function($scope, $location, MeetingsFactory) {

  $scope.getMeetings = () => {
    MeetingsFactory.getMeetings($scope.selection.meetings)
    .then( (meetings) => {
      console.log('category', $scope.selection.meetings);
      $scope.meetings = meetings.data;
    })
    .catch( (err) => {
      console.log('error', err);
    });
  }

});
