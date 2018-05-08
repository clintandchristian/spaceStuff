const app = {};

//date function
const date = function() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  return today;
};

const x = date();

app.getInfo = function() {
  $.ajax({
    url: "https://api.nasa.gov/neo/rest/v1/feed?",
    dataType: "json",
    method: "GET",
    data: {
      api_key: "o9VA2EVoF5h978FUEN79Xxi69MSw6jwsUZOFR1VD",
      // start_date: '2000-01-01'
      end_date: date()
    }
  }).then(res => {
        let near = res
        Object.keys(near.near_earth_objects).forEach(key => {
              console.log(near.near_earth_objects[key]);
        })
        console.log(near)
  });
};



app.init = function() {
  app.getInfo();
};




$(function() {
  app.init();
});

//   get current date
//   get info on all asteroids to pass by today
