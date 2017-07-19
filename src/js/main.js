var app = app || {};
app.main = {
    projectsSlider: function () {
        var $projectsSlider = $('.projects-slider');
        if ($projectsSlider.length > 0) {
            $projectsSlider.slick({
                speed: 500,
                slidesToShow: 2,
                slidesToScroll: 1,
                prevArrow: '<div class="slide-arrow prev"></div>',
                nextArrow: '<div class="slide-arrow next"></div>',
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }
    },
    facesTabs: function () {
        if ($('.faces-tabs').length > 0) {
            var $tabLink = $('.faces-tabs__link'),
                $tabContent = $('.faces-tabs-content');
            $tabLink.on('click', function () {
                var $this = $(this),
                    tabNum = $this.attr('data-tab');
                if (!$this.hasClass('active')) {
                    $tabLink.removeClass('active');
                    $this.addClass('active');
                    $tabContent.hide().removeClass('active');
                    $tabContent.filter('[data-tab="'+ tabNum +'"]').fadeIn(600).addClass('active');
                    $('.faces-slider').slick('setPosition');
                }
            })
        }
    },
    facesSlider: function () {
        var $facesSlider = $('.faces-slider');
        if ($facesSlider.length > 0) {
            $facesSlider.slick({
                speed: 500,
                slidesToShow: 5,
                slidesToScroll: 1,
                prevArrow: '<div class="slide-arrow prev"></div>',
                nextArrow: '<div class="slide-arrow next"></div>',
                responsive: [
                    {
                        breakpoint: 1081,
                        settings: {
                            slidesToShow: 4
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 481,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            })
        }
    },
    fancyBox: function () {
        if(jQuery().fancybox) {
            $('[data-fancybox]').fancybox({

            });
        }
    },
    membersFilter: function () {
        var $membersFilter = $('.members-filters');
        if ($membersFilter.length) {
            var flag = true;
            $('.members-filters__toggle').on('click', function () {
                var $this = $(this);
                $this.closest('.members-filters').find('.members-filters__main').slideToggle();
                if (flag) {
                    $('.jsFiltersText').html('скрыть поля фильтра');
                } else {
                    $('.jsFiltersText').html('открываются поля фильтра');
                }
                flag = !flag;
            });
        }
    },
    profileCollapsible: function () {
        if ($(window).width() < 992) {
            if ($('.mobile-collapsible').length) {
                $('.mobile-collapsible > .profile__section-title').on('click', function () {
                    var $this = $(this);
                    $this.toggleClass('active');
                    $this.closest('.mobile-collapsible').find('.profile__text').slideToggle();
                })
            }
        }
    },
    addNewsPhotos: function () {
        var $uploaderPhotoMain = $('#uploader-main-photo');
        if ($uploaderPhotoMain.length > 0) {
            $uploaderPhotoMain.fineUploader({
                autoUpload: false,
                template: 'qq-template-main-photo',
                request: {
                    // endpoint: '/server/uploads'
                },
                validation: {
                    allowedExtensions: ['jpeg', 'jpg', 'gif', 'png']
                }
            });
        }

        var $uploaderPhotoSecondary = $('#uploader-secondary-photo');
        if ($uploaderPhotoSecondary.length > 0) {
            $uploaderPhotoSecondary.fineUploader({
                autoUpload: false,
                template: 'qq-template-secondary-photos',
                request: {
                    // endpoint: '/server/uploads'
                },
                validation: {
                    allowedExtensions: ['jpeg', 'jpg', 'gif', 'png']
                }
            });
        }
    },
    calendar: function () {
        if(jQuery().datepicker) {
            var activeDays = ['2017-07-14', '2017-07-15', '2017-07-17', '2017-07-20', '2017-07-21'];



            $('#calendar').datepicker({
                firstDay: 1,
                beforeShow: function () {
                    addDayToTitle();
                },
                afterShow: function () {
                    addDayToTitle();
                },
                onSelect: function (e) {
                    console.log(e);
                },
                beforeShowDay: function(date){
                    var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                    return [ activeDays.indexOf(string) !== -1 ];
                }

            });

            function addDayToTitle() {
                var $calendar = $('#calendar'),
                    date = $calendar.datepicker('getDate'),
                    day = date.getDate(),
                    months = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь" ],
                    m = $calendar.find('.ui-datepicker-month').text(),
                    y = parseFloat($calendar.find('.ui-datepicker-year').text()),
                    month = (m ? m : months[date.getMonth()]),
                    year =  (y ? y : date.getFullYear());

                if ($calendar.find('.ui-datepicker-title-clone').length > 0) {
                    $calendar.find('.ui-datepicker-title-clone').remove();
                }
                $calendar.find('.ui-datepicker-title').append('' +
                    '<span class="ui-datepicker-title-clone">' +
                        '<span class="ui-datepicker-day-clone">'+ day +'</span>' +
                        '<span class="ui-datepicker-month-year-clone">' +
                            '<span class="ui-datepicker-month-clone">'+ month +'</span>' +
                            '<span class="ui-datepicker-year-clone">'+ year +'</span>' +
                        '</span>' +
                    '</span>' +
                    '');
            }

        }
    },
    mobileMenu: function () {
        $('.jsMobileMenuToggle').on('click', function () {
            var $this = $(this),
                $menu = $('.mobile-menu');
            $this.toggleClass('active');
            $menu.slideToggle();
        })
    },
    uploadCropImage: function () {
        var $photoUploader = $('#profile-photo-uploader');
        if ($photoUploader.length) {
            var options = {
                thumbBox: '.thumbBox',
                spinner: '.spinner',
                imgSrc: '../img/photo-uploader-cap.jpg'
            }
            var cropper = $('#profile-photo-uploader').cropbox(options);
            $('#photo').on('change', function(){
                $('#btnCrop').css('opacity', 1);
                var reader = new FileReader();
                reader.onload = function(e) {
                    options.imgSrc = e.target.result;
                    cropper = $('#profile-photo-uploader').cropbox(options);
                };
                reader.readAsDataURL(this.files[0]);
                this.files = [];
            });
            $('#btnCrop').on('click', function(){
                var img = cropper.getDataURL();
                console.log('с фоткой можно делать все что нужно');
                // тут с фоткой можно делать все что нужно
            });

        }


        var $photoUploaderMob = $('#profile-photo-uploader-mob');
        if ($photoUploaderMob.length) {
            var options = {
                thumbBox: '.thumbBox',
                spinner: '.spinner',
                imgSrc: '../img/photo-uploader-cap-mob.jpg'
            }
            var cropper = $('#profile-photo-uploader-mob').cropbox(options);
            $('#photo-mob').on('change', function(){
                $('#btnCrop-mob').css('opacity', 1);
                var reader = new FileReader();
                reader.onload = function(e) {
                    options.imgSrc = e.target.result;
                    cropper = $('#profile-photo-uploader-mob').cropbox(options);
                };
                reader.readAsDataURL(this.files[0]);
                this.files = [];
            });
            $('#btnCrop-mob').on('click', function(){
                var img = cropper.getDataURL();
                console.log('с фоткой можно делать все что нужно');
                // тут с фоткой можно делать все что нужно
            });

        }
    }
};
app.init = function () {
    app.main.projectsSlider();
    app.main.facesTabs();
    app.main.facesSlider();
    app.main.fancyBox();
    app.main.membersFilter();
    app.main.profileCollapsible();
    app.main.addNewsPhotos();
    app.main.calendar();
    app.main.mobileMenu();
    app.main.uploadCropImage();
};

$(document).ready(function () {
    app.init();

    $(window).on('resize', function () {
        app.main.profileCollapsible();
    });


    /* TODO: remove pageWidget!!! */
    function pageWidget(pages) {
        var widgetWrap = $('<div class="widget_wrap"><ul class="widget_list"></ul></div>');
        widgetWrap.prependTo("body");
        for (var i = 0; i < pages.length; i++) {
            $('<li class="widget_item"><a class="widget_link" href="' + pages[i][0] + '.html' + '">' + pages[i][1] + '</a></li>').appendTo('.widget_list');
        }
        var widgetStilization = $('<style>body {position:relative} .widget_wrap{position:absolute;top:0;left:0;z-index:9999;padding:5px 10px;background:#222;border-bottom-right-radius:10px;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}.widget_wrap:after{content:" ";position:absolute;top:0;left:100%;width:24px;height:24px;background:#222 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) no-repeat 50% 50%;cursor:pointer}.widget_wrap:hover{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{color:#fff;text-decoration:none;font-size:15px;}.widget_link:hover{text-decoration:underline} </style>');
        widgetStilization.prependTo(".widget_wrap");
    }
    pageWidget([
        ['index', 'Главная'],
        ['projects', 'Проекты'],
        ['project', 'Один проект'],
        ['events-list', 'Список мероприятий'],
        ['event', 'Мероприятие'],
        ['news', 'Новости'],
        ['news-item', 'Новость детально'],
        ['news-item-member', 'Новость участника'],
        ['members', 'Список участников'],
        ['speakers', 'Спикеры и организаторы'],
        ['membership-card', 'Карточка участника'],
        ['profile', 'Личный кабинет'],
        ['profile-orders', 'ЛК - история заказов'],
        ['profile-edit', 'ЛК - изменение данных'],
        ['profile-news', 'ЛК - мои новости'],
        ['profile-add-news', 'ЛК - добавление новости'],
        ['profile-password-recovery', 'ЛК - восстановление пароля'],
        ['profile-login', 'ЛК - вход'],
        ['profile-registration', 'ЛК - регистрация'],
        ['cart', 'Корзина'],
        ['cart-with-sale', 'Корзина со скидкой'],
        ['contacts', 'Контакты'],
        ['become-member', 'Стань членом клуба']
    ]);

});