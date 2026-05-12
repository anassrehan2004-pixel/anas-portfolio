// ============ DATA ============
const websites = [
  {
    title: "BitcyClub",
    description: "Bitcy.club is a platform where users play games to win rewards.",
    image: "images/bitcyclub.PNG",
    link: "https://bitcy.club/"
  },
  {
    title: "Buckster",
    description: "Buckster is a merchant-driven platform where users play trivia games to win real rewards.",
    image: "images/buckster.PNG",
    link: "https://buckster.ca/"
  },
    {
    title: "Lofty Auto Export",
    description: "Lofty Auto Exports facilitates international car trading and export logistics.",
    image: "images/lofty.PNG",
    link: "https://loftyautoexports.com/"
  },
  {
    title: "Bitcyllionaire",
    description: "Bitcyllionaire helps users earn event tickets through BitcyClub rewards.",
    image: "images/bitcyllionaire.PNG",
    link: "https://www.bitcyllionaire.com/"
  },
    {
    title: "Green Habitat",
    description: "Green Habitat Initiative promotes environmental sustainability and climate action in Nigeria.",
    image: "images/greenhabitat.PNG",
    link: "https://www.greenhabitat.ng/"
  },
      {
    title: "Dave Asprey",
    description: "Dave Asprey is a biohacking entrepreneur and founder of Bulletproof Coffee.",
    image: "images/dave.PNG",
    link: "https://daveasprey.com/"
  },
      {
    title: "Bencita Boutique",
    description: "Bencita Boutique is an online fashion store offering trendy women’s clothing and accessories.",
    image: "images/bencita.PNG",
    link: "https://darksalmon-armadillo-469250.hostingersite.com/"
  },
      {
    title: "Zesty Paw",
    description: "Zesty Paws is a pet wellness brand that makes science-based supplements for dogs and cats..",
    image: "images/zesty.PNG",
    link: "https://zestypaws.com/"
  }
];

// ============ WEBSITES INFINITE SCROLL ============
function initWebsitesScroll(items) {
  const wrapper = document.querySelector('.horizontal-scroll-wrapper');
  const container = document.getElementById('websites-grid');
  if (!container || !wrapper) return;

  const cardHTML = items.map(item => `
    <a href="${item.link}" target="_blank" rel="noopener" class="card" draggable="false">
      <div class="card-image">
        <img src="${item.image}" alt="${item.title}" loading="lazy" draggable="false" />
      </div>
      <div class="card-body">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </a>
  `).join('');

  container.innerHTML = cardHTML + cardHTML;

  container.querySelectorAll('a.card').forEach(a => {
    a.addEventListener('click', e => {
      if (wasDragging) e.preventDefault();
    });
  });

  let halfWidth = 0;
  function measureHalf() {
    const cards = container.querySelectorAll('a.card');
    const gap = 24;
    let w = 0;
    for (let i = 0; i < items.length; i++) {
      w += cards[i].offsetWidth + gap;
    }
    halfWidth = w;
  }
  setTimeout(measureHalf, 100);

  let offset = 0;
  const speed = 1;
  let isDragging = false;
  let wasDragging = false;
  let dragStartX = 0;
  let dragStartOffset = 0;
  let isPaused = false;

  function tick() {
    if (!isDragging && !isPaused && halfWidth > 0) {
      offset += speed;
      if (offset >= halfWidth) offset -= halfWidth;
    }
    container.style.transform = `translateX(${-offset}px)`;
    requestAnimationFrame(tick);
  }
  tick();

  wrapper.addEventListener('mouseenter', () => isPaused = true);
  wrapper.addEventListener('mouseleave', () => { if (!isDragging) isPaused = false; });

  wrapper.addEventListener('mousedown', e => {
    isDragging = true;
    wasDragging = false;
    isPaused = true;
    dragStartX = e.clientX;
    dragStartOffset = offset;
    wrapper.classList.add('dragging');
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const delta = dragStartX - e.clientX;
    if (Math.abs(delta) > 5) wasDragging = true;
    offset = dragStartOffset + delta;
    if (offset < 0) offset += halfWidth;
    if (offset >= halfWidth) offset -= halfWidth;
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    isPaused = false;
    wrapper.classList.remove('dragging');
    setTimeout(() => { wasDragging = false; }, 50);
  });

  wrapper.addEventListener('touchstart', e => {
    isDragging = true;
    wasDragging = false;
    isPaused = true;
    dragStartX = e.touches[0].clientX;
    dragStartOffset = offset;
  }, { passive: true });

  wrapper.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const delta = dragStartX - e.touches[0].clientX;
    if (Math.abs(delta) > 5) wasDragging = true;
    offset = dragStartOffset + delta;
    if (offset < 0) offset += halfWidth;
    if (offset >= halfWidth) offset -= halfWidth;
  }, { passive: true });

  wrapper.addEventListener('touchend', () => {
    isDragging = false;
    isPaused = false;
    setTimeout(() => { wasDragging = false; }, 50);
  });
}

// ============ THEME TOGGLE ============
function initTheme() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// ============ ACTIVE NAV ON SCROLL ============
function initSectionObserver() {
  const links = document.querySelectorAll('.nav-link[data-section]');

  function setActive(id) {
    links.forEach(l => {
      l.classList.toggle('active', l.dataset.section === id);
    });
  }

  // Set active on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let current = 'home';

    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top <= window.innerHeight * 0.45) {
        current = section.id;
      }
    });

    setActive(current);
  }, { passive: true });

  // Set on load
  setActive('home');
}

// ============ MOBILE DRAWER ============
function initMobileDrawer() {
  const toggle = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggle || !drawer) return;

  toggle.addEventListener('click', () => {
    drawer.hidden = !drawer.hidden;
  });
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { drawer.hidden = true; });
  });
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  initWebsitesScroll(websites);
  initTheme();
  initSectionObserver();
  initMobileDrawer();
});