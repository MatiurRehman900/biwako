jQuery(function($){
    // スクロール
    $('a[href^="#"]').on('click',function() {
        let speed = 800;
        let href = $(this).attr("href");
        let target = $(href == "#" || href == "" ? 'html' : href);
        let position = target.offset().top - $('.header__top').outerHeight(true);
        $('body,html').animate({
        scrollTop: position
        }, speed, 'swing');
        
        return false;
    });

    // トップへ戻るボタン
    let topBtn = $("#js-scrollTop");
    let topBtnPosition = $(".top-btn__wrap");
    topBtn.hide();
    // トップボタン位置調整
    $(window).scroll(function(){
        var windowHeight = window.innerHeight;
        var overviewStaticTop = $("footer").offset().top;
        var overviewScrollTop = overviewStaticTop - $(window).scrollTop();
        var visibleArea = windowHeight - overviewScrollTop;

        scrollHeight = $(document).height();
        scrollPosition = windowHeight + $(window).scrollTop();
        footHeight = $("footer").outerHeight(true);
        halfBtnHeight = topBtn.innerHeight() / 2;
        if (scrollHeight - scrollPosition <= footHeight - halfBtnHeight) {
            if (window.matchMedia('(min-width: 1024px)').matches) {
            topBtnPosition.css({
            bottom: visibleArea - halfBtnHeight,
            });
        } else {
            topBtnPosition.css({
                bottom: visibleArea,
            });
        }
        } else {
            topBtnPosition.css({
            bottom: "",
            });
        };

        if($(this).scrollTop() > 700){
            topBtn.fadeIn();
        }else{
            topBtn.fadeOut();
        };
    });
    //　トップボタン機能 
    topBtn.on('click',function(){
        $('html,body').animate({scrollTop:0},500);
    });

    // acd
    $('.acd-btn').on('click',function() {
        $(this).parent().next('.acd-body').slideToggle();
        $(this).toggleClass('open');
    });

    // バーガーメニュー
    $('#js-hamburger-btn').on('click', function () {
        $('#js-drawer-menu').slideToggle();
        $(this).toggleClass('active');
        if ($(this).hasClass("active")) {
            scrollpos = window.pageYOffset;
            $('html').css('overflow-x','unset');
            $('body').addClass('js-fixed').css('top', -scrollpos);
            
        } else {
            $('html').css('overflow-x','hidden');
            $('body').removeClass('js-fixed').css('top', 'unset');
            window.scrollTo(0, scrollpos);
        }
    })

    $('.drawer__link,.child-menu__link').on('click', function () {
        $('#js-hamburger-btn').removeClass('active');
        $('#js-drawer-menu').slideUp();
        $('html').css('overflow-x','hidden');
        $('body').removeClass('js-fixed').css('top', 'unset');
    })

    // 同ページリンクの際遷移しない
    $('a[href]').on('click', function () {
        var headerHeight = $('.header__inner').outerHeight(true);
        // 現在地
        var currentUrl = location.href;
        var currentUrlHash = location.hash;
        var currentLocation = currentUrl.replace(currentUrlHash,'');
        // ターゲット
        var targetUrl = $(this).prop('href');
        var urlHash = targetUrl.substring(targetUrl.indexOf('#'));
        var url = targetUrl.replace(urlHash,'');
        console.log(targetUrl.indexOf('#'));

        if( currentLocation == url || currentLocation == url+'/' || currentLocation == targetUrl || currentLocation == targetUrl + '/'){
            if (targetUrl.indexOf('#') == -1) {
                $('html,body').animate({scrollTop:0},500);
            }else{
                var position = $(urlHash).offset().top - headerHeight;
                $('html, body').animate({ scrollTop: position }, 800,'swing');
            }
            return false;
        }
    })

    // LSページホバーアニメーション
    var balloon = $('.js-balloon-item');
    var tooltip = $('.js-tooltip-item');
    var orangebox = $('.js-orange-box');

    balloon.hover(
        function () {
            $(this).addClass('current');
            var tooltipIndex = $(this).map( function () {
                return $(this).data('tooltip');
            }).toArray();
            var orangeboxIndex = $(this).map( function () {
                return $(this).data('orangebox');
            }).toArray();
            $.each(tooltipIndex, function(){
                tooltip.eq(this).addClass('active');
            });
            $.each(orangeboxIndex, function(){
                orangebox.eq(this).addClass('active');
            });
        },
        function() {
            $(this).removeClass('current');
            tooltip.removeClass('active');
            orangebox.removeClass('active');
        }
    );

    // VEHICLE画像差し替え
    var linkImg = $('.js-change-img');
    var changeImg = $('#js-change-img');
    linkImg.hover(
        function () {
            var changeSrc = $(this).data('src');
            var replaceSrc = changeImg.attr('src').replace('cont02_img01.svg','map/'+ changeSrc +'.svg');
            $(this).addClass('is-hover');
            changeImg.attr('src',replaceSrc);
        }, function () {
            $(this).removeClass('is-hover');
            var originalSrc = changeImg.data('original');
            changeImg.attr('src',originalSrc);
        }
    );

    $(window).on('resize', function () {
        if (window.matchMedia("(min-width: 1024px)").matches) {
        location.reload(false);
        }
    });
});
jQuery(window).on('load', function() {
    let headerHeight = jQuery('.header__top').outerHeight();
    let urlHash = location.hash;
    if (urlHash) {
        let position = jQuery(urlHash).offset().top - headerHeight;
    jQuery('html, body').animate({ scrollTop: position }, 0);
    }
});

