document.addEventListener("DOMContentLoaded", function() {
  const flame = document.getElementById('flame');
  
  document.addEventListener("mousemove", function(e) {
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    
    flame.style.left = mouseX - flame.offsetWidth / 2 + 'px';
    flame.style.top = mouseY - flame.offsetHeight / 2 + 'px';
  });
});
