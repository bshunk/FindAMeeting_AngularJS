'use strict';

app.controller('HomeCtrl', function($scope, $location, authFactory, MeetingsFactory) {

  $scope.show='false';

  $scope.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  $scope.times = ["7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM", "12:00 AM"];

  $scope.city = ["Nashville"];

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
    // console.log("$scope.selection", $scope.selection);
    // console.log("localStorage.day is", localStorage.day);
    $scope.dayInit = localStorage.day;
    $scope.timeInit = localStorage.time;
    $scope.cityInit = localStorage.city;
    MeetingsFactory.getMeetings($scope.selection.day, $scope.selection.time, $scope.selection.city)
    .then( (meetings) => {
      $scope.meetings = meetings.data;
      // console.log("$SCOPE.MEETINGS", $scope.meetings);
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

  $scope.addNewMeeting = (meeting) => {
    // console.log("meeting in controller", meeting);
    MeetingsFactory.addNewMeeting(meeting)
    .then( (meetings) => {
      // console.log("meetings in controller", meetings);
      localStorage.day = $scope.meeting.day;
      localStorage.time = $scope.meeting.time;
      localStorage.city = $scope.meeting.city;
      $location.url('/viewMeeting');
    })
    .catch( (err) => {
      console.log('error', err);
    });
  };

  // create new function that changes the view on the route when add new meeting button hits
  $scope.changeView = (x) => {
    $location.path(x);
  }

});
