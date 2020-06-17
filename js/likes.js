// TODO: handle errors for promises
const MS_TIL_UPDATE = 2500
const DURATION = 3000
const SPEED = 3
const HEART_CICKER_WIDTH = 120 // NOTE: must match the css with prop
const hearts = []
let before = Date.now()
let totalLikes = null
let totalLikesRecorded = null
let timeoutId = null

requestAnimationFrame(frame)

function generateHeart(xBound, xDirection, xStart) {
    const showFavicon = !(totalLikes % 5)
    const imgSrc = showFavicon ? "/img/favicon2-circle.png" : "/img/heart.svg"
    const $heart = $(`<img src="${imgSrc}" class="heart-small">`)
                    .appendTo(".likes-clicker")

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

function createHeart() {
  generateHeart(
      (15 + Math.random() * 30),              // x bound
      (1 - Math.round(Math.random()) * 2),    // x direction
      ~~(Math.random() * HEART_CICKER_WIDTH)  // x start
    )
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

function setTotalLikes(totalLikes) {
  $(".likes-count").text(Number(totalLikes).toLocaleString())
}

function heartOnClick () {
  if(timeoutId !== null) clearTimeout(timeoutId)

  timeoutId = setTimeout(
    () => {
      updateClickCount()
      timeoutId = null
    }, MS_TIL_UPDATE)

  totalLikes += 1
  setTotalLikes(totalLikes)
}

async function updateClickCount() {
  const deltaLikes = totalLikes - totalLikesRecorded
  const res = await axios.get(`https://fightcoronabackend.com?clicks=${deltaLikes}`)
  totalLikesRecorded += deltaLikes
}

async function initClickCount() {
  const res = await axios.get('https://fight-rona.s3-us-west-1.amazonaws.com/click-count.json')
  totalLikes = totalLikesRecorded = res.data.count
  setTotalLikes(totalLikes)
}

// FIXME: figure out how to use async cbs in $(document).on("ready")
initClickCount()
