'use strict';

app.factory('MeetingsFactory', function($q, $http) {
  
  let getMeetings = (day) => {
    console.log("DAY EQUALS", day);
    return $http.get(`http://localhost:8000/api/v1/meetings/${day}`)
  };

  return { getMeetings };

})
