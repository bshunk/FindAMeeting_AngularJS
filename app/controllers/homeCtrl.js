'use strict';

app.controller('HomeCtrl', function($scope, $location, authFactory, MeetingsFactory) {

  $scope.show='false';

  $scope.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  $scope.times = ["7:00 AM", "12:00 PM"];


  $scope.authStatus = () => {
    $scope.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', false);
    const token = localStorage.token;
    if(token){
      authFactory.ensureAuthenticated(token)
        .then((user) => {
          if (user.data.status === 'success')
            $scope.isLoggedIn = true;
          $scope.username = localStorage.username;
          localStorage.setItem('isLoggedIn', true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  $scope.logout = () => {
    authFactory.logout();
    $location.url('/');
  };

  // $scope.authStatus();

  $scope.getMeetings = () => {
    console.log("$scope.selection", $scope.selection);
    MeetingsFactory.getMeetings($scope.selection.day)
    .then( (meetings) => {
      $scope.meetings = meetings.data;
      console.log("$SCOPE.MEETINGS", $scope.meetings);
    })
    .catch( (err) => {
      console.log('error', err);
    });
  }
  
  $scope.selection = {
    day: null,
    time: null, 
    location: null
  }


});
