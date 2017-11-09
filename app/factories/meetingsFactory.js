'use strict';

app.factory('MeetingsFactory', function($q, $http) {
  
  // sends getMeeting to the API to bring back relevant data based on what the user selects for day, time, and city
  let getMeetings = (day, time, city) => {
    return $http.get(`http://localhost:8000/api/v1/meetings/${day}/${time}/${city}`)
  };

  // sends add new meeting to the API which creates new form and saves data from the user as a new meeting in the DB
  let addNewMeeting = (meeting) => {
    return $http.post(`http://localhost:8000/api/v1/meetings/addNewMeeting`, meeting)
  }

  return { getMeetings, addNewMeeting };

});
