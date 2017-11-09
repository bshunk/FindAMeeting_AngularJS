'use strict';

const app = angular.module('FAM', ['ngRoute']);

app.config(function($routeProvider) {

  // App routes
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl'
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'RegisterCtrl'
    })
    .when('/addNewMeeting', {
      templateUrl: 'partials/newMeeting.html',
      controller: 'HomeCtrl'
    })
    .when('/viewMeeting', {
      templateUrl: 'partials/viewMeetings.html',
      controller: 'ViewMeetingCtrl'
    })
    .otherwise('/');

});

app.run(function($rootScope, $location){
  //If the route change failed due to authentication error, redirect them out
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
    if(rejection === 'Not Authenticated'){
      $location.url('/');
    }
  });
});