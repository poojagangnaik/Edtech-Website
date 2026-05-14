/* ================================================================
   MERIDIAN ACADEMY — course.js
   Reads ?course=ID from URL and hydrates the course detail page
   ================================================================ */

'use strict';

/* ----------------------------------------------------------------
   EXTENDED COURSE DATA
   (adds curriculum, learning outcomes, requirements, reviews, faq
    on top of the base COURSES array from script.js)
   ---------------------------------------------------------------- */
var COURSE_EXTRA = {
  1: {
    subtitle: 'Complete Class 12 Physics for CBSE Boards and JEE Main — electrostatics, magnetism, optics, modern physics, and full exam-pattern problem solving by IITians.',
    enrolled: '48,000+',
    originalPrice: '₹6,999',
    discount: '50% OFF',
    requirements: [
      'Class 11 Physics (basic mechanics, thermodynamics, waves) should be covered.',
      'A scientific calculator is recommended for problem practice.',
      'Basic familiarity with differentiation and integration is helpful but not mandatory.'
    ],
    outcomes: [
      'Master all Class 12 CBSE Physics chapters end-to-end',
      'Solve JEE Main level problems with confidence',
      'Understand electrostatics, circuits, optics & modern physics',
      'Tackle assertion-reasoning & case-based CBSE questions',
      'Interpret graphs, derivations and numericals accurately',
      'Score 90+ in Physics in CBSE board exams',
      'Manage time effectively in JEE Main Physics section',
      'Build conceptual clarity through worked examples'
    ],
    curriculum: [
      { name: 'Electric Charges & Fields', lessons: [
        { name: 'Coulomb\'s Law and superposition principle', dur: '42 min', free: true },
        { name: 'Electric field lines and Gauss\'s Law', dur: '55 min', free: true },
        { name: 'Applications of Gauss\'s Law – practice sheet', dur: '38 min', free: false },
        { name: 'Chapter test – 30 MCQs (JEE pattern)', dur: '45 min', free: false }
      ]},
      { name: 'Electrostatic Potential & Capacitance', lessons: [
        { name: 'Potential due to point charge and system', dur: '48 min', free: false },
        { name: 'Capacitors, dielectrics and energy stored', dur: '52 min', free: false },
        { name: 'Combination of capacitors – solved examples', dur: '40 min', free: false }
      ]},
      { name: 'Current Electricity', lessons: [
        { name: 'Drift velocity, resistance and Ohm\'s Law', dur: '44 min', free: false },
        { name: 'Kirchhoff\'s Laws and Wheatstone Bridge', dur: '58 min', free: false },
        { name: 'Cells, EMF, internal resistance problems', dur: '36 min', free: false },
        { name: 'Chapter test', dur: '45 min', free: false }
      ]},
      { name: 'Magnetic Effects of Current', lessons: [
        { name: 'Biot-Savart Law and Ampere\'s Law', dur: '50 min', free: false },
        { name: 'Moving charges in magnetic fields', dur: '46 min', free: false },
        { name: 'Torque on current loop, magnetic dipole', dur: '38 min', free: false }
      ]},
      { name: 'Electromagnetic Induction & AC Circuits', lessons: [
        { name: 'Faraday\'s Law and Lenz\'s Law', dur: '55 min', free: false },
        { name: 'AC circuits, impedance and resonance', dur: '62 min', free: false },
        { name: 'Transformers and power transmission', dur: '30 min', free: false }
      ]},
      { name: 'Optics', lessons: [
        { name: 'Ray optics – mirrors, refraction and lenses', dur: '70 min', free: false },
        { name: 'Wave optics – interference and diffraction', dur: '58 min', free: false },
        { name: 'Full Optics chapter test – 40 MCQs', dur: '60 min', free: false }
      ]},
      { name: 'Modern Physics', lessons: [
        { name: 'Dual nature of radiation, photoelectric effect', dur: '45 min', free: false },
        { name: 'Atoms, nuclei, nuclear reactions', dur: '52 min', free: false },
        { name: 'Semiconductors and logic gates', dur: '38 min', free: false }
      ]}
    ],
    faculty: [
      { initials: 'MK', avCls: 'av-navy', name: 'Dr. Manish Kumar', role: 'IIT Bombay – Physics', rating: 4.9, students: '28,000+', years: 12, bio: 'Dr. Manish Kumar graduated from IIT Bombay with a PhD in Applied Physics. He has mentored over 28,000 students for JEE and NEET and is known for his structured approach to electromagnetism and optics.' },
      { initials: 'AP', avCls: 'av-blue', name: 'Amit Patel', role: 'IIT Delhi – Modern Physics Specialist', rating: 4.8, students: '15,000+', years: 9, bio: 'Amit Patel, IIT Delhi alumnus and former coaching centre topper-maker, specialises in Modern Physics and Optics. His video lectures are concise, derivation-heavy, and strictly exam-mapped.' }
    ],
    reviews: [
      { initials: 'AS', avCls: 'av-navy', name: 'Arjun S.', date: 'March 2024', stars: 5, text: 'Cleared all my electrostatics doubts in one week. The worked examples in every class make a huge difference. Scored 97 in boards.' },
      { initials: 'NK', avCls: 'av-green', name: 'Nisha K.', date: 'February 2024', stars: 5, text: 'The JEE-pattern questions at the end of each chapter are exactly what I needed. Faculty response to doubts is fast and detailed.' },
      { initials: 'RV', avCls: 'av-blue', name: 'Rohan V.', date: 'January 2024', stars: 4, text: 'Very thorough content. Wished there were more practice problems for AC circuits but overall one of the best physics courses out there.' },
      { initials: 'PM', avCls: 'av-navy', name: 'Priya M.', date: 'December 2023', stars: 5, text: 'Completed in 3 months alongside school. The analytics dashboard showed me exactly which topics to focus on. Highly recommend.' }
    ],
    faqs: [
      { q: 'Does this course cover both CBSE boards and JEE Main?', a: 'Yes — every chapter has two tracks: a board-level segment aligned to CBSE question patterns, and a JEE Main problem-solving segment with 10–15 exam-level questions per topic.' },
      { q: 'How long can I access the recordings?', a: 'You get lifetime access to all recorded lectures for the duration your account is active. We do not expire content.' },
      { q: 'Can I access on my phone?', a: 'Yes. The platform is fully mobile-optimised and works on any modern browser on Android or iOS.' },
      { q: 'What if I have a doubt during self-study?', a: 'Post your doubt in the course doubt forum. Subject faculty respond within 4 hours on weekdays with step-by-step written explanations.' }
    ]
  }
};

