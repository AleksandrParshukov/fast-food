const MIN_TEAM_COUNT = 4,
	MAX_TEAM_COUNT = 20,
	MIN_STEPS = 40,
	MAX_STEPS = 50,
	BASE_INTERVAL = 2000;

$('document').ready(function () {
	const $randomizer_btn = $('.randomizer-btn');

	let max_count = (count = 0);

	$randomizer_btn.on('click', function () {
		max_count = count = getRandomIntInclusive(MIN_STEPS, MAX_STEPS);

		$('.final').removeClass('final');

		randomize();
	});

	function slide_next() {
		const $prev = $('.prev'),
			$active = $('.active'),
			$next = $('.next'),
			$back = $('.back');

		$prev.removeClass('prev').addClass('back');
		$active.removeClass('active').addClass('prev');
		$next.removeClass('next').addClass('active');
		$back.removeClass('back').addClass('next');
	}

	function randomize() {
		let random_num = getRandomIntInclusive(MIN_TEAM_COUNT, MAX_TEAM_COUNT);

		while (random_num == $('.prev').text() || random_num == $('.active').text() || random_num == $('.next').text()) {
			random_num = getRandomIntInclusive(MIN_TEAM_COUNT, MAX_TEAM_COUNT);
		}

		$('.back').text(random_num);

		const cur_step = max_count - count;

		if (cur_step <= 5) {
			interval = Math.ceil(Math.sqrt((Math.pow(BASE_INTERVAL, 2) / count) * (6 - cur_step)));
		} else if (cur_step <= 30) {
			interval = Math.pow(cur_step - 18, 2) + 150;
		} else {
			interval = Math.ceil(Math.sqrt(Math.pow(BASE_INTERVAL, 2) / count));
		}

		console.log(interval);

		$('.randomizer').css('transition-duration', `${interval * 0.9}ms`);

		slide_next();

		if (count > 1) {
			setTimeout(randomize, interval); // Не используем интервал, ибо равные промежтки получить сложно (см. https://habrahabr.ru/post/138062/)
			count--;
		} else {
			$('.active').addClass('final');
		}
	}

	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
	}
});
