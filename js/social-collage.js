
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
var returnX = 0
var returnY = 0
function EnlargePic(elem) {
    var a = document.getElementById('img-show')
    var b = document.getElementById('partial-color')
    a.src = elem.src
    a.style.transition = 'all 0.01s linear'
    a.style.top = (event.clientY-(512/2))+'px'
    a.style.left = (event.clientX-(512/2))+'px'
    returnX = (event.clientX-(512/2))
    returnY = (event.clientY-(512/2))
    a.style.transition = 'all 0.01s linear'
    setTimeout(() => {
        a.style.transition = 'all 0.5s ease-in-out'
        a.style.opacity = '1'
        a.style.top = 'calc(50%)'
        a.style.left = 'calc(50%)'
        a.style.transform = 'scale(1) translate(-50%, -50%)'
        b.style.width = '100%'
        b.style.height = '100%'
        b.style.background = 'rgba(0,0,0,0.7)'
    }, 30);
}
function ClosePic() {
    var a = document.getElementById('img-show')
    var b = document.getElementById('partial-color')
    a.style.transition = 'all 0.5s ease-in-out'
    a.style.transform = 'scale(0) translate(0%, 0%)'
    a.style.left = returnX+'px'
    a.style.top = returnY+'px'
    setTimeout(() => {
        b.style.background = 'transparent'
        setTimeout(() => {
            b.style.width = '0%'
            b.style.height = '0%'
        }, 500);
    }, 500);
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