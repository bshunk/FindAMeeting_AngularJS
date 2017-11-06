'use strict';

app.controller('MeetingsController', function($scope, $location, MeetingsFactory) {

  $scope.getMeetings = () => {
    MeetingsFactory.getMeetings($scope.selection.category)
    .then( (meetings) => {
      console.log('category', $scope.selection.category);
      $scope.meetings = meetings.data;
    })
    .catch( (err) => {
      console.log('error', err);
    });
  }

});
