$(document).ready(function(){
    // Set the initial image to show
    var currentImage = 0;
    $('.slide-img').eq(currentImage).css('z-index', '2');

    // Function to show the next image
    function showNextImage() {
        var previousImage = currentImage;
        currentImage = (currentImage + 1) % $('.slide-img').length;

        // Set z-index for the current and previous images
        $('.slide-img').css('z-index', '1');
        $('.slide-img').eq(currentImage).css('z-index', '2');

        // Fade out the previous image
        $('.slide-img').eq(previousImage).fadeOut(2000);

        // Show the next image after fade-out
        $('.slide-img').eq(currentImage).fadeIn(2000);
    }

    // Call the showNextImage function every 4 seconds
    setInterval(showNextImage, 5000);
});