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

// Friendly console greeting on the homepage
if (location.pathname.endsWith('index.html') || location.pathname === '/') {
    console.log("Welcome to Sefa's site!");
}
