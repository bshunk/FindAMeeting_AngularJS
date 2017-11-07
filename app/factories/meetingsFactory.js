'use strict';

app.factory('MeetingsFactory', function($q, $http) {
  
  let getMeetings = () => {
    return $q( (resolve, reject) => {
      $http.get(`http://localhost:8000/api/v1/meetings`)
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
