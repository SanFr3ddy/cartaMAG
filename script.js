// autor: Marco Barría

$(document).ready(function() {
  // Detectar si es un dispositivo móvil
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  var scrollThreshold = isMobile ? 50 : 100;
  var expandThreshold = isMobile ? 300 : 500;
  var expandHeight = isMobile ? '400px' : '500px';
  var translateY = isMobile ? '350px' : '450px';
  var confettiShown = false;
  
  // Función para lanzar confeti
  function lanzarConfeti() {
    if (!confettiShown) {
      confettiShown = true;
      
      var count = 200;
      var defaults = {
        origin: { y: 0.7 }
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }
  
  $(window).scroll(function () {   
    var scr = $(window).scrollTop(),
        C = $('#contenedor'),
        A = $('#abrir'),
        E = $('#carta'),
        F = $('#carta hgroup h2'),
        P = $('#perspectiva');
    
    // giro y abertura
    if (scr >= scrollThreshold) {
      C.css({
        'transition':'all 1s',
        'transform':'rotateY(180deg)'
      });
      A.css({
        'transition':'all 1s .5s',
        'transform':'rotateX(180deg)',
        'z-index': '0'
      });
      
      // Lanzar confeti después de que la carta se abra
      setTimeout(lanzarConfeti, 1000);
    }
    // cerrado y giro
    else if (scr <= scrollThreshold) {
      C.css({
        'transition':'all 1s .5s',
        'transform':'rotateY(0deg)'
      });
      A.css({
        'transition':'all 1s',
        'transform':'rotateX(0deg)',
        'z-index': '10'
      });  
      confettiShown = false;
    }
    // Sobre trasladoY / carta
    if (scr >= expandThreshold) {
      E.css({
        'transition':'all .5s 1s',
        'top':'-550px',
        'height': expandHeight
      });
      P.css({
        'transition':'all 1s',
        'transform':'translateY(' + translateY + ')'
      });
      F.css({
        'transition':'all 1s',
        'transform':'rotateZ(180deg)'
      });
    }
    // Sobre position original / guardado carta
    else if (scr <= expandThreshold) {
      E.css({
        'transition':'all .5s',
        'top':'3px',
        'height':'200px'
      });
      P.css({
        'transform':'translateY(0px)'
      });
      F.css({
        'transform':'rotateZ(0deg)'
      });
    }
  });
  
  // Animación del pastel
  $('.pastel').css({
    'animation': 'bounce 2s infinite alternate'
  });
  
  // Añadir animación de rebote para el pastel
  $('<style>').text('@keyframes bounce { 0% { transform: translateX(-50%) translateY(0); } 100% { transform: translateX(-50%) translateY(-10px); } }').appendTo('head');
  
  // Forzar un pequeño scroll al cargar para asegurar que la animación funcione en iPhone
  if(isMobile) {
    setTimeout(function() {
      window.scrollTo(0, 1);
    }, 100);
  }
});