const countries = [
    ["US"],
    ["MX"],
    ["CA"],
    ["it"],
    ["CN"],
    ["ES"],
    ["JP"]
]

const colors = [
  "#003f5c",
  "#374c80",
  "#7a5195",
  "#bc5090",
  "#ef5675",
  "#ff764a",
  "#ffa600"
]

const promises = countries.map(([code, name]) => {
  const settings = {
  	"async": true,
  	"crossDomain": true,
  	"url": `https://covid-19-data.p.rapidapi.com/country/code?format=json&code=${code}`,
  	"method": "GET",
  	"headers": {
  		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
  		"x-rapidapi-key": "09347ec5e7mshcfff3aa433d0036p13bb4bjsn2c0c289ea281"
  	}
  }

  return $.ajax(settings)
});

$.ajax({
  	"async": true,
  	"crossDomain": true,
  	"url": "https://covid-19-data.p.rapidapi.com/totals?format=json",
  	"method": "GET",
  	"headers": {
  		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
  		"x-rapidapi-key": "09347ec5e7mshcfff3aa433d0036p13bb4bjsn2c0c289ea281"
  	}
  }).done(function (response) {
	const { recovered } = response[0]
  $(".total-count").text(recovered)
});

let recoveredArr = []
let countryNames = []
// TODO: handle errors
$.when(...promises).done((...results) => {
  results.forEach((response, ind) => {
    const {
      country,
      confirmed,
      recovered,
      critical,
      deaths
    } = response[0][0] // FIXME

    recoveredArr.push(recovered)
    countryNames.push(country)
  });

  const largestRecovered = Math.max(...recoveredArr)

  render(largestRecovered)
})

function render(largestRecovered) {
  var chart = c3.generate({
    bindto: ".bar-container",
    data: {
        x: "x",
        columns: [
          ["x", ...countryNames],
          ["Recovered", 0, 0, 0, 0, 0, 0, 0], // will be filled with the data on "map-visible" event
        ],
        type: 'bar',
        color: function (color, d) {
          return colors[d.index]
        }
    },
    axis: {
      rotated: true,
      x: {
          type: 'category',
          tick: {
              multiline: false
          },
          height: 130
      },
      y: {
        max: largestRecovered + (largestRecovered * 0.10),
        min: 0,
        tick: {
          // https://stackoverflow.com/a/9461657/3280654
          format: num => Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(0)) + 'k' : Math.sign(num)*Math.abs(num),
          count: 6,
        },
        padding: {
          top: 0, bottom: 0
        }
      }
    },
    bar: {
        width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
    },
    legend: {
      show: false
    },
    transition: {
      duration: 4000
    },
    padding: {
      left: 65,
      right: 30
    }
  });

  $(window).one("map-visible", () => {
    chart.load({
        x: "x",
        columns: [
          ["x", ...countryNames],
          ["Recovered", ...recoveredArr],
        ],
        type: 'bar',
        color: function (color, d) {
          return colors[d.index]
        }
    });

    $('.total-count').each(function () {
      var $this = $(this);
      jQuery({ Counter: 0 }).animate(
        { Counter: $this.text() },
        {
          duration: 4000,
          easing: 'swing',
          step: function () {
            $this.text(Math.ceil(this.Counter).toLocaleString());
          },
          complete:  () => {
            $(".map-subheader").removeClass("invisible")
              .addClass("animated fadeInLeft delay-1s")
            $(".map h2").addClass("animated tada")
          }
        });
    });
  })
}
