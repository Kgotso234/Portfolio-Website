document.addEventListener('DOMContentLoaded', function(){
    const toggleMenu = document.querySelector(".toggle-menu");
    const menu = document.querySelector(".links");

    if(!toggleMenu) console.error("toggle button not found");
    if(!menu) console.error("Menu not found");

    toggleMenu?.addEventListener('click', function(){
        console.log("menu clicked");
        menu?.classList.toggle('active');
    });
});

//for mobile
const toggleM = document.querySelector(".toggle-menu");
const navMenu = document.querySelector(".links");

toggleM.addEventListener('click', function() {
    navMenu.classList.remove('active');
});

const navLinks = document.querySelectorAll('.links .item a');
navLinks.forEach(link=>{
    link.addEventListener('click', function(){
        navMenu.classList.remove('active');
    });
});

 // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Sticky header on scroll
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header.style.background = 'rgba(255, 255, 255, 0.9)';
      header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.2)';
      header.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.05)';
    }
  });

  // Highligh active menu item on scroll
  const sections = document.querySelector('.section');

  window.addEventListener('scroll', function(){
    let current = '';

    sections.forEach(section =>{
      const sectionTop = section.offsetTop;
      const sectionHight = section.clientHeight;

      if (this.pageXOffset >= sectionTop - 200 ){
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if(link.getAttribute('href') === `#${current}`){
        link.classList.add('active');
      }
    });

    // Set initial state for animated elements
    document.querySelectorAll('.skill-item, .project-card, .timeline-item, .contact-item').forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
  });

  //typing animation text writting
  const typingElement = document.querySelector('.typing');
  const proffessions = [
    "Software Engineer",
    "Web Developer",
    "Software Devepoler",
    "Mobile Developer",
    "Problem Solver"
  ];
  

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;

  function type() {
    const currentWord = proffessions[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);

    typingElement.textContent = currentChar;

    if(!isDeleting && charIndex < currentWord.length){
      //typing
      charIndex++;
      setTimeout(type, 100);
    }else if (isDeleting && charIndex > 0){
      //deleting
      charIndex--;
      setTimeout(type, 50);
    }else{
      //change words
      isDeleting = !isDeleting;
      if (!isDeleting){
        wordIndex = (wordIndex + 1) % proffessions.length;
      }

      setTimeout(type, 1000);
    }
  }

  //start the typing effect
  setTimeout(type, 1000);

  
// Sent email

//grap DOM element
const form = document.getElementById('contact-form');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closePopup = document.getElementById('close-popup');

//function to show popup
function showPoup(message){
  popupMessage.textContent = message;
  popup.style.display = 'flex';

  //auto close after 3 seconds
  setTimeout(() => {
    popup.style.display = 'none';
  }, 10000);
}

//submit handler

form.addEventListener('submit', async (e) =>{
  e.preventDefault();

  const formData = {
    user_name: form.user_name.value,
    user_email: form.user_email.value,
    subject: form.subject.value,
    message: form.message.value
  };

  try {
    const response = await fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    showPoup(result.message);

    if(result.success) form.reset();
  } catch(e) {
    console.error(e);
    showPoup('An error occurred while sending the message');
  }
});

//close popup manually on click
closePopup.addEventListener('click', ()=>{
  popup.style.display = 'none';
});