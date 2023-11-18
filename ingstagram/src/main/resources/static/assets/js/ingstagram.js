$(document).ready(function () {
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
		let idContent = $('.id').val();
		let pwContent = $('.password').val();

		let idContentLength = idContent.length;
		let pwContentLength = pwContent.length;

		if (pwContentLength >= 6 && idContentLength >= 1) {
			$('.submit-btn').addClass('active');

			//로그인 버튼 클릭 시, 실패 텍스트 표시(임시)
			$('.submit-btn').click(function () {
				$('.login-fail-txt').css('display', 'block');
			});
		} else {
			$('.submit-btn').removeClass('active');
		}
	}

	$('.id, .password').keyup(function () {
		updateSubmitButton();
	});


});