$(document).ready(function () {
	var csrfToken = $("meta[name='_csrf']").attr("content");
  var csrfHeader = $("meta[name='_csrf_header']").attr("content");
  
	$('.logo-text').click(function () {
		let hostIndex = location.href.indexOf(location.host) + location.host.length;
		let contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));
		location.href = contextPath + "/"
	});

	// 슬라이드 이미지
	var currentImage = 0;
	$('.slide-img').eq(currentImage).css('z-index', '2');

	function showNextImage() {
		var previousImage = currentImage;
		currentImage = (currentImage + 1) % $('.slide-img').length;

		$('.slide-img').css('z-index', '1');
		$('.slide-img').eq(currentImage).css('z-index', '2');

		$('.slide-img').eq(previousImage).fadeOut(2000);
		$('.slide-img').eq(currentImage).fadeIn(2000);
	}
	setInterval(showNextImage, 5000);

	// id, pw 갯수 유효성 검사
	function updateSubmitButton() {
    let emailContent = $('.email').val();
    let pwContent = $('.password').val();

    let emailContentLength = emailContent.length;
    let pwContentLength = pwContent.length;

    if (pwContentLength >= 6 && emailContentLength >= 1) {
        $('.submit-btn').addClass('active');
    } else {
        $('.submit-btn').removeClass('active');
    }
}

	$('form.login-form').submit(function (event) {
    // id, pw 갯수 유효성 검사
    updateSubmitButton();

    // 조건이 충족되지 않으면 제출을 막음
    if ($('.submit-btn').hasClass('active') === false) {
        event.preventDefault();
    }
	});

	$('.id, .password').keyup(function () {
    	updateSubmitButton();
	});

});