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

app.getInfo = function () {
      $.ajax({
            url: "https://api.nasa.gov/neo/rest/v1/feed?",
            dataType: "json",
            method: "GET",
            data: {
                  api_key: "o9VA2EVoF5h978FUEN79Xxi69MSw6jwsUZOFR1VD",
                  start_date: "2018-05-16",
                  end_date: "2018-05-16"
                  // usually start and end date recieve the variable "date"
                  // for presentation purposes the date has been set to May 16th.
            
            }
      }).then(res => {
            Object.keys(res.near_earth_objects).forEach(key => {
                  const arrayOfAsteroids = res.near_earth_objects[key];
                  console.log(arrayOfAsteroids);
                  app.displayInfo(arrayOfAsteroids)
            })
      });
};


app.displayInfo = function (asteroids) {
      avgSize = []
      avgDist = []
      avgSpeed = []
      asteroids.forEach((arr) => {

            const astName = arr.name.replace(/\s+/g, "").replace(/\(|\)/g, '');

            let astImage;
            const astSize = arr.estimated_diameter.kilometers.estimated_diameter_max;
            avgSize.push(astSize)

            if (astSize > 1) {
                  console.log('this astSize is huge!')
                  astImage = "large"
            }
            else if (astSize < 1 && astSize > 0.3) {
                  console.log('this astSize is medium')
                  astImage = "medium"
            }
            else {
                  console.log('this astSize is small')
                  astImage = "small"
            }




            const astDistance = arr.close_approach_data[0].miss_distance.kilometers
            const astDisToNumber = parseInt(astDistance);
            avgDist.push(astDisToNumber)

            const astSpeed = arr.close_approach_data[0].relative_velocity.kilometers_per_second
            const astSpeedToNumber = parseInt(astSpeed);
            avgSpeed.push(astSpeedToNumber)

            astSpeedAnimation = ((2 - (astSpeedToNumber * 0.1)) * 4)
            console.log(astSpeedAnimation);
            // this is for a CSS animation


            const astHazardous = arr.is_potentially_hazardous_asteroid

            let hazardous;

            if (astHazardous === true) {
                  hazardous = "hazardousTrue"
            }



            // this section populates the HTML with information
            

            $(".secondInnerRight").append(`
                  <div class="${astName} rightSideInfo">
                        <div class="sidebarImageContainer">
                              <img src="${astImage}.svg" class="${astImage}" alt="a ${astImage} asteroid">
                        </div>
                        <h2>${astName}</h2>
                        <p>Estimated Diameter: ${astSize} km</p>
                        <p>Miss Distance: ${astDistance} km</p>
                        <p class="speedAnimation speed" style="animation-duration: ${astSpeedAnimation}s">Speed: ${astSpeed} km/s</p>
                        <p class="${hazardous} warning">Potentially Hazardous: ${astHazardous}</p>
                        <a class="selectAnother"href="#">Select Another Asteroid</a>
                  </div>`
            )

            const infoOfIndiv = `<li>${astName}</li>`
            $('.asteroidList').append(infoOfIndiv);
      })






      avgSizeAdded = avgSize.reduce((prev, curr) => {
            return prev + curr;
      });
      avgSizeTrue = Math.round((avgSizeAdded / avgSize.length) * 100) / 100;
      $('.averageSize').append(`Diameter: ${avgSizeTrue} km`);

      avgDistAdded = avgDist.reduce((prev, curr) => {
            return prev + curr;
      });
      avgDistTrue = (avgDistAdded / avgDist.length).toFixed(2)
      $('.averageDistance').append(`Miss Distance: ${avgDistTrue} km`);

      avgSpeedAdded = avgSpeed.reduce((prev, curr) => {
            return prev + curr;
      })
      avgSpeedTrue = Math.round((avgSpeedAdded / avgSpeed.length) * 100) / 100;

      avgSpeedAnimation = ((2 - (avgSpeedTrue * 0.1)) * 4)
      console.log(avgSpeedAnimation);
      $('.averageSpeed').append(`Speed: ${avgSpeedTrue} km/s`);
      $('.averageSpeed').css("animation-duration", `${avgSpeedAnimation}s`)

}

// This function listens to click on unordered list and  appends text to the information div
app.events = function () {
      $('ul').on('click', 'li', function () {
            // console.log(e.currentTarget);
            const selectedAst = $(this).text().replace(/\s+/g, "").replace(/\(|\)/g, '');
            console.log(selectedAst);
            $(".leftWrapper").hide();
            $(`div.${selectedAst}`).toggleClass("active");
            $(".rightWrapper").fadeIn(100);
      });
      $(".secondInnerRight").on("click", ".selectAnother", function (e) {
            console.log("hello")
            e.preventDefault()
            $(".rightWrapper").hide();
            $(`div.rightSideInfo`).removeClass("active");
            $(".leftWrapper").fadeIn(100);
      })
}




app.init = function () {
      app.getInfo();
      app.events();
};




$(function () {
      app.init();
});