
    // ─── CURSOR ───
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
});

    // Smooth ring follow
(function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
})();

    // ─── SCROLL REVEAL ───
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));

    // ─── SKILL BARS ANIMATION ───
const barObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(fill => {
            fill.classList.add('animated');
        });
        }
    });
    }, { threshold: 0.2 });
    document.querySelectorAll('.skill-list').forEach(el => barObserver.observe(el));

    // ─── NAV ACTIVE LINK ───
    const sections = document.querySelectorAll('section[id], div#hero');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--accent3)'
        : '';
    });
    }, { passive: true });

    // ─── SMOOTH NAV SCROLL ───
    document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
});

    // ─── SPLINE MOUSE FOLLOW (si pas de scène Spline) ───
    // Une fois ta scène Spline intégrée, l'effet de suivi de souris
    // se configure directement dans Spline (Events > Mouse Move > rotation).
    // Le code ci-dessous anime le placeholder en attendant :
    const placeholder = document.getElementById('spline-placeholder');
    if (placeholder) {
        document.addEventListener('mousemove', e => {
        const cx = window.innerWidth  / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        const ring = placeholder.querySelector('.avatar-ring');
        if (ring) {
          ring.style.transform = `rotateY(${dx * 12}deg) rotateX(${-dy * 8}deg)`;
        }
    });
}
