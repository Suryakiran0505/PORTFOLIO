/* ═══════════════════════════════════════════════════
   LIQUID METAL PORTFOLIO — INTERACTIVITY
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Elements ── */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const menuIcon = document.getElementById('menuIcon');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const sections = document.querySelectorAll('section');
    const reveals = document.querySelectorAll('.reveal');
    const form = document.getElementById('contactForm');

    /* ─────────── Mobile menu toggle ─────────── */
    hamburger.addEventListener('click', () => {
        const open = !mobileNav.classList.contains('hidden');
        mobileNav.classList.toggle('hidden');
        menuIcon.textContent = open ? 'menu' : 'close';
    });

    // Close mobile nav on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.add('hidden');
            menuIcon.textContent = 'menu';
        });
    });

    /* ─────────── Navbar scroll effect ─────────── */
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('bg-background-dark/80', window.scrollY > 50);
    }, { passive: true });

    /* ─────────── Active nav-link on scroll ─────────── */
    const observerNav = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(l => l.classList.toggle('active',
                    l.getAttribute('href') === `#${id}`
                ));
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => observerNav.observe(s));

    /* ─────────── Scroll-reveal animations ─────────── */
    const observerReveal = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observerReveal.observe(el));

    /* ─────────── Project modals ─────────── */
    const projectCards = document.querySelectorAll('.project-card[data-modal]');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    function openModal(id) {
        const overlay = document.getElementById(id);
        if (!overlay) return;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    projectCards.forEach(card => {
        card.addEventListener('click', () => openModal(card.dataset.modal));
    });

    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal(btn.closest('.modal-overlay'));
        });
    });

    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalOverlays.forEach(overlay => {
                if (overlay.classList.contains('active')) closeModal(overlay);
            });
        }
    });

    /* ─────────── Contact form ─────────── */
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('formName').value.trim();
        const email = document.getElementById('formEmail').value.trim();
        const msg = document.getElementById('formMessage').value.trim();

        if (!name || !email || !msg) return;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast('Please enter a valid email address.');
            return;
        }

        form.reset();
        showToast('Message sent! I\'ll get back to you soon 🚀');
    });

    /* ─────────── Toast helper ─────────── */
    function showToast(message) {
        document.querySelector('.toast')?.remove();
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => toast.classList.add('show'));
        });
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    /* ─────────── Staggered reveal delays ─────────── */
    document.querySelectorAll('section').forEach(section => {
        const items = section.querySelectorAll('.reveal');
        items.forEach((item, i) => {
            item.style.transitionDelay = `${i * 0.08}s`;
        });
    });

});
