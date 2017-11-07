'use strict';

app.factory('MeetingsFactory', function($q, $http) {
  
  let getMeetings = () => {
    return $q( (resolve, reject) => {
      $http.get(`getAllMeetings`)
      .then( (data) => {
        resolve(data);
      })
      .catch( (err) => {
        reject(err);
      });
    });
  };

  return { getMeetings };
})
