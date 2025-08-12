// autor: Marco Barría

$(document).ready(function() {
  // Detectar si es un dispositivo móvil
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  var scrollThreshold = isMobile ? 50 : 100;
  var expandThreshold = isMobile ? 300 : 500;
  var expandHeight = isMobile ? '400px' : '500px';
  var translateY = isMobile ? '350px' : '450px';
  
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
  
  // Forzar un pequeño scroll al cargar para asegurar que la animación funcione en iPhone
  if(isMobile) {
    setTimeout(function() {
      window.scrollTo(0, 1);
    }, 100);
  }
});