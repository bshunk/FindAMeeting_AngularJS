'use strict';

app.controller('HomeCtrl', function($scope, $location, authFactory, MeetingsFactory) {

  // on page load, setting show to false won't list every meeting, and sets day time and city within the selecto to have values
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

  // commenting out authStatus removes authentication from my app since currently it's not needed
  // $scope.authStatus();

  $scope.noMeetings = false;

  // on page load, grabs all meetings from the db and based on user selection, brings back and displays relevant meetings to page
  $scope.getMeetings = () => {
    $scope.daySelected = false;
    $scope.timeSelected = false;
    $scope.citySelected = false;
    console.log('$scope.selection.time', $scope.selection.time);
    if($scope.selection.day !== undefined) {
      $scope.daySelected = true
    };
    if($scope.selection.time !== undefined) {
      $scope.timeSelected = true
    };
    if($scope.selection.city !== undefined) {
      $scope.citySelected = true
    };
    MeetingsFactory.getMeetings($scope.selection.day, $scope.selection.time, $scope.selection.city)
    .then( (meetings) => {
      console.log("Meetings available are", meetings);
      if(meetings.data.length === 0) {
        $scope.noMeetings = true
      } else {
        $scope.noMeetings = false;
        $scope.meetings = meetings.data;
        $scope.meetingDay = meetings.data[0].day
        $scope.meetingTime = meetings.data[0].time
      }
    })
    .catch( (err) => {
      console.log('error', err);
    });
  }

  // initially sets scope.selection to equal null so the page is blank when the screen loads
  $scope.selection = {
    day: null,
    time: null, 
    location: null
  }

  // takes form adding a new meeting, sets the selected day, time and city to local storage, and sends to back end to be stored in DB
  $scope.addNewMeeting = (meeting) => {
    MeetingsFactory.addNewMeeting(meeting)
    .then( (meetings) => {
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

  // when home button is clicked on create new meeting form, user is taken back to home page
  $scope.goHome = () => {
    $location.url('/');
  };

});
