$(document).ready(function () {
    // Mask input
    var telInp = $('.tel-mask');

    telInp.each(function () {
        $(this).mask("+375 (99) 999-99-99");

        $(this).click(function () {
            if ($(this).val() == '+375 (__) ___-__-__') {
                $(this).setCursorPosition(6);
            }
        });
    });

    // set cursore position
    $.fn.setCursorPosition = function (pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            var range = $(this).get(0).createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };



    // POPUP START
    var popup = $('.popup'),
        popupCloseOver = $('.popup__close-overlay'),
        popupCloseBtn = $('#popup__close-btn'),
        popupHeading = $('#popup__heading'),
        popupSubjShow = $('#popup__form-subj-display'),
        popupSubjSend = $('#form-subject'),
        popupBtn = $('.popup__form-btn'),
        objOpenBtn = $('.objects__item-btn'),
        objHeading = $('.objects__item-heading'),
        wedoOpenBtn = $('.wedo__item-btn'),
        wedoHeading = $('.wedo__item-heading'),
        teamOpenBtn = $('.team__btn');


    popupCloseBtn.click(function () {
        popup.fadeOut(500);
    });
    popupCloseOver.click(function () {
        popup.fadeOut(500);
    });

    objOpenBtn.click(function () {
        popupSubjShow.text('Объект: ' + $(this).siblings(objHeading).text());
        popupSubjSend.val('Объект: ' + $(this).siblings(objHeading).text());
        popupBtn.text($(this).text());
        popup.fadeIn(500);
    });

    wedoOpenBtn.click(function () {

        wedoSubj = $(this).parent($('.wedo__item')).find($('.wedo__item-heading')).text();
        popupSubjShow.text(wedoSubj);
        popupSubjSend.val(wedoSubj);
        popupBtn.text($(this).text());
        popup.fadeIn(500);
    });

    teamOpenBtn.click(function () {

        popupSubjShow.text('Мы перезвоним Вам в ближайшее время');
        popupSubjSend.val('Секция наша команда (Пообщаться с нами)');
        popupBtn.text($(this).text());
        popup.fadeIn(500);
    });


    // INTERVIEW
    // $('.qwe-1').click(function(){
    // 	console.log($(this));
    // console.log($('.qwe-1:checked').val());
    // });
    // console.log($('.qwe-1:checked').val());

    var intBlocks = $('.interview-block'),
        intPrev = $('#interview__back-btn'),
        intNext = $('.interview__next-btn'),
        showCount = 0;

    intNext.click(function () {
        intBlocks.hide();
        showCount++;
        intBlocks.eq(showCount).show();
        if (showCount > 0 && showCount < 5) {
            intPrev.addClass('interview-show-prev-btn');
            intNext.addClass('interview-prev-showing');
        }
        if (showCount == 5) {
            compilIntThanksForm();
        }
    });
    intPrev.click(function () {
        intBlocks.hide();
        showCount--;
        intBlocks.eq(showCount).show();
        if (showCount == 0) {
            intPrev.removeClass('interview-show-prev-btn');
            intNext.removeClass('interview-prev-showing');
        }
    });

    // interview thanks form


    function compilIntThanksForm() {
        var sendQwe1 = $('#qwe-send-1'),
            sendQwe2 = $('#qwe-send-2'),
            sendQwe3 = $('#qwe-send-3'),
            sendQwe4 = $('#qwe-send-4'),
            Qwe1Val = $('.qwe-1:checked').val(),
            Qwe2Val = $('.qwe-2:checked').val(),
            Qwe3Val = $('.qwe-3:checked').val(),
            Qwe4Val = $('.qwe-4:checked').val();

        sendQwe1.val(Qwe1Val);
        sendQwe2.val(Qwe2Val);
        sendQwe3.val(Qwe3Val);
        sendQwe4.val(Qwe4Val);
        $('.header__interview').hide();
        $('.header__interview-thanks-wrap').show();
        var form = $('#interview__tel-form').serialize();
        form.from_js = 1;
        $.post('send.php', form)
            .done(function() {
                gtag('event', 'submit', {
                  value: 'send',
                  event_label: 'send'
                });
                window.yaCounter50716387 && yaCounter50716387.reachGoal('send');
                window.location.replace('http://свой-сервис.бел');
            })
            .fail(function(jqXHR, status, error) {
                gtag('event', 'exception', {
                  description: error
                });
                showCount = 4;
                toQuizStep(5);
                alert(jqXHR.responseText || error);
            });
    }

    function toQuizStep(step) {
        $('.quiz-step').hide();
        if (step > 5) {
            step = quiz_step = 1;
        }
        $('.quiz-step-' + step).show();
        $('#quiz-step-number').text(step);
    }
    var quiz_step = 1;
    $('.interview__next-btn').click(function () {
        quiz_step++;
        toQuizStep(quiz_step);
    });
    $('.interview__back-btn').click(function () {
        quiz_step--;
        toQuizStep(quiz_step);
    });
    var quizFormName = $('#qwe-5-name');
    var quizFormTel = $('#qwe-5-tel');
    var quizFormBtn = $('#interview__fin-btn');
    quizFormName.on('input', function () {
        if (quizFormName.val() && quizFormTel.val())
            quizFormBtn.prop("disabled", false);
        else
            quizFormBtn.prop("disabled", true);
    });
    quizFormTel.on('keydown', function (event) {
        var $this = $(this);
        setTimeout(function () {
            if (/\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}/.test($this.val()))
                quizFormBtn.prop("disabled", false);
            else
                quizFormBtn.prop("disabled", true);
        }, 0);
    });
    $('input:radio').change(function () {
        var target = $('.modal');
        target.animate({
            scrollTop: 1000
        }, 200);
    });

    /*End*/
});