/* Fallback extra data generator for courses that don't have custom data */
function buildFallbackExtra(course) {
  return {
    subtitle: course.desc,
    enrolled: Math.floor(course.reviews * 3.5).toLocaleString('en-IN') + '+',
    originalPrice: '₹' + (parseInt(course.price.replace(/[^0-9]/g, '')) * 2).toLocaleString('en-IN'),
    discount: '50% OFF',
    requirements: [
      'Basic understanding of the preceding class syllabus is recommended.',
      'A scientific calculator for numerical problem practice.',
      'Commitment of 2–3 hours per day for best results.'
    ],
    outcomes: [
      'Master the complete syllabus for ' + course.category,
      'Solve exam-pattern MCQs with speed and accuracy',
      'Build deep conceptual understanding beyond rote learning',
      'Tackle every question type tested in CBSE / JEE / NEET',
      'Track performance with weekly chapter-wise tests',
      'Improve percentile with full mock exams and analysis',
      'Clear doubts quickly with expert faculty support',
      'Complete the course with a verified certificate'
    ],
    curriculum: [
      { name: 'Module 1 – Foundation & Core Concepts', lessons: [
        { name: 'Introduction and orientation session', dur: '30 min', free: true },
        { name: 'Chapter 1 – Theory + worked examples', dur: '55 min', free: true },
        { name: 'Chapter 1 – Practice sheet (30 MCQs)', dur: '45 min', free: false },
        { name: 'Chapter 1 – Chapter test', dur: '40 min', free: false }
      ]},
      { name: 'Module 2 – Intermediate Topics', lessons: [
        { name: 'Chapter 2 – Complete lecture', dur: '60 min', free: false },
        { name: 'Chapter 3 – Complete lecture', dur: '58 min', free: false },
        { name: 'Part test – Modules 1 & 2', dur: '60 min', free: false }
      ]},
      { name: 'Module 3 – Advanced Applications', lessons: [
        { name: 'Chapter 4 – Theory + JEE-level problems', dur: '65 min', free: false },
        { name: 'Chapter 5 – Theory + JEE-level problems', dur: '62 min', free: false },
        { name: 'Full Mock Test 1', dur: '180 min', free: false }
      ]},
      { name: 'Module 4 – Revision & Exam Prep', lessons: [
        { name: 'Rapid revision – all chapters', dur: '90 min', free: false },
        { name: 'Previous years\' questions with solutions', dur: '75 min', free: false },
        { name: 'Final Mock Test + Analysis', dur: '180 min', free: false }
      ]}
    ],
    faculty: [
      { initials: 'MK', avCls: 'av-navy', name: 'Dr. Manish Kumar', role: 'IIT Bombay – Senior Faculty', rating: 4.9, students: '28,000+', years: 12, bio: 'Dr. Manish Kumar is an IIT Bombay graduate with 12+ years of experience teaching for competitive exams. He is known for concept-first, exam-mapped teaching that has helped thousands of students improve their scores.' },
      { initials: 'SR', avCls: 'av-green', name: 'Prof. Shalini Rao', role: 'AIIMS Graduate – Subject Expert', rating: 4.8, students: '18,000+', years: 8, bio: 'Prof. Shalini Rao brings AIIMS-level subject depth to every lecture. She specialises in connecting theoretical concepts to exam patterns and is highly regarded for her doubt-resolution quality.' }
    ],
    reviews: [
      { initials: 'AS', avCls: 'av-navy', name: 'Arjun S.', date: 'March 2024', stars: 5, text: 'Excellent course. The faculty explains concepts clearly and the practice questions are exactly what I needed for my target exam. Highly recommended.' },
      { initials: 'PR', avCls: 'av-green', name: 'Priya R.', date: 'February 2024', stars: 5, text: 'The doubt resolution is unmatched. I got detailed step-by-step replies to every question within hours. Best decision I made for my preparation.' },
      { initials: 'VN', avCls: 'av-blue', name: 'Vikram N.', date: 'January 2024', stars: 4, text: 'Very well-structured content. The mock tests with percentile analysis helped me understand exactly where I stood. Would definitely recommend.' },
      { initials: 'KS', avCls: 'av-navy', name: 'Kavya S.', date: 'December 2023', stars: 5, text: 'I improved my score by 22 marks after joining this course. The analytics dashboard is brilliant for identifying weak chapters quickly.' }
    ],
    faqs: [
      { q: 'How is this different from free YouTube content?', a: 'Our courses are structured around the actual exam syllabus, with chapter tests, performance analytics, and personalised doubt resolution — not just passive video watching.' },
      { q: 'What is the refund policy?', a: 'We offer a 7-day full refund if you are not satisfied, no questions asked. After that, pro-rated refunds are available within 30 days.' },
      { q: 'Can I access the content on mobile?', a: 'Yes — the platform is fully mobile-optimised and works on any modern browser on Android or iOS.' },
      { q: 'How do the mock tests work?', a: 'Full-length mock tests are available after completing the relevant modules. After each test you get a detailed report with percentile, topic accuracy, and improvement tips.' }
    ]
  };
}

