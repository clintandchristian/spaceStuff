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
    console.log(res);
        Object.keys(res.near_earth_objects).forEach(key => {
          const arrayOfAsteroids = res.near_earth_objects[key];
          console.log(arrayOfAsteroids);
          app.displayInfo(arrayOfAsteroids)
      //     for(x in arrayOfAsteroids){
      //           console.log(is_potentially_hazardous_asteroid)
      //     }

        })
  });
};

app.displayInfo = function(asteroids) {
      asteroids.forEach((arr) => {
            console.log(arr.name);
            // const $asteroidName = $(`<h3>`).text(arr.name);
            
            console.log("The diameter of this asteroid is " + arr.estimated_diameter.kilometers.estimated_diameter_max + " km");
            Object.keys(arr.close_approach_data).forEach(key => {
                  const closeApproach = arr.close_approach_data[key];
                  console.log(closeApproach.miss_distance.kilometers + " km away")
                  console.log("Was travelling " + closeApproach.relative_velocity.kilometers_per_second + " Km per second")
            })
            console.log("Is it potentially hazardous? " + arr.is_potentially_hazardous_asteroid);

            // console.log(arr.close_approach_data.miss_distance)


            // const $asteroidDistance = $(`<p>`).text(arr.estimated_diameter.feet.estimated_diamater_max);
      })

}



app.init = function() {
  app.getInfo();
  app.displayInfo();
};




$(function() {
  app.init();
});

//   get current date
//   get info on all asteroids to pass by today
