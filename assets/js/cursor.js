(function () {
  if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function raf() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(raf);
  }
  raf();

  const hoverSelector = 'a, button, .contact-row, .qr-card, .project-card, .skill-chip, .resume-social a';
  // relatedTarget으로 "그 요소 안에서" 자식들 사이를 움직이는 것과
  // "그 요소를 실제로 벗어나는 것"을 구분해서, 호버 중 깜빡이며 사라지는 걸 방지
  document.addEventListener('mouseover', (e) => {
    const match = e.target.closest(hoverSelector);
    if (match && !match.contains(e.relatedTarget)) {
      ring.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    const match = e.target.closest(hoverSelector);
    if (match && !match.contains(e.relatedTarget)) {
      ring.classList.remove('cursor-hover');
    }
  });

  document.addEventListener('mousedown', () => ring.classList.add('cursor-hover'));
  document.addEventListener('mouseup', () => ring.classList.remove('cursor-hover'));

  window.__globalCursor = { dot, ring };
})();
