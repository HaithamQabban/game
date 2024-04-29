<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mouse Gooey Effect</title>
<style>
  html,
  body {
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: #101010;
  }

  $diameter1: 30px;
  $diameter2: 20px;
  $diameter3: 15px;
  $diameter4: 12px;
  $bg1: #ffb924;
  $bg2: #ff8b24;
  $bg3: #ff6724;
  $bg4: #ff2e24;

  #cursor {
    position: absolute;
    z-index: 1;
    filter:url('#goo');
    transform-origin: center;
  }

  .blob {
    position: absolute;
    top: 50%;
    left: 50%;
    pointer-events: none;
  }

  .blob:nth-child(1) {
    margin: -#{$diameter1/2} 0 0 -#{$diameter1/2};
    width: $diameter1;
    height: $diameter1;
    border-radius: 100%;
    background: $bg1;
  }

  .blob:nth-child(2) {
    margin: -#{$diameter2/2} 0 0 -#{$diameter2/2};
    width: $diameter2;
    height: $diameter2;
    z-index: -1;
    background: $bg2;
  }

  .blob:nth-child(3) {
    margin: -#{$diameter3/2} 0 0 -#{$diameter3/2};
    width: $diameter3;
    height: $diameter3;
    z-index: -2;
    background: $bg3;
    animation: move2 .3s forwards infinite;
  }

  .blob:nth-child(4) {
    margin: -#{$diameter4/2} 0 0 -#{$diameter4/2};
    width: $diameter4;
    height: $diameter4;
    z-index: 30;
    background: $bg4;
    animation: move3 .5s forwards infinite;
  }

  @keyframes move2 {
    0% {
      left: 5px;
      top: -5px;
    }
    100% {
      left: -5px;
      top: 5px;
    }
  }

  @keyframes move3 {
    0% {
      left: 5px;
      top: 5px;
    }
    100% {
      left: -5px;
      top: -5px;
    }
  }
</style>
</head>
<body>
<div id="cursor">
  <div class="blob"></div>
  <div class="blob"></div>
  <div class="blob"></div>
  <div class="blob"></div>
</div>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="my-blur" />
      <feColorMatrix in="my-blur" mode="matrix" values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 20 -8" result="my-gooey" />
    </filter>
  </defs>
</svg>
<script>
  /*--------------------
  Get Mouse
  --------------------*/
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, dir: '' };
  const getMouse = (e) => {
    mouse = {
      x: e.clientX || e.pageX || e.touches[0].pageX || 0,
      y: e.clientY || e.pageX || e.touches[0].pageY || 0,
      dir: (getMouse.x > e.clientX) ? 'left' : 'right'
    }
  };
  ['mousemove', 'touchstart', 'touchmove'].forEach(e => {
    window.addEventListener(e, getMouse);
  });


  /*--------------------
  Mouse Follow
  --------------------*/
  class MouseFollow {
    constructor (options) {
      Object.assign(this, options);
      
      this.pos = {
        x: 0,
        y: 0
      }
    }
    
    follow() {
      this.distX = mouse.x - this.pos.x;
      this.distY = mouse.y - this.pos.y;
      
      this.velX = Math.abs(this.distX / 8);
      this.velY = Math.abs(this.distY / 8);
      
      this.pos.x += this.distX / (10 + (this.ind * gooey));
      this.pos.y += this.distY / (10 + (this.ind * gooey));
      
      this.scaleX = map(this.velX, 0, 100, 1, 2);
      this.scaleY = map(this.velY, 0, 100, 1, 2);

      this.el.style.transform = 'translate(' + this.pos.x + 'px, ' + this.pos.y + 'px) scale(' + Math.max(this.scaleX, this.scaleY) + ')';
    }
  }


  /*--------------------
  Map
  --------------------*/
  function map (num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }


  /*--------------------
  Init
  --------------------*/
  const gooey = .8;
  const blobs = Array.from(document.querySelectorAll('#cursor .blob'));
  const blobFollows = blobs.map((e, i) => new MouseFollow({ el: e, ind: i }));


  /*--------------------
  Render
  --------------------*/
  const render = () => {
    requestAnimationFrame(render);
    blobFollows.forEach(e => e.follow());
  }
  render();
</script>
</body>
</html>
