'use strict';

app.controller('MeetingsController', function($scope, $location, meetingsFactory) {

  $scope.getMeetings = () => {
    MeetingsFactory.getMeetings($scope.selection.city, $scope.selection.day, $scope.selection.time, $scope.selection.type, $scope.selection.group, $scope.selection.location)
    .then( (meetings) => {
      console.log('city', $scope.selection.city);
      $scope.meetingInfo = meetings.data;
    })
    .catch( (err) => {
      console.log('error', err);
    });
  }



})

// $scope.getBible = () => {
//   BibleFactory.getBibles($scope.selection.translation, $scope.selection.book, $scope.selection.chapter)
//     .then( (bibles) => {
//       console.log('translation', $scope.selection.translation);
//       $scope.bibleContents = bibles.data;
//     })
//     .catch( (err) => {
//       console.log('error', err);
//     });
// }


// 'use strict';

// app.controller('HomeCtrl', function($scope, $location, authFactory) {

//   $scope.show='false';

//   $scope.authStatus = () => {
//     $scope.isLoggedIn = false;
//     localStorage.setItem('isLoggedIn', false);
//     const token = localStorage.token;
//     if(token){
//       authFactory.ensureAuthenticated(token)
//         .then((user) => {
//           if (user.data.status === 'success')
//             $scope.isLoggedIn = true;
//           $scope.username = localStorage.username;
//           localStorage.setItem('isLoggedIn', true);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   $scope.logout = () => {
//     authFactory.logout();
//     $location.url('/');
//   };

//   $scope.authStatus();

// });