const EMAIL_TO = 'sefa.avci@epfl.ch';

// Back-to-top visibility and action
const toTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) toTopBtn.style.display = 'block';
    else toTopBtn.style.display = 'none';
});
toTopBtn && toTopBtn.addEventListener('click', () => window.scrollTo({
    top: 0,
    behavior: 'smooth'
}));

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// THEME: Dark by default, switch to Light via custom switch, persist in localStorage
(function() {
    const key = 'theme';
    const switchEl = document.getElementById('themeSwitch');
    const apply = (mode) => {
        const isDark = mode === 'dark';
        document.body.classList.toggle('theme-dark', isDark);
        if (switchEl) switchEl.checked = !isDark; // checked = light mode
        const label = document.querySelector('label[for="themeSwitch"]');
        if (label) label.textContent = isDark ? 'Light mode' : 'Dark mode';
    };
    const saved = localStorage.getItem(key) || 'dark';
    apply(saved);
    if (switchEl) {
        switchEl.addEventListener('change', () => {
            const mode = switchEl.checked ? 'light' : 'dark';
            localStorage.setItem(key, mode);
            apply(mode);
        });
    }
})();

// Contact form submission with email send via mailto 
(function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const valid = form.checkValidity();
        form.classList.add('was-validated');

        if (valid) {
            const name = document.getElementById('name').value.trim();
            const from = document.getElementById('email').value.trim();
            const msg = document.getElementById('message').value.trim();

            const subject = `Website contact from ${name}`;
            const body = `${msg}\n\nFrom: ${name} <${from}>`;

            // Open default mail client with prefilled fields
            const mailto = `mailto:${encodeURIComponent(EMAIL_TO)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailto;

            // Friendly feedback
            $('#sentModal').modal('show');
            form.reset();
            form.classList.remove('was-validated');
        }
    });
})();

// Scroll reveal: elements marked .reveal fade/slide in once they enter
// the viewport. .reveal-init is added here (not in the CSS default
// state) so content stays visible if JS never runs.
(function() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length || !('IntersectionObserver' in window)) return;

    items.forEach(el => el.classList.add('reveal-init'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    items.forEach(el => observer.observe(el));
})();

// Card spotlight: a soft glass highlight that follows the cursor,
// driven by CSS custom properties consumed in styles.css.
(function() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = document.querySelectorAll('.card, .skill-card');
    targets.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
            el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
        });
    });
})();

// Friendly console greeting on the homepage
if (location.pathname.endsWith('index.html') || location.pathname === '/') {
    console.log("Welcome to Sefa's site!");
}
