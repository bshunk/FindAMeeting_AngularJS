'use strict';

app.controller('HomeCtrl', function($scope, $location, authFactory, MeetingsFactory) {

  $scope.show='false';

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

  $scope.authStatus();

  $scope.getMeetings = () => {
    console.log('getMeetings', getMeetings);
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