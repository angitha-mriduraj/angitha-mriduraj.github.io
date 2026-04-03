// static/js/antibodies.js
(function () {
  const canvas = document.createElement("canvas");
  canvas.id = "antibody-canvas";
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "-1",
    pointerEvents: "none",
    opacity: "0.12",
  });
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function drawAntibody(x, y, size, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 0.08;
    ctx.lineCap = "round";

    // Stem
    ctx.beginPath();
    ctx.moveTo(0, size * 0.2);
    ctx.lineTo(0, size);
    ctx.stroke();

    // Left arm
    ctx.beginPath();
    ctx.moveTo(0, size * 0.2);
    ctx.lineTo(-size * 0.5, -size * 0.3);
    ctx.stroke();

    // Right arm
    ctx.beginPath();
    ctx.moveTo(0, size * 0.2);
    ctx.lineTo(size * 0.5, -size * 0.3);
    ctx.stroke();

    // Left Fab tip circle
    ctx.beginPath();
    ctx.arc(-size * 0.5, -size * 0.3, size * 0.1, 0, Math.PI * 2);
    ctx.stroke();

    // Right Fab tip circle
    ctx.beginPath();
    ctx.arc(size * 0.5, -size * 0.3, size * 0.1, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  const COLORS = ["#4a90d9", "#7b68ee", "#5ba85a", "#c06dd6"];
  const COUNT = 18;

  const antibodies = Array.from({ length: COUNT }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: 20 + Math.random() * 28,
    angle: Math.random() * Math.PI * 2,
    speed: 0.15 + Math.random() * 0.25,
    direction: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.008,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    antibodies.forEach((ab) => {
      ab.x += Math.cos(ab.direction) * ab.speed;
      ab.y += Math.sin(ab.direction) * ab.speed;
      ab.angle += ab.rotSpeed;

      // Wrap around edges
      if (ab.x < -60) ab.x = canvas.width + 60;
      if (ab.x > canvas.width + 60) ab.x = -60;
      if (ab.y < -60) ab.y = canvas.height + 60;
      if (ab.y > canvas.height + 60) ab.y = -60;

      drawAntibody(ab.x, ab.y, ab.size, ab.angle, ab.color);
    });
    requestAnimationFrame(animate);
  }

  animate();
})();