$(window).load(function () {

    // Examples inner sliders

    // $('.examples__inner-slider-big').slick({
    // 	arrows: false,
    // });

    // Inner slider 1
    $('#ex__inner-big-1').slick({
        arrows: false,
        asNavFor: '#ex__inner-small-1',
        touchMove: false,
        responsive: [
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                }
				}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
			]
    });

    $('#ex__inner-small-1').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '#small-1-left',
        nextArrow: '#small-1-right',
        asNavFor: '#ex__inner-big-1',
        touchMove: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 500,
                settings: "unslick"
				}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]

    });


    // Inner slider 2
    $('#ex__inner-big-2').slick({
        arrows: false,
        asNavFor: '#ex__inner-small-2',
        touchMove: false,
        responsive: [
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                }
				}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
			]
    });
    $('#ex__inner-small-2').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '#small-2-left',
        nextArrow: '#small-2-right',
        asNavFor: '#ex__inner-big-2',
        touchMove: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 500,
                settings: "unslick"
				}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]

    });


    // Inner slider 3
    $('#ex__inner-big-3').slick({
        arrows: false,
        asNavFor: '#ex__inner-small-3',
        touchMove: false,
        responsive: [
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                }
				}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
			]
    });
    $('#ex__inner-small-3').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '#small-3-left',
        nextArrow: '#small-3-right',
        asNavFor: '#ex__inner-big-3',
        touchMove: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 500,
                settings: "unslick"
				}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]

    });


    // Inner slider 4
    $('#ex__inner-big-4').slick({
        arrows: false,
        asNavFor: '#ex__inner-small-4',
        touchMove: false,
        responsive: [
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                }
				}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
			]
    });
    $('#ex__inner-small-4').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '#small-4-left',
        nextArrow: '#small-4-right',
        asNavFor: '#ex__inner-big-4',
        touchMove: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 500,
                settings: "unslick"
				}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
    });

    // Inner slider 5
    $('#ex__inner-big-5').slick({
        arrows: false,
        asNavFor: '#ex__inner-small-5',
        touchMove: false,
        responsive: [
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                }
				}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
			]
    });
    $('#ex__inner-small-5').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '#small-5-left',
        nextArrow: '#small-5-right',
        asNavFor: '#ex__inner-big-5',
        touchMove: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 500,
                settings: "unslick"
				}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
    });


    // Examples slider BIG
    $('.examples__slider').slick({
        nextArrow: '.examples__slider-arrow-right',
        prevArrow: '.examples__slider-arrow-left',
        dots: true,
        dotsClass: 'examples__slider-dots',
    });



    // FEED SLIDER
    $('.feed__slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: '.feed__slider-arrow-left',
        nextArrow: '.feed__slider-arrow-right',
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
			},
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
			},
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
			}
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
		]
    });


    $('.feed__slider').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',

        }
    });



    $(".loader_inner").fadeOut();
    $(".loader").delay(400).fadeOut("slow");

});
