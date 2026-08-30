const cfg = window.TEACHER_PORTFOLIO || {};
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null) el.textContent = value;
}

function moneyLabel() {
  const amount = String(cfg.enrollmentPrice ?? '49');
  const currency = cfg.currency || 'USD';
  return `$${amount} ${currency}`;
}

function applyTeacherContent() {
  setText('brandName', cfg.shortName || cfg.fullName || 'Teacher');
  setText('heroIntro', cfg.heroIntro);
  setText('aboutText', cfg.about);
  setText('yearsTeaching', cfg.yearsTeaching);
  setText('studentCount', cfg.studentCount);
  setText('sinceYear', cfg.sinceYear);
  setText('enrollText', cfg.enrollText);
  setText('enrollPrice', cfg.enrollmentPrice || '49');
  setText('priceNote', cfg.priceNote);
  setText('modalPrice', moneyLabel());
  setText('footerName', cfg.fullName || 'Teacher');
  setText('footerRole', cfg.role || 'Educator');
  setText('year', new Date().getFullYear());

  const subjects = Array.isArray(cfg.subjects) ? cfg.subjects : [];
  subjects.slice(0, 3).forEach((subject, index) => {
    const n = ['One', 'Two', 'Three'][index];
    const normalized = typeof subject === 'string' ? { name: subject, description: '' } : subject;
    setText(`subject${n}`, normalized.name);
    if (normalized.description) setText(`subject${n}Desc`, normalized.description);
  });

  const helper = $('#formHelp');
  if (helper && cfg.paymentLink) {
    helper.textContent = 'Your payment checkout will open after you continue.';
  }
}

function initReveal() {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}

function initNav() {
  const toggle = $('.nav-toggle');
  const nav = $('#nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  $$('#nav a, #nav button').forEach(item => item.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

function initEnrollment() {
  const modal = $('#enrollModal');
  if (!modal) return;

  const open = () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => $('.enroll-panel input')?.focus());
  };

  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  $$('[data-open-enroll]').forEach(button => button.addEventListener('click', open));
  $$('[data-close-enroll]').forEach(button => button.addEventListener('click', close));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('open')) close();
  });

  $('#enrollForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const paymentLink = String(cfg.paymentLink || '').trim();

    // Save basic enrollment details locally before checkout so the form feels complete.
    try {
      localStorage.setItem('teacherEnrollment', JSON.stringify({
        name: data.get('name'),
        email: data.get('email'),
        note: data.get('note'),
        createdAt: new Date().toISOString()
      }));
    } catch (_) {}

    if (paymentLink) {
      window.location.href = paymentLink;
      return;
    }

    const recipient = cfg.email || 'teacher@example.com';
    const subject = 'Enrollment & payment setup request';
    const body = [
      `Hello ${cfg.shortName || 'Teacher'},`,
      '',
      `My name is ${data.get('name')}.`,
      `Email: ${data.get('email')}`,
      data.get('note') ? `Note: ${data.get('note')}` : '',
      '',
      `I would like to enroll. The listed price is ${moneyLabel()}. Please send me the payment link.`
    ].filter(Boolean).join('\n');

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

applyTeacherContent();
initReveal();
initNav();
initEnrollment();
