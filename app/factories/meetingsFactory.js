'use strict';

app.factory('MeetingsFactory', function($q, $http) {
  
  const baseUrl = 'http://localhost:3000';
  
  let getMeetings = (city, day, time, type, group, location) => {
    return $q( (resolve, reject) => {
      $http.get(`${baseURL}/Meetings/${city.id}/${day.id}/${time.id}/${type.id}/${group.id}/${location.id}`)
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
