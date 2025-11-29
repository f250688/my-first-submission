document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMenuFilter();
    initAuthTabs();
    initFormValidation();
});
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}
function initMenuFilter() {
    const buttons = document.querySelectorAll('.category-btn');
    const categories = document.querySelectorAll('.menu-category');
    if (buttons.length === 0) return;
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const selected = btn.dataset.category;
            categories.forEach(cat => {
                cat.style.display = (selected === 'all' || cat.id === selected)
                    ? 'block' : 'none';
            });
        });
    });
}
function initAuthTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            forms.forEach(f => {
                f.classList.toggle('active', f.id === target + '-form');
            });
        });
    });
    document.querySelectorAll('.switch-to-signin, .switch-to-signup').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = link.classList.contains('switch-to-signin') ? 'signin' : 'signup';
            tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === target));
            forms.forEach(f => f.classList.toggle('active', f.id === target + '-form'));
        });
    });
}
function initFormValidation() {
    setupForm('contactForm', validateContactForm);
    setupForm('signupForm', validateSignupForm);
    setupForm('signinForm', validateSigninForm);
    setupForm('commentForm', validateFeedbackForm);
}
function setupForm(id, validator) {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        if (validator()) {
            showNotification("Form submitted successfully!", "success");
            form.reset();
        }
    });
}
function validateContactForm() {
    return validateRequired(['fname', 'lname', 'email', 'message']);
}
function validateSignupForm() {
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('confirmPassword').value;
    const agreed = document.getElementById('agreeTerms').checked;
    if (!validateRequired(['fullName', 'signupEmail', 'signupPassword', 'confirmPassword'])) return false;
    if (password.length < 6) return showErr("Password must be at least 6 characters");
    if (password !== confirm) return showErr("Passwords do not match");
    if (!agreed) return showErr("You must agree to the terms");
    return true;
}
function validateSigninForm() {
    return validateRequired(['signinEmail', 'signinPassword']);
}
function validateFeedbackForm() {
    return validateRequired(['userName', 'userEmail', 'userComment']);
}
function validateRequired(ids) {
    for (let id of ids) {
        const el = document.getElementById(id);
        if (!el || !el.value.trim()) {
            return showErr("Please fill all fields properly.");
        }
    }
    return true;
}
function showErr(msg) {
    showNotification(msg, "error");
    return false;
}
function showNotification(message, type) {
    const old = document.querySelector('.notification');
    if (old) old.remove();
    const box = document.createElement('div');
    box.className = `notification ${type}`;
    box.textContent = message;
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 3000);
}