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


// sticky header
window.addEventListener('scroll', function () {
    const header = document.querySelector('header')
    header.classList.toggle('sticky', window.scrollY > 0)
})





$(document).ready(function () {
    $('#form').validate({
        rules: {
            name: {
                required: true,
            }
        },
        messages: {
            name: {
                required: "Поле 'ФИО' обязательно к заполнению",
                minlength: "Введите не менее 2-х символов в поле 'Имя'"
            },
            email: {
                required: "Поле 'Email' обязательно к заполнению",
                email: "Необходим формат адреса email"
            },
            text: "Поле 'Сообщение' обязательно к заполнению"
        }
    })








    const form = document.getElementById('form')
    form.addEventListener('submit', function (event) {
        console.log("Отправка запроса");
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        var req = new XMLHttpRequest();
        req.open('POST', 'send.php', true);
        req.onload = function () {
            if (req.status >= 200 && req.status < 400) {
                const json = JSON.parse(this.response); // Ебанный internet explorer 11
                console.log(json);

                // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
                if (json.result == "success") {
                    setTimeout(showSucces, 1000)
                    // alert("Сообщение отправлено");
                    form.reset()

                } else {
                    // Если произошла ошибка
                    alert("Ошибка. Сообщение не отправлено");
                }
                // Если не удалось связаться с php файлом
            } else {
                // alert("Ошибка сервера. Номер: " + req.status);

            }
        };

        // Если не удалось отправить запрос. Стоит блок на хостинге
        req.onerror = function () {
            alert("Ошибка отправки запроса");
        };
        req.send(new FormData(event.target));
    })

    /*     function showSucces() {
            const modal = document.querySelector('.form__modal')
            const close = document.querySelector('.form__modal-close')
            modal.classList.add('active')

            close.addEventListener('click', function () {
                modal.classList.remove('active')
            })
        } */

    function showSucces() {
        const succes = document.createElement('p')
        succes.classList.add('form__success')
        succes.textContent = 'Сообщение отправлено'
        form.appendChild(succes)
        setTimeout(function () {
            succes.remove()
        }, 1000)

    }


    $('.main-nav__burger').click(function (e) {
        $('.main-nav, .main-nav__burger').toggleClass('active')
        $('body').toggleClass('lock')
    })

    $('.slider').slick({
        responsive: [{
            breakpoint: 576,
            settings: {
                dots: true,
            }
        }]
    });

    new WOW({
        offset: 10
    }).init();


});