let item_sizes = [
    'grid-medium',
    'grid-small',
    'grid-small',
    'grid-large',
    'grid-medium',
    'grid-large',
    'grid-medium',
    'grid-small',
    'grid-large',
    'grid-medium',
    'grid-medium',
    'grid-small',
]

var grid_collage_interval = 'somethingtochange'
function SetCollageGrid() {
    if ($('.social-grid-item').length>0) {
        $('.social-grid-item').each(function(index) {
            $(this).addClass(item_sizes[index])
        })
        clearInterval(grid_collage_interval)
    }
}
grid_collage_interval = setInterval(SetCollageGrid, 500);
