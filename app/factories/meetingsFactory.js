'use strict';

app.factory('MeetingsFactory', function($q, $http) {
  
  const baseUrl = 'http://localhost:3000';
  
  let getMeetings = (city, day, time, type, group, location) => {
    return $q( (resolve, reject) => {
      $http.get(`${baseURL}/Meetings/${category.id}`)
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
