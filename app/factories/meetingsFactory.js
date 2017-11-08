'use strict';

app.factory('MeetingsFactory', function($q, $http) {
  
  let getMeetings = (day, time, city) => {
    console.log("DAY EQUALS", day);
    console.log("TIME EQUALS", time);
    console.log("CITY EQUALS", city);
    return $http.get(`http://localhost:8000/api/v1/meetings/${day}/${time}/${city}`)
  };

  let addNewMeeting = (meeting) => {
    console.log(meeting);
    return $http.post(`http://localhost:8000/api/v1/meetings/addNewMeeting`, meeting)
  }

  return { getMeetings, addNewMeeting };

})
