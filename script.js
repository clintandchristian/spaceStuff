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

app.getInfo = function() {
  $.ajax({
    url: "https://api.nasa.gov/neo/rest/v1/feed?",
    dataType: "json",
    method: "GET",
    data: {
      api_key: "o9VA2EVoF5h978FUEN79Xxi69MSw6jwsUZOFR1VD",
      start_date: "2018-05-13",
      end_date: "2018-05-13"
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
app.displayInfo = function (asteroids) {
      avgSize = []
      avgDist = []
      avgSpeed = []
      asteroids.forEach((arr) => {

            const astName = arr.name.replace(/\s+/g, "").replace(/\(|\)/g, '');
            // console.log(astName);
            // str.replace(/\s+/g, "");

            
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
            // console.log(astDistance)

            const astSpeed = arr.close_approach_data[0].relative_velocity.kilometers_per_second
            const astSpeedToNumber = parseInt(astSpeed);
            avgSpeed.push(astSpeedToNumber)
            // console.log(astSpeed)

            const astHazardous = arr.is_potentially_hazardous_asteroid
            // console.log(astHazardous)

            let hazardous;
            
            if (astHazardous === true) {
                  hazardous = "hazardousTrue"
            }
            else {

            }

            $(".secondInnerRight").append(`
                  <div class="${astName} rightSideInfo">
                        <div class="sidebarImageContainer">
                              <img src="${astImage}.svg" class="${astImage}" alt="a ${astImage} asteroid">
                        </div>
                        <h2>${astName}</h2>
                        <p>Estimated Diameter: ${astSize} km</p>
                        <p>Miss Distance: ${astDistance} km</p>
                        <p>Speed: ${astSpeed} km/s</p>
                        <p class=${hazardous}>Potentially Hazardous: ${astHazardous}</p>
                        <a class="selectAnother"href="#">Select Another Asteroid</a>
                  </div>`
            )
            // console.log(astName)

            const infoOfIndiv = `<li>${astName}</li>`
            $('.asteroidList').append(infoOfIndiv);
      })

      // asteroids.filter((arr) => {
      //       const astHazardousTrue = arr.is_potentially_hazardous_asteroid
      //       console.log(astHazardousTrue);
      //       if (astHazardousTrue === true) {
      //             $('.hazardous').addClass('hazardousTrue');
      //       } 
      //       else {
      //             $('.hazardous').removeClass('hazardousTrue');
      //       }
      // })
      // console.log(asteroids.is_potentially_hazardous_asteroid);
      // if (asteroids.is_potentially_hazardous_asteroid === true) {
      //       $('.hazardous').addClass('hazardousTrue');
      // }
      // else {
      //       $('.hazardous').removeClass('hazardousTrue');
      // }





      avgSizeAdded = avgSize.reduce((prev, curr) => {
            return prev + curr;
      });
      avgSizeTrue = Math.round((avgSizeAdded / avgSize.length) * 100) / 100
      $('.averageSize').append(`Average Diameter: ${avgSizeTrue} km`);

      avgDistAdded = avgDist.reduce((prev, curr) => {
            return prev + curr;
      });
      avgDistTrue = Math.round((avgDistAdded / avgDist.length) * 100) / 100
      $('.averageDistance').append(`Average Miss Distance: ${avgDistTrue} km away from Earth`);

      avgSpeedAdded = avgSpeed.reduce((prev, curr) => {
            return prev + curr;
      })
      avgSpeedTrue = Math.round((avgSpeedAdded / avgSpeed.length) * 100) / 100
      $('.averageSpeed').append(`Average Speed: ${avgSpeedTrue} km/s`);
}

// This function listens to click on unordered list and 
app.events = function() {
  $('ul').on('click', 'li', function() {
    // console.log(e.currentTarget);
    const selectedAst = $(this).text().replace(/\s+/g, "").replace(/\(|\)/g, '');
      console.log(selectedAst);
    $(`.rightSideInfo`).removeClass("active")
    $(".leftWrapper").hide()
    $(`div.${selectedAst}`).toggleClass("active");
    $(".rightWrapper").fadeOut()
    $(".rightWrapper").fadeIn(100)

    // $(`div.${selectedAst}`).toggleClass("")

    // app.individualInfo(selectedAst);
  })
  $('.selectAnother').on('click', function() {
        $('.rightWrapper').fadeIn()
        $('.leftWrapper').fadeIn(100)
  })
}




app.init = function () {
      app.getInfo();
      app.events();
};




$(function () {
      app.init();
});
