function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
    if (support == true) {
        document.querySelector("body").classList.add("webp");
    }
});

let error = 0;

$(document).ready(function () {
    // sticky header
    window.addEventListener("scroll", function () {
        const header = document.querySelector("header");
        header.classList.toggle("sticky", window.scrollY > 0);
    });

    // count file
    let fields = document.querySelectorAll(".field__file");
    Array.prototype.forEach.call(fields, function (input) {
        let label = input.nextElementSibling,
            labelVal = label.querySelector(".field__file-fake").innerText;

        input.addEventListener("change", function (e) {
            let countFiles = "";
            if (this.files && this.files.length >= 1)
                countFiles = this.files.length;

            if (countFiles)
                label.querySelector(".field__file-fake").innerText =
                    "Выбрано файлов: " + countFiles;
            else label.querySelector(".field__file-fake").innerText = labelVal;
        });
    });

    // validator
    const a = $("#form").validate({
        rules: {
            name: {
                required: true,
            },
        },
        messages: {
            name: {
                required: "Поле 'ФИО' обязательно к заполнению",
                minlength: "Введите не менее 2-х символов в поле 'Имя'",
            },
            email: {
                required: "Поле 'Email' обязательно к заполнению",
                email: "Необходим формат адреса email",
            },
            text: "Поле 'Сообщение' обязательно к заполнению",
        },
    });

    // send form
    const form = document.getElementById("form");
    form.addEventListener("submit", function (event) {
        if (!a.valid()) {
            return false;
        }
        const preloader = document.querySelector(".preloader");
        preloader.classList.remove("loaded");
        console.log("Отправка запроса");
        event.preventDefault
            ? event.preventDefault()
            : (event.returnValue = false);

        var req = new XMLHttpRequest();
        req.open("POST", "send.php", true);
        req.onload = function () {
            if (req.status >= 200 && req.status < 400) {
                const json = JSON.parse(this.response); // Ебанный internet explorer 11

                if (json.result == "success") {
                    preloader.classList.add("loaded_hiding", "loaded");
                    showSucces();
                    // alert("Сообщение отправлено");
                    document.querySelector(".field__file-fake").textContent =
                        "Файл не выбран";
                    form.reset();
                } else {
                    alert("Ошибка. Сообщение не отправлено");
                }
            } else {
                showError();
            }
        };

        // Если не удалось отправить запрос. Стоит блок на хостинге
        req.onerror = function () {
            alert("Ошибка отправки запроса");
        };
        req.send(new FormData(event.target));
    });

    // show modal form
    function showSucces() {
        const inputName = document.querySelector('input[name="name"]');
        const modal = document.querySelector(".form__overlay");
        const close = document.querySelector(".form__modal-close");
        modal.querySelector(".form__modal-name").textContent = inputName.value;
        modal.classList.add("active");
        close.addEventListener("click", function () {
            modal.classList.remove("active");
        });
    }

    function showError() {
        const inputName = document.querySelector('input[name="name"]');
        const modal = document.querySelector(".form__overlay");
        const close = document.querySelector(".form__modal-close");
        const text = document.querySelector(".form__modal-text");
        text.textContent = "Сообщение не отправлено!!!";
        modal.querySelector(".form__modal-name").textContent = inputName.value;
        modal.classList.add("active");
        close.addEventListener("click", function () {
            modal.classList.remove("active");
        });
    }

    // burger
    $(".main-nav__burger").click(function (e) {
        $(".main-nav, .main-nav__burger").toggleClass("active");
        $("body").toggleClass("lock");
    });

    $(".main-nav__link").click(function (e) {
        if ($(".main-nav__burger").hasClass("active")) {
            $(".main-nav, .main-nav__burger").removeClass("active");
            $("body").removeClass("lock");
        }
    });

    // slider
    $(".slider").slick({
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    dots: true,
                },
            },
        ],
    });

    // WOW plugin
    new WOW({
        /*    offset: 10 */
    }).init();

    // scroll
    $('a[href^="#"]').on("click", function (event) {
        event.preventDefault();

        var sc = $(this).attr("href"),
            dn = $(sc).offset().top;

        $("html, body").animate({ scrollTop: dn }, 700);
    });

    $(window)
        .scroll(function () {
            var windscroll = $(window).scrollTop();
            if (windscroll >= 100) {
                $("nav").addClass("fixed");
                $("section").each(function (i) {
                    if ($(this).position().top <= windscroll + 50) {
                        $("nav a.active").removeClass("active");
                        $("nav a").eq(i).addClass("active");
                    }
                });
            } else {
                $("nav").removeClass("fixed");
                $("nav a.active").removeClass("active");
                $("nav a:first").addClass("active");
            }
        })
        .scroll();
});
