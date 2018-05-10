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
      end_date: '2018-05-14'
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
            console.log(arr);
            // console.log(arr.name);
            // const $asteroidName = $(`<h3>`).text(arr.name);
            const astName = arr.name;
            // const $astNameDisplay = $(`.name`).text(astName);
            console.log(astName);

            const infoOfIndiv = `<li>${astName}</li>`
            $('.asteroidList').append(infoOfIndiv);
            
            const astSize = arr.estimated_diameter.kilometers.estimated_diameter_max;
            // console.log("The diameter of this asteroid is " + astSize + " Km")

            // console.log(clickedListItem.size);

            // console.log(arr.close_approach_data);
            const astSpeed = arr.close_approach_data[0].relative_velocity.kilometers_per_second; 
            console.log(astSpeed);

            // Object.keys(arr.close_approach_data).forEach(key => {
            //       const closeApproach = arr.close_approach_data[key];

            //       const astSpeed = closeApproach.relative_velocity.kilometers_per_second;
                  
            //       const astDistance = closeApproach.miss_distance.kilometers;
            // })
            const astHazardous = arr.is_potentially_hazardous_asteroid;





            // console.log(arr.close_approach_data.miss_distance)


            // const $asteroidDistance = $(`<p>`).text(arr.estimated_diameter.feet.estimated_diamater_max);
      })

}

// This function listens to click on unordered list and 
app.events = function() {
  $('ul').on('click', 'li', function() {
    // console.log(e.currentTarget);
    const selectedAst = $(this).text();
    console.log(selectedAst);
    // app.individualInfo(selectedAst);
  })
}

app.individualInfo = function(e) {
  // console.log(e);
}


app.init = function() {
  app.getInfo();
  app.events();
};




$(function() {
  app.init();
});

//   get current date
//   get info on all asteroids to pass by today
