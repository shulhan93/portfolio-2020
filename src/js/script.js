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
    $('.main-nav__burger').click(function (e) {
        $('.main-nav, .main-nav__burger').toggleClass('active')
    })
    $('.slider').slick({
        responsive: [{
                breakpoint: 576,
                settings: {
                    dots: true,
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    /*     const arrowP = document.querySelector('.slick-arrow.slick-prev')
        const arrowN = document.querySelector('.slick-next')
        const lengthSlider = document.querySelectorAll('.slick-cloned').length - 1
        const allCount = document.querySelector('.slider__count-all')
        const currentSlider = document.querySelector('.slider__count-current')
        allCount.textContent = lengthSlider
        currentSlider.textContent = 1
        console.log(arrowN)
        arrowN.addEventListener('click', () => {
            if (+currentSlider.textContent >= lengthSlider) {
                return
            }
            currentSlider.textContent = +currentSlider.textContent + 1
        })

        arrowP.addEventListener('click', () => {
            if (+currentSlider.textContent == 1) {
                return
            }
            currentSlider.textContent = +currentSlider.textContent - 1
        }); */
    new WOW({
        offset: 20
    }).init();


});