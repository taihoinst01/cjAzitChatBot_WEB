// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 68
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

$(function () {
    //mobile margin 초기화
    $('.wc-message-group-content').css({ 'margin-top': 0 });

    $('#wrapper').css({ 'height': ($(document).height()) + 'px' });
    $('.wc-chatview-panel').css({ 'height': ($(document).height()) + 'px' });
    $(window).resize(function () {
        //$('#wrapper').css({ 'height': ($(document).height()) + 'px' });
        $('.wc-carousel').css({ 'width': ($(document).width()-74) + 'px' });
        $('.tooltip').tooltip('show');
    });

    $('.wc-shellinput').blur();

    //tooltip
    $('.wc-menu').attr('data-toggle', 'tooltip').attr('data-placement','top').attr('title','바로가기')
    .attr('data-template','<div class="tooltip tool2" role="tooltip"><div class="tooltip-arrow arrow2"></div><div class="tooltip-inner"></div></div>').tooltip('show');

    //챗봇창 상단 생성
    $(".wc-header > span").add(
        "<span class='chatTitle'></span>"
    ).appendTo(".wc-header");

    //챗봇 MENU BTN
    $(".wc-console > div").add(
        "<div class='menuBox off'>" +
            "<ul type='none'>" +
            "<li class='menuSelectBtn'>음악장학사업</li>" +
            "<li class='menuSelectBtn'>시나리오</li>" +
            "<li class='menuSelectBtn'>단편영화</li>" +
            "<li class='menuSelectBtn'>뮤지션지원</li>" +
            "<li class='menuSelectBtn'>공간지원</li>" +
            "<li class='menuSelectBtn'>뮤지컬지원</li>" +
            "<li class='menuSelectBtn'>공연장</li>" +
            "</ul>" +
        "</div > ").appendTo(".wc-console");

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    //챗봇 menu 선택
    $('.menuSelectBtn').click(function () {
        var v = $(this).html();
        if(v == '음악장학사업') {v = '대중음악장학사업';}
        else if(v == '시나리오') {v = '스토리업 - 시나리오 작가 지원';}
        else if(v == '단편영화') {v = '스토리업 - 단편영화 제작 지원';}
        else if(v == '뮤지션지원') {v = '튠업';}
        else if(v == '공간지원') {v = '스테이지업 - 공간지원';}
        else if(v == '뮤지컬지원') {v = '스테이지업 - 뮤지컬';}
        else if(v == '공연장') {v = '공연장 문의';}
        $('div.wc-console').addClass('has-text');
        $('input[type="text"].wc-shellinput').attr('value', v).val(v);
        $('label.wc-send').trigger('click');
        $('input[type="text"].wc-shellinput').attr('value', '').val('').focus();
        $('.wc-console').removeClass('has-text').animate({ 'bottom': 10 + 'px' }, 'fast');
        $('.menuBox').removeClass('on').addClass('off').css({ 'display': 'none' });
        $('.menuIcon_active').removeClass('menuIcon_active').addClass('menuIcon');
        $('.wc-message-groups').css({ 'bottom': 60 + 'px' }).scrollTop($('.wc-message-group-content')[0].scrollHeight);
    });
    //menu 이외의 다른 영역 선택시 닫힘
    $('.wc-message-groups, .wc-textbox').click(function () {
        if ($('.menuBox').hasClass('on')) {
            $('.wc-console').animate({ 'bottom': 10 + 'px' }, 'fast');
            $('.menuBox').removeClass('on').addClass('off').css({ 'display': 'none' });
            $('.menuIcon_active').removeClass('menuIcon_active').addClass('menuIcon');
            $('.wc-message-groups').css({ 'bottom': 60 + 'px' }).scrollTop($('.wc-message-group-content')[0].scrollHeight);
        }
    });

    //챗봇 MENU 버튼 동작
    $('.wc-menu > div').click(function () {
        $('.wc-shellinput').attr('value', '').attr('placeholder', '궁금한 것을 물어보세요!').val('').focus();

        if ($(this).hasClass('menuIcon')) {     //MENU 열기
            $('.wc-menu').tooltip('destroy'); //메뉴 선택시 tooptip삭제
            $('.wc-shellinput').blur();
            $('.menuIcon').removeClass('menuIcon').addClass('menuIcon_active');
            $('.wc-console').animate({ 'bottom': 115 + 'px' }, 'fast');
            $('.menuBox').removeClass('off').addClass('on').css({ 'display': 'block' });
            $('.wc-message-groups').css({ 'bottom': 165 + 'px' });
        } else if ($(this).hasClass('menuIcon_active')) {   //MENU 닫기
            $('.menuIcon_active').removeClass('menuIcon_active').addClass('menuIcon');
            $('.wc-console').animate({ 'bottom': 10 + 'px' }, 'fast');
            $('.menuBox').removeClass('on').addClass('off').css({ 'display': 'none' });
            $('.wc-message-groups').css({ 'bottom': 60 + 'px' });
        }
        $('.wc-message-groups').scrollTop($('.wc-message-group-content')[0].scrollHeight);
    });

    //SEND버튼
    $('.wc-shellinput').keyup(function () {
        $('.wc-send').tooltip('destroy'); //key입력시 tooptip삭제
        $('.menuBox').removeClass('on').addClass('off').css({ 'display': 'none' });
        $('.menuIcon_active').removeClass('menuIcon_active').addClass('menuIcon');
        $('.wc-console').animate({ 'bottom': 10 + 'px' }, 'fast');
        $('.wc-message-groups').css({ 'bottom': 60 + 'px' }).scrollTop($('.wc-message-group-content')[0].scrollHeight);
    });
    $('.wc-shellinput').click(function () {
        $('.wc-shellinput').css({'ime-mode':'active'}); //IE만 지원
        $('.wc-message-groups').scrollTop($('.wc-message-group-content')[0].scrollHeight);
    });
    $('.wc-send > div').click(function () {
        //$('.wc-shellinput').attr('placeholder', '궁금한 것을 물어보세요!');
        $('.menuBox').removeClass('on').addClass('off').css({ 'display': 'none' });
        $('.wc-console').animate({ 'bottom': 10 + 'px' }, 'fast');
        $('.wc-textbox').animate({ 'left': 30 + 'px' }, 'fast');
        $('.wc-message-groups').scrollTop($('.wc-message-group-content')[0].scrollHeight);
    });

    //////////////////////////////////////////////////////////////////////////////////////////////////////

});