/* ----------------------------------------------------------------
   HELPERS
   ---------------------------------------------------------------- */
function getCourseId() {
  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get('course'), 10);
  return isNaN(id) ? 1 : id;
}

function getCourse(id) {
  if (typeof COURSES === 'undefined') return null;
  return COURSES.find(function(c) { return c.id === id; }) || COURSES[0];
}

function getExtra(id) {
  return COURSE_EXTRA[id] || buildFallbackExtra(getCourse(id));
}

function esc(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ----------------------------------------------------------------
   HYDRATE PAGE
   ---------------------------------------------------------------- */
function hydratePage() {
  var id     = getCourseId();
  var course = getCourse(id);
  if (!course) return;
  var extra  = getExtra(id);

  /* Document title */
  document.title = course.title + ' – Meridian Academy';

  /* Breadcrumb */
  var bcCat = document.getElementById('cpBreadcrumbCat');
  if (bcCat) bcCat.textContent = course.category;

  /* Badges */
  var badgesEl = document.getElementById('cpBadges');
  if (badgesEl && course.tag) {
    var cls = course.tag === 'Popular' ? 'cp-badge-popular' : course.tag === 'New' ? 'cp-badge-new' : 'cp-badge-featured';
    badgesEl.innerHTML = '<span class="cp-badge ' + cls + '">' + esc(course.tag) + '</span>';
    if (course.category === 'Free Resources') {
      badgesEl.innerHTML += '<span class="cp-badge cp-badge-free">Free</span>';
    }
  }

  /* Title & subtitle */
  setText('cpTitle', course.title);
  setText('cpSubtitle', extra.subtitle);

  /* Rating */
  var stars = '';
  for (var i = 0; i < 5; i++) stars += '★';
  setText('cpStars', stars);
  setText('cpRatingNum', course.rating);
  setText('cpRatingCount', '(' + course.reviews.toLocaleString('en-IN') + ' ratings)');
  setText('cpEnrolled', extra.enrolled + ' students enrolled');
  setText('stickyStars', stars);
  setText('stickyRating', course.rating);
  setText('stickyCount', '(' + course.reviews.toLocaleString('en-IN') + ')');
  setText('stickyTitle', course.title);
  setText('reviewBig', course.rating);
  setText('reviewStars', stars);

  /* Meta pills */
  setPillText('cpDuration', course.duration);
  setPillText('cpSessions', course.sessions);
  setPillText('cpLevel', course.level);

  /* Price */
  var priceText = course.price === 'Free' ? 'Free' : course.price;
  setText('cpPrice', priceText);
  setText('modalPrice', priceText);
  if (course.price === 'Free') {
    hide('cpOriginalPrice'); hide('cpDiscount'); hide('cpOfferTimerWrap');
  } else {
    setText('cpOriginalPrice', extra.originalPrice);
    setText('cpDiscount', extra.discount);
    setText('modalOriginal', extra.originalPrice);
  }
  setText('modalCourseName', course.title);

  /* Hero thumb */
  var thumb = document.getElementById('cpCardThumb');
  if (thumb && course.image) {
    thumb.innerHTML = '<img src="' + course.image + '" alt="' + esc(course.title) + '">';
  }

  /* Learn grid */
  renderLearnGrid(extra.outcomes);

  /* Requirements */
  renderRequirements(extra.requirements);

  /* Curriculum */
  renderCurriculum(extra.curriculum);

  /* Faculty */
  renderFaculty(extra.faculty);

  /* Reviews */
  renderReviews(extra.reviews);

  /* FAQ */
  renderFaq(extra.faqs);
}

function setText(id, val) {
  var el = document.getElementById(id);
  if (el) el.textContent = val;
}

function setPillText(id, val) {
  var el = document.getElementById(id);
  if (el) {
    var span = el.querySelector('span');
    if (span) span.textContent = val;
  }
}

function hide(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

/* ----------------------------------------------------------------
   LEARN GRID
   ---------------------------------------------------------------- */
function renderLearnGrid(outcomes) {
  var grid = document.getElementById('learnGrid');
  if (!grid) return;
  grid.innerHTML = '';
  outcomes.forEach(function(outcome) {
    var div = document.createElement('div');
    div.className = 'cp-learn-item';
    div.innerHTML = '<div class="cp-learn-check" aria-hidden="true">✓</div><span>' + esc(outcome) + '</span>';
    grid.appendChild(div);
  });
}

/* ----------------------------------------------------------------
   REQUIREMENTS
   ---------------------------------------------------------------- */
function renderRequirements(reqs) {
  var list = document.getElementById('reqList');
  if (!list) return;
  list.innerHTML = '';
  reqs.forEach(function(req) {
    var li = document.createElement('li');
    li.textContent = req;
    list.appendChild(li);
  });
}

/* ----------------------------------------------------------------
   CURRICULUM
   ---------------------------------------------------------------- */
function renderCurriculum(curriculum) {
  var meta = document.getElementById('curriculumMeta');
  var list = document.getElementById('curriculumList');
  if (!list) return;

  var totalLessons = curriculum.reduce(function(sum, ch) { return sum + ch.lessons.length; }, 0);
  if (meta) meta.textContent = curriculum.length + ' modules · ' + totalLessons + ' lessons';

  list.innerHTML = '';

  curriculum.forEach(function(chapter, ci) {
    var div = document.createElement('div');
    div.className = 'cp-chapter';
    div.id = 'chapter-' + ci;

    var freeLessons = chapter.lessons.filter(function(l) { return l.free; }).length;
    var freeNote = freeLessons > 0 ? '<span style="font-size:0.7rem;color:var(--green);margin-right:4px;">' + freeLessons + ' free</span>' : '';

    var lessonsHtml = chapter.lessons.map(function(lesson) {
      var iconCls = lesson.free ? 'cp-lesson-icon free' : 'cp-lesson-icon';
      var iconChar = lesson.name.toLowerCase().includes('test') || lesson.name.toLowerCase().includes('mcq') ? '📝' : '▶';
      var freeTag = lesson.free ? '<span class="cp-free-tag">Preview</span>' : '';
      return [
        '<div class="cp-lesson">',
          '<div class="cp-lesson-left">',
            '<div class="' + iconCls + '" aria-hidden="true">' + (lesson.free ? '▶' : '▶') + '</div>',
            '<span class="cp-lesson-name">' + esc(lesson.name) + '</span>',
            freeTag,
          '</div>',
          '<span class="cp-lesson-dur">' + esc(lesson.dur) + '</span>',
        '</div>'
      ].join('');
    }).join('');

    div.innerHTML = [
      '<button class="cp-chapter-header" onclick="toggleChapter(' + ci + ')" aria-expanded="false" aria-controls="chapter-body-' + ci + '">',
        '<div class="cp-chapter-left">',
          '<div class="cp-chapter-num">' + (ci + 1) + '</div>',
          '<div class="cp-chapter-name">' + esc(chapter.name) + '</div>',
        '</div>',
        '<div class="cp-chapter-right">',
          freeNote,
          '<span class="cp-chapter-count">' + chapter.lessons.length + ' lessons</span>',
          '<div class="cp-chapter-chevron"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></div>',
        '</div>',
      '</button>',
      '<div class="cp-chapter-body" id="chapter-body-' + ci + '">',
        lessonsHtml,
      '</div>'
    ].join('');

    list.appendChild(div);
  });

  /* Auto-open first chapter */
  if (curriculum.length > 0) toggleChapter(0);
}

function toggleChapter(idx) {
  var chapterEl = document.getElementById('chapter-' + idx);
  if (!chapterEl) return;
  var btn = chapterEl.querySelector('.cp-chapter-header');
  var isOpen = chapterEl.classList.contains('open');
  chapterEl.classList.toggle('open', !isOpen);
  if (btn) {
    btn.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
  }
}

/* ----------------------------------------------------------------
   FACULTY
   ---------------------------------------------------------------- */
function renderFaculty(faculty) {
  var container = document.getElementById('facultyCards');
  if (!container) return;
  container.innerHTML = '';

  faculty.forEach(function(f) {
    var card = document.createElement('div');
    card.className = 'cp-fac-card';
    card.innerHTML = [
      '<div class="cp-fac-avatar ' + f.avCls + '">' + esc(f.initials) + '</div>',
      '<div>',
        '<div class="cp-fac-name">' + esc(f.name) + '</div>',
        '<div class="cp-fac-role">' + esc(f.role) + '</div>',
        '<div class="cp-fac-stats">',
          '<span class="cp-fac-stat">⭐ ' + f.rating + ' rating</span>',
          '<span class="cp-fac-stat">👥 ' + esc(f.students) + ' students</span>',
          '<span class="cp-fac-stat">🏫 ' + f.years + ' years teaching</span>',
        '</div>',
        '<div class="cp-fac-bio">' + esc(f.bio) + '</div>',
      '</div>'
    ].join('');
    container.appendChild(card);
  });
}

/* ----------------------------------------------------------------
   REVIEWS
   ---------------------------------------------------------------- */
function renderReviews(reviews) {
  var grid = document.getElementById('reviewsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  reviews.forEach(function(r) {
    var stars = '';
    for (var i = 0; i < r.stars; i++) stars += '★';
    var card = document.createElement('article');
    card.className = 'cp-review-card';
    card.innerHTML = [
      '<div class="cp-rc-top">',
        '<div class="cp-rc-author">',
          '<div class="cp-rc-avatar ' + r.avCls + '">' + esc(r.initials) + '</div>',
          '<div>',
            '<div class="cp-rc-name">' + esc(r.name) + '</div>',
            '<div class="cp-rc-date">' + esc(r.date) + '</div>',
          '</div>',
        '</div>',
        '<div class="cp-rc-stars">' + stars + '</div>',
      '</div>',
      '<div class="cp-rc-text">' + esc(r.text) + '</div>'
    ].join('');
    grid.appendChild(card);
  });
}

/* ----------------------------------------------------------------
   FAQ
   ---------------------------------------------------------------- */
function renderFaq(faqs) {
  var list = document.getElementById('courseFaqList');
  if (!list) return;
  list.innerHTML = '';

  faqs.forEach(function(faq, idx) {
    var item = document.createElement('div');
    item.className = 'cp-faq-item';
    item.id = 'cfaq-' + idx;

    item.innerHTML = [
      '<button class="cp-faq-q" onclick="toggleCourseFaq(' + idx + ')" aria-expanded="false">',
        esc(faq.q),
        '<div class="cp-faq-chevron"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></div>',
      '</button>',
      '<div class="cp-faq-a"><div class="cp-faq-a-inner">' + esc(faq.a) + '</div></div>'
    ].join('');

    list.appendChild(item);
  });
}

function toggleCourseFaq(idx) {
  var item = document.getElementById('cfaq-' + idx);
  if (!item) return;
  var btn = item.querySelector('.cp-faq-q');
  var isOpen = item.classList.contains('open');

  document.querySelectorAll('.cp-faq-item.open').forEach(function(el) {
    el.classList.remove('open');
    var q = el.querySelector('.cp-faq-q');
    if (q) { q.classList.remove('open'); q.setAttribute('aria-expanded', 'false'); }
  });

  if (!isOpen) {
    item.classList.add('open');
    if (btn) { btn.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
  }
}

/* ----------------------------------------------------------------
   OFFER COUNTDOWN TIMER
   ---------------------------------------------------------------- */
function startTimer() {
  var timerEl = document.getElementById('offerTimer');
  if (!timerEl) return;

  var KEY = 'meridian_offer_end';
  var end = parseInt(sessionStorage.getItem(KEY), 10);
  if (!end || isNaN(end)) {
    end = Date.now() + 12 * 3600 * 1000;
    sessionStorage.setItem(KEY, end);
  }

  function tick() {
    var diff = Math.max(0, end - Date.now());
    var h  = Math.floor(diff / 3600000);
    var m  = Math.floor((diff % 3600000) / 60000);
    var s  = Math.floor((diff % 60000) / 1000);
    var pad = function(n) { return String(n).padStart(2, '0'); };
    timerEl.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
    if (diff > 0) requestAnimationFrame(function() { setTimeout(tick, 1000); });
    else timerEl.textContent = '00:00:00';
  }
  tick();
}

/* ----------------------------------------------------------------
   STICKY BAR
   ---------------------------------------------------------------- */
function initStickyBar() {
  var heroEl   = document.getElementById('courseHero');
  var stickyEl = document.getElementById('stickyBar');
  if (!heroEl || !stickyEl) return;

  window.addEventListener('scroll', function() {
    var bottom = heroEl.getBoundingClientRect().bottom;
    stickyEl.classList.toggle('visible', bottom < 0);
  }, { passive: true });

  /* Highlight active tab on scroll */
  var sections = ['overview', 'curriculum', 'faculty', 'reviews', 'faq-course'];
  var tabs = document.querySelectorAll('.cp-sticky-tab');

  window.addEventListener('scroll', function() {
    var scrollY = window.scrollY + 120;
    var current = sections[0];
    sections.forEach(function(id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });
    tabs.forEach(function(tab) {
      tab.classList.toggle('active', tab.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
}

/* ----------------------------------------------------------------
   MOBILE NAV MENU
   ---------------------------------------------------------------- */
function toggleMenu() {
  var menu = document.getElementById('navMenu');
  var btn  = document.getElementById('hamburgerBtn');
  if (!menu || !btn) return;
  var isOpen = menu.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

/* ----------------------------------------------------------------
   ENROL MODAL
   ---------------------------------------------------------------- */
function openModal() {
  var modal = document.getElementById('enrolModal');
  if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
}

function closeModal() {
  var modal = document.getElementById('enrolModal');
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
}

function confirmEnrol() {
  closeModal();
  showToast();
}

function showToast() {
  var toast = document.getElementById('enrolToast');
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 5000);
}

/* Close modal on overlay click */
document.addEventListener('click', function(e) {
  var overlay = document.getElementById('enrolModal');
  if (e.target === overlay) closeModal();
});

/* Close on Escape */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

/* ----------------------------------------------------------------
   ENROL BUTTON WIRING
   ---------------------------------------------------------------- */
function wireEnrolButtons() {
  var course = getCourse(getCourseId());
  var isFree = course && course.price === 'Free';

  ['mainEnrolBtn', 'heroEnrolBtn', 'stickyEnrolBtn'].forEach(function(id) {
    var btn = document.getElementById(id);
    if (!btn) return;
    if (isFree) {
      btn.textContent = 'Start Free';
      btn.onclick = showToast;
    } else {
      btn.textContent = id === 'heroEnrolBtn' ? 'Enrol Now' : 'Enrol Now';
      btn.onclick = openModal;
    }
  });

  var trialBtn = document.getElementById('trialBtn');
  if (trialBtn) {
    trialBtn.onclick = function() {
      /* Scroll to free lessons in curriculum */
      var freePrev = document.querySelector('.cp-free-tag');
      if (freePrev) freePrev.closest('.cp-chapter') && freePrev.closest('.cp-chapter').scrollIntoView({ behavior: 'smooth' });
      else document.getElementById('curriculum') && document.getElementById('curriculum').scrollIntoView({ behavior: 'smooth' });
    };
  }
  /* Wire mobile bottom bar */
var mobileBtn = document.getElementById('mobileEnrolBtn');
if (mobileBtn) {
  if (isFree) { mobileBtn.textContent = 'Start Free'; mobileBtn.onclick = showToast; }
  else        { mobileBtn.textContent = 'Enrol Now';  mobileBtn.onclick = openModal; }
}

/* Populate mobile bar price */
var extra = getExtra(getCourseId());
var mobilePrice = document.getElementById('mobilePrice');
var mobileOrig  = document.getElementById('mobileOriginalPrice');
var mobileDis   = document.getElementById('mobileDiscount');
if (mobilePrice) mobilePrice.textContent = course && course.price !== 'Free' ? course.price : 'Free';
if (mobileOrig && extra && course && course.price !== 'Free') mobileOrig.textContent = extra.originalPrice;
if (mobileDis  && extra && course && course.price !== 'Free') mobileDis.textContent  = extra.discount;
}

/* ----------------------------------------------------------------
   NAVBAR SCROLL
   ---------------------------------------------------------------- */
function initNavbarScroll() {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

/* ----------------------------------------------------------------
   INIT
   ---------------------------------------------------------------- */
(function init() {
  hydratePage();
  startTimer();
  initStickyBar();
  initNavbarScroll();
  wireEnrolButtons();
})();