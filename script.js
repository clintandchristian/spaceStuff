const app = {};

//date function
const date = function () {
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
console.log(x)

app.getInfo = function () {
      $.ajax({
            url: "https://api.nasa.gov/neo/rest/v1/feed?",
            dataType: "json",
            method: "GET",
            data: {
                  api_key: "o9VA2EVoF5h978FUEN79Xxi69MSw6jwsUZOFR1VD",
                  start_date: x,
                  end_date: x
            }
      }).then(res => {
            // console.log(res);
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
avgSize = []
avgDist = []
avgSpeed = []
app.displayInfo = function (asteroids) {
      asteroids.forEach((arr) => {

            const astName = arr.name.replace(/\s+/g, "").replace(/\(|\)/g, '');
            // console.log(astName);
            // str.replace(/\s+/g, "");

            const astSize = arr.estimated_diameter.kilometers.estimated_diameter_max;
            avgSize.push(astSize)
            // console.log(astSize)

            const astDistance = arr.close_approach_data[0].miss_distance.kilometers
            const astDisToNumber = parseInt(astDistance);
            avgDist.push(astDisToNumber)
            // console.log(astDistance)

            const astSpeed = arr.close_approach_data[0].relative_velocity.kilometers_per_second
            const astSpeedToNumber = parseInt(astSpeed);
            avgSpeed.push(astSpeedToNumber)
            // console.log(astSpeed)

            const astHazardous = arr.is_potentially_hazardous_asteroid
            // console.log(astHazardous)

            $(".rightSide").append(`
                  <div class="${astName} rightSideInfo">
                        <h2>${astName}</h2>
                        <p>Estimated Diameter: ${astSize} km</p>
                        <p>Miss Distance: ${astDistance} km</p>
                        <p>Speed: ${astSpeed} km/s</p>
                        <p>Potentially Hazardous: ${astHazardous}</p>
                  </div>`
            )
            // console.log(astName)

            const infoOfIndiv = `<li>${astName}</li>`
            $('.asteroidList').append(infoOfIndiv);
      })



      avgSizeAdded = avgSize.reduce((prev, curr) => {
            return prev + curr;
      });
      avgSizeTrue = avgSizeAdded / avgSize.length
      // console.log(avgSizeTrue)

      avgDistAdded = avgDist.reduce((prev, curr) => {
            return prev + curr;
      });
      avgDistTrue = avgDistAdded / avgDist.length
      // console.log(avgDistTrue)

      avgSpeedAdded = avgSpeed.reduce((prev, curr) => {
            return prev + curr;
      })
      avgSpeedTrue = avgSpeedAdded / avgSpeed.length
      // console.log(avgSpeedTrue)
}

// This function listens to click on unordered list and 
app.events = function () {
      $('ul').on('click', 'li', function () {
            // console.log(e.currentTarget);
            const selectedAst = $(this).text().replace(/\s+/g, "").replace(/\(|\)/g, '');
            console.log(selectedAst);
            $(`.rightSideInfo`).removeClass("active")
            $(`div.${selectedAst}`).toggleClass("active");
            // $(`div.${selectedAst}`).toggleClass("")

            // app.individualInfo(selectedAst);
      })
}




app.init = function () {
      app.getInfo();
      app.events();
};




$(function () {
      app.init();
});