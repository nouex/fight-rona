
/** The array above we may substitute with a jquery/ajax/http
 *  request. It may be easier to use the array... especially
 *  if we are going to do the ChangePosts() function. **/
var some_social_posts = [
    /** Example: **/
    /*{
        // Any image really, it could be the posters profile pic or
        // it could be some image that they put in the post
        'image-url': 'https://www.dummyimage.com/50x50',
        // This can replace 'post-title' if we don't have the title
        'user-name': 'Someone',
        'post-title': 'Some Title', // Optional
        'post-content': 'filler text, filler text, filler text',
        // We can send them to the post if they want
        'post-url': 'https://www.facebook.com/somepost'
    }*/

]


if ( some_social_posts.length > 10 ) {
    /**  **/
    const posts_start = Math.floor( Math.random() * ( some_social_posts.length - 0.1 ) )
    const posts_end = ( posts_start + 10 ) % ( some_social_posts.length - 1 )
}
else {
    /*alert("ERROR: Posts under limit")*/
}


/** This function will be called once the first post element
 *  loads. That way we know that it isn't trying to change
 *  text and images of things that don't exist. **/
function ShowPosts() {
    
}


/** This function will be called ever-so-often to make
 *  some of the posts change. We don't have to include
 *  this, but it would be cool. I was thinking maybe
 *  have it when they change it flips around and then
 *  shows a different post. **/
function ChangePosts() {
    
}


/** This function will allow the user to click the images
 *  on the post and it will enlage it (or so it will seem) **/
function EnlargePic(elem) {
    let mouse = {
        'x': event.clientX,
        'y': event.clientY
    }
    let a = document.getElementById('img-show')
    let b = document.getElementById('partial-color')
    let c = document.getElementById('close-img')
    a.src = elem.src
    a.style.transition = 'all 0s linear'
    a.style.top = (mouse.y-(256/2))+'px'
    a.style.left = (mouse.x-(256/2))+'px'
    a.style.transition = 'all 0s linear'
    a.className = 'large'
    a.style.top = 'calc(50% - 128px)'
    a.style.left = 'calc(50% - 128px)'
    a.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    b.style.width = '100%'
    b.style.height = '100%'
    b.style.background = 'rgba(0,0,0,0.5)'
    // continue here
}

let some_iterator = ''
function LoadListeners() {
    if (document.getElementsByClassName('show-img').length > 0) {
        let _this = document.getElementsByClassName('show-img')
        for (let i = 0; i < _this.length; i++) {
            _this[i].addEventListener('click', () => {EnlargePic(_this[i])})
        }
        clearInterval(some_iterator)
    }
}
some_iterator = setInterval(LoadListeners, 100);