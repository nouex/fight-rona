const DURATION = 3000
const SPEED = 3
const hearts = []
let before = Date.now()

requestAnimationFrame(frame)

function generateHeart(xBound, xDirection, xStart) {
    const $heart = $('<img src="/img/heart.svg" class="heart2">')
                    .appendTo(".heart2-clicker")

    $heart.data("time", DURATION)
    $heart.data("x", xStart)
    $heart.data("y", 0)
    $heart.data("bound", xBound)
    $heart.data("direction", xDirection)
    $heart.get(0).style.left = xStart + "px"
    $heart.get(0).style.top = "0px"

    hearts.push($heart)

    return $heart
}

// TODO: only request animation frame if we hearts.length !== 0
function frame() {
    const current = Date.now()
    const deltaTime = current - before

    before = current

    for (i in hearts) {
        const $heart = hearts[i]
        const heartNode = $heart.get(0)

        $heart.data("time", $heart.data("time") - deltaTime)
        if ($heart.data("time") > 0) {
            $heart.data("y", $heart.data("y") - SPEED)
            heartNode.style.top = $heart.data("y") + "px"
            heartNode.style.left = $heart.data("x") + $heart.data("direction") * $heart.data("bound") * Math.sin($heart.data("y") * 0.6 / 30) + "px"
        }
        else {
            heartNode.parentNode.removeChild(heartNode)
            hearts.splice(i, 1)
        }
    }

    requestAnimationFrame(frame)
}

const HEART_CICKER_WIDTH = 80
// TODO: move this out to custom.js
$(document).ready(() => {
  $(".heart2-clicker").on("click", () => {
    generateHeart(
        (15 + Math.random() * 30),              // x bound
        (1 - Math.round(Math.random()) * 2),    // x direction
        ~~(Math.random() * HEART_CICKER_WIDTH)  // x start
      )
  })
})


// AWS.config.region = 'us-west-1'
// AWS.config.credentials = new AWS.Credentials({
//     accessKeyId: "AKIAZDBDBAHOLE5TGKGF",
//     secretAccessKey: "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"
// });
//
// const bucket = new AWS.S3({
//     params: {
//         Bucket: "fight-rona",
//         Key: "click-count.json"
//     }
// });

/**
 * The likes feature works like this, the user clicks the likes btn repeatedly
 * and as many times as he wants. We need to tell the server how many clicks to
 * add to the count.
 *
 * Example, if the count was previously 47 and the user clicked 3 times, we
 * tell the server to add 3 to the count.
 *
 * Ideally, we would wait a certain amount of time before updating the server
 * with the extra clicks to add. Why? Because we assume that the user will tap/click
 * on the like button pretty fast and we don't want to send a request for every click.
 * Instead we should wait a certain a mount of time (I say 3 seconds) when the
 * click button is idle -- meanin it hasn't been clicked for at least 3 seconds --
 * and then update the server with the extra counts to add.
 */
async function addToClickCount(extraClicks) {
  // tell the server how many clicks to add to the total click count.
  // do this by sending an http request to this url, http://ec2-54-193-176-112.us-west-1.compute.amazonaws.com:3000/
  // and adding a query by the name of `clicks` with the value being `extraClicks`
  // example url with query http://ec2-54-193-176-112.us-west-1.compute.amazonaws.com:3000/?clicks=7
}

async function getClickCount() {
  let data
  // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/using-promises.html
  try {
    data = await bucket.getObject().promise()
  } catch(err) {
    console.log("Failed to fetch clicks", err)
    return
  }

  const count =  JSON.parse(data.Body.toString("utf-8")).count
  console.log("getClickCount() count =>", count)
  return +count
}