// var mySwiper = new Swiper('.swiper', {
//     speed: 1000,
//     slidesPerView: 1,
//     centeredSlides: true,
//     spaceBetween: 0,
//     loop: true,
// });
var pageSwiper = new Swiper('.page-slider', {
    speed: 1000,
    spaceBetween: 40,
    navigation: {
        nextEl: ".page-slider__btn--next",
        prevEl: ".page-slider__btn--prev"
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 65,
        }
    }
});

    // フォント
(function(d) {
    var config = {
        kitId: 'yki1emo',
        scriptTimeout: 3000,
        async: true
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);

    function scrollView(){
// scrollReveal
var fade = {
    duration : 2000,
}

var toTop = {
    duration: 1600, 
    distance: '50%'
};
var toTopDelay1 = {
    duration: 1600, 
    distance: '50%',
    delay: 250,
};
var toTopDelay2 = {
    duration: 1600, 
    distance: '50%',
    delay: 500,
};

var toRight = {
    duration: 2000,
    origin: 'left',
    distance: '50%',
}

var toLeft ={
    duration: 2000,
    origin: 'right',
    distance: '50%',
}
ScrollReveal().reveal('.js-scrollreveal-fadein', fade);
ScrollReveal().reveal('.js-scrollreveal-top', toTop);
ScrollReveal().reveal('.js-scrollreveal-top1', toTopDelay1);
ScrollReveal().reveal('.js-scrollreveal-top2', toTopDelay2);
ScrollReveal().reveal('.js-scrollreveal-right', toRight);
ScrollReveal().reveal('.js-scrollreveal-left', toLeft);

// page
if (window.matchMedia( "(max-width: 767px)" ).matches){
    ScrollReveal().reveal('.js-scrollreveal-col1', toRight);
    ScrollReveal().reveal('.js-scrollreveal-col2', toLeft);
    ScrollReveal().reveal('.js-scrollreveal-col3', toRight);
    ScrollReveal().reveal('.js-scrollreveal-col4', toLeft);
} else {
    ScrollReveal().reveal('.js-scrollreveal-col1', toTop);
    toTop['delay'] = 250 ;
    ScrollReveal().reveal('.js-scrollreveal-col2', toTop);
    toTop['delay'] = 500 ;
    ScrollReveal().reveal('.js-scrollreveal-col3', toTop);
    toTop['delay'] = 750 ;
    ScrollReveal().reveal('.js-scrollreveal-col4', toTop);
}

if (window.matchMedia( "(max-width: 1024px)" ).matches){
    ScrollReveal().reveal('.js-scrollreveal-3col-1-1,.js-scrollreveal-3col-1-3,.js-scrollreveal-3col-2-2,.js-scrollreveal-3col-last', toRight);
        ScrollReveal().reveal('.js-scrollreveal-3col-1-2,.js-scrollreveal-3col-2-1,.js-scrollreveal-3col-2-3', toLeft);
} else {
        ScrollReveal().reveal('.js-scrollreveal-3col-1-1,.js-scrollreveal-3col-2-1', toLeft);
        toLeft['delay'] = 250 ;
        ScrollReveal().reveal('.js-scrollreveal-3col-1-2,.js-scrollreveal-3col-2-2', toLeft);
        toLeft['delay'] = 500 ;
        ScrollReveal().reveal('.js-scrollreveal-3col-1-3,.js-scrollreveal-3col-2-3', toLeft);
        toLeft['delay'] = 250 ;
        ScrollReveal().reveal('.js-scrollreveal-3col-last', toLeft);
};
if (window.matchMedia( "(max-width: 1024px)" ).matches){
    ScrollReveal().reveal('.js-scrollreveal-2col-last', toRight);
} else {
    ScrollReveal().reveal('.js-scrollreveal-2col-last', toLeft);
}
    }
    scrollView();
