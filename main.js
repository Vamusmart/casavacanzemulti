/////// Cookie starts//////////

const cookieStorage = {
  getItem: (item) => {
    const cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="))
      .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
    return cookies[item];
  },
  setItem: (item, value) => {
    document.cookie = `${item}=${value}; path=/; SameSite=None; Secure`;
  },
};

const storageType = cookieStorage;
const consentPropertyName = "BeaCasaVacanze_HelloCookie";
const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, "true");

window.onload = () => {
  const acceptFn = (event) => {
    event.preventDefault();
    saveToStorage();
    consentPopup.classList.add("hidden");
  };

  const consentPopup = document.getElementById("consent-popup");
  const acceptBtn = document.getElementById("accept");

  acceptBtn.addEventListener("click", acceptFn);

  if (shouldShowPopup()) {
    setTimeout(() => {
      consentPopup.classList.remove("hidden");
    }, 2000);
  }
};

////// Cookie ends ///////

///// Navbar starts /////
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');
  const navbar = document.getElementById("navbar");

  // Toggle menu on burger click
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');

    // Animate links
    navLinks.forEach((link, index) => {
      link.style.animation = link.style.animation
        ? ''
        : `navLinkFade 0.5s ease forwards ${index / 5 + 0.5}s`;
    });
  });

  // Chiudi il menu quando si clicca un link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-active');
      burger.classList.remove('toggle');
      navLinks.forEach(link => link.style.animation = '');
    });
  });

  // Aggiungi classe 'scrolled' al navbar quando si scrolla
  window.addEventListener('scroll', () => {
    const scroll = document.documentElement.scrollTop;
    navbar.classList.toggle('scrolled', scroll > 0);
  });
});
///// navbar ends /////

///// Slider starts /////

let slideIndex = 1;
let timer = null;
showSlides(slideIndex);

const plusSlides = (n) => {
  clearTimeout(timer);
  showSlides((slideIndex += n));
};

const currentSlide = (n) => {
  clearTimeout(timer);
  showSlides((slideIndex = n));
};

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n == undefined) {
    n = ++slideIndex;
  }
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  timer = setTimeout(showSlides, 8000); /* 8 seconds */
}

///// slider ends /////

///// Contact us starts /////

// Group all fields into an object
const fields = {};

// Linking all the fields to our fields object
document.addEventListener("DOMContentLoaded", () => {
  fields.firstName = document.getElementById("firstName");
  fields.lastName = document.getElementById("lastName");
  fields.email = document.getElementById("email");
  fields.message = document.getElementById("message");
});

// Checking that the field is not empty
const isNotEmpty = (value) => {
  if (value == null || typeof value == "undefined") return false;
  return value.length > 0;
};

// Check if a string is an email
const isEmail = (email) => {
  let regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(String(email).toLowerCase());
};

// Messages per language
const messages = {
  it: {
    success: "Grazie per il messaggio.",
    error: "Ricontrolla la tua email e il tuo messaggio"
  },
  en: {
    success: "Thank you for your message.",
    error: "Please check your email and message."
  },
  es: {
    success: "Gracias por tu mensaje.",
    error: "Por favor revisa tu correo y mensaje."
  },
  de: {
    success: "Danke für deine Nachricht.",
    error: "Bitte überprüfe deine E-Mail/Nachricht."
  },
  fr: {
    success: "Merci pour votre message.",
    error: "Veuillez vérifier votre email/message."
  }
};

// Field validation function
const display_message = document.getElementById("display_message");

const fieldValidation = (field, validationFunction) => {
  if (field == null) return false;

  let isFieldValid = validationFunction(field.value);

  // Get current language from <html lang="xx">
  const currentLang = document.documentElement.lang || "en";

  if (!isFieldValid) {
    display_message.innerHTML = messages[currentLang]?.error || messages['en'].error;
    field.style.borderColor = "red";
  } else {
    field.style.borderColor = "";
  }

  return isFieldValid;
};

// Combine all the checks for email and message
const isValid = () => {
  let valid = true;
  valid &= fieldValidation(fields.email, isEmail);
  valid &= fieldValidation(fields.message, isNotEmpty);
  return valid;
};

// User class constructor
class User {
  constructor(firstName, lastName, email, message) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.message = message;
  }
}

// Sending the contact form data with JavaScript
const sendContact = () => {
  const currentLang = document.documentElement.lang || "en";

  if (isValid()) {
    let usr = new User(fields.firstName.value, fields.lastName.value, fields.email.value, fields.message.value);

    display_message.innerHTML = messages[currentLang]?.success || messages['en'].success;
    fields.email.style.display = "none";
    fields.message.style.display = "none";
  }
};

///// Contact us ends /////

///// Sw.js start ////

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        console.log("Service Worker registrato:", registration.scope);
      })
      .catch((err) => {
        console.error("Service Worker non registrato:", err);
      });
  });
}

///// Sw.js ends ////
