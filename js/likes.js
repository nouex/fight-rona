// TODO: handle errors for promises
const MS_TIL_UPDATE = 2500
const DURATION = 3000
const SPEED = 3
const HEART_CICKER_WIDTH = 120 // NOTE: must match the css with prop
const hearts = []
let before = Date.now()
let totalLikes = null

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
    totalLikes++

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
