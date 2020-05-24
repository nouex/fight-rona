 // https://medium.com/front-end-weekly/how-to-fill-your-website-with-lovely-valentines-hearts-d30fe66d58eb

const duration = 3000
const speed = 4
const cursorXOffset = 0
const cursorYOffset = -5
const hearts = []
let before = Date.now()

requestAnimationFrame(frame)

// TODO: authenticate!!!
AWS.config.region = 'us-west-1'
AWS.config.credentials = new AWS.Credentials({
    accessKeyId: "AKIAZDBDBAHOLE5TGKGF",
    secretAccessKey: "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"
});

const bucket = new AWS.S3({
    params: {
        Bucket: "fight-rona",
        Key: "click-count.json"
    }
});

function generateHeart(x, y, xBound, xStart, scale) {
    const heart = $('<img src="/img/heart.svg" class="heart2">')
                    .appendTo("#heart-clicker")
                    .get(0)

    heart.time = duration
    heart.x_ = x
    heart.y_ = y
    heart.bound = xBound
    heart.direction = xStart
    heart.style.left = heart.x_ + "px"
    heart.style.top = heart.y_ + "px"
    heart.scale = scale
    heart.style.transform = "scale(" + scale + "," + scale + ")"

    console.log(heart, heart.x_, heart.y_, x, y)

    hearts.push(heart)

    return heart
}

// TODO: only request animation frame if we hearts.length !== 0
function frame() {
    var current = Date.now()
    var deltaTime = current - before
    before = current
    for (i in hearts) {
        var heart = hearts[i]
        heart.time -= deltaTime
        if (heart.time > 0) {
            heart.y_ -= speed
            heart.style.top = heart.y_ + "px"
            heart.style.left = heart.x_ + heart.direction * heart.bound * Math.sin(heart.y_ * heart.scale / 30) + "px"
        }
        else {
            heart.parentNode.removeChild(heart)
            hearts.splice(i, 1)
        }
    }
    requestAnimationFrame(frame)
}

// Called every time some user clicks the "heart-clicker" button
function NewHeart() {
    generateHeart(
        // (window.event.clientX),
        // (window.event.clientY),
        0,
        0,
        (15 + Math.random() * 20),
        (1 - Math.round(Math.random()) * 2),
        (Math.random() * Math.random() * 0.8 + 0.2)
    )
    $("#num-hearts").text(hearts.length)
}

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
