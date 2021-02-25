/*===== Preloader =====*/
$(window).on('load', function () {
  var preloaderFadeOutTime = 600;

  function hidePreloader() {
    var preloader = $('.preloader-wrapper');
    setTimeout(function () {
      preloader.fadeOut(preloaderFadeOutTime);
    }, 600);
  }
  hidePreloader();
});

/*===== Typing Text =====*/
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["شـرکـتـی", "شخـصـی", "فـروشـگـاهـی", "خـبـری"];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () { // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

/*===== Filter Gallery =====*/
filterSelection("all") // Execute the function and show all columns
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active-btn");
    current[0].className = current[0].className.replace(" active-btn", "");
    this.className += " active-btn";
  });
}


/*===== Scroll To Top =====*/
var offset = 100;
$(window).scroll(function () {
  var y = $(this).scrollTop();
  // console.log(y)
  if (y >= offset) {
    $('.scrollToTop').fadeIn();
    // $('.navbar').css("background-color", "yellow");
    $('nav.navbar').addClass('sticky');
  } else {
    $('.scrollToTop').fadeOut();
    $('nav.navbar').removeClass('sticky');
  }
})

$('.scrollToTop').on('click', function () {
  $('html,body').animate({
    scrollTop: 0
  }, 800);
})


/*===== Smooth Scroll =====*/
$(document).ready(function () {
  $(document).on("scroll", onScroll);
  //smoothscroll
  $('.header .navbar ul a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $(document).off("scroll");
    $('.header .navbar ul a').each(function () {
      $(this).removeClass('active');
    })
    $(this).addClass('active');
    var target = this.hash,
      menu = target;
    target = $(target);
    $('html, body').stop().animate({
      'scrollTop': target.offset().top + 2
    }, 1000, 'swing', function () {
      window.location.hash = target;
      $(document).on("scroll", onScroll);
    });
  });
});

function onScroll(event) {
  var scrollPos = $(document).scrollTop();
  $('.header .navbar ul li a').each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
      $('.header .navbar ul li a').removeClass("active");
      currLink.addClass("active");
    } else {
      currLink.removeClass("active");
    }
  });
}

/*===== Navbar =====*/
$(".checkbox").click(function () {
  $("nav.navbar").toggleClass("is-active");
  $('.overlay').toggleClass('is_active');
  $('.header .header-row').css("position", "unset");
  $('.navbar-mobile').toggleClass('is-active-nav');
  $('body').toggleClass('overflow-hidden');
  $('.header .navbar>ul li a').click(function () {
    $("nav.navbar").removeClass("is-active");
  });
});

$(document).on('click', function (event) {
  if (!$(event.target).closest('.navbar-mobile').length && !$(event.target).closest('nav.is-active').length) {
    $('nav').removeClass('is-active');
    $('.checkbox').removeClass('is-active');
    $('.overlay').removeClass('is_active');
    $('.header .header-row').css("position", "relative");
    $('.navbar-mobile').removeClass('is-active-nav');
    $('body').removeClass('overflow-hidden');
    if ($("input[type=checkbox]").is(":checked")) {
      $('.checkbox').prop('checked', !$('.checkbox').prop('checked'));
    }
  }
});

/*===== Scroll down =====*/
$(function () {
  $('.header .header-content a.scroll-down').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 500, 'linear');
  });
});


$(function () {
  $('[data-toggle="tooltip"]').tooltip({
    placement: "top"
  })
})

$('[rel=tooltip]').tooltip({
  placement: 'bottom'
});

/*===== Form Submit =====*/
$(document).ready(function () {

  $(".submit").click(function (e) {
    e.preventDefault()


    if ($("#form_name").val() !== '' && $("#form_lastname").val() !== '' && $("#form_email").val() !== '' && $("#form_email").val().indexOf("@") !== -1 && $("#form_message").val() !== '') {
      $(".submit").addClass("loading");
      setTimeout(function () {
        $(".submit").addClass("hide-loading");
        // For failed icon just replace ".done" with ".failed"
        $(".done").addClass("finish");
      }, 3000);
      setTimeout(function () {
        $(".submit").removeClass("loading");
        $(".submit").removeClass("hide-loading");
        $(".done").removeClass("finish");
        $("#contact-form").trigger("reset")
      }, 5000);
    } else {
      setTimeout(function () {
        $(".submit").addClass("hide-loading");
        // For failed icon just replace ".done" with ".failed"
        $(".failed").addClass("stop");
      }, 0);
      setTimeout(function () {
        $(".submit").removeClass("hide-loading");
        $(".failed").removeClass("stop");
      }, 1000);
    }
  })


});

$(".submit").click(function (e) {
  e.preventDefault();
  // alert('df')
  let form_name = $("#form_name").val(),
    form_lastname = $("#form_lastname").val(),
    form_email = $("#form_email").val(),
    form_message = $("#form_message").val();
  if (form_name === "") {
    $("#form_name").css("border-color", "#F63D3A");
  } else {
    $("#form_name").css("border-color", "#ced4da");
  }

  if (form_lastname === "") {
    $("#form_lastname").css("border-color", "#F63D3A");
  } else {
    $("#form_lastname").css("border-color", "#ced4da");
  }

  if (form_email.includes('@')) {
    $("#form_email").css("border-color", "#ced4da");
  } else if (form_email === "") {
    $("#form_email").css("border-color", "#F63D3A");
  } else {
    $("#form_email").css("border-color", "#F63D3A");

  }

  if (form_message === "") {
    $("#form_message").css("border-color", "#F63D3A");
  } else {
    $("#form_message").css("border-color", "#ced4da");
  }
});