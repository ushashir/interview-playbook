// nav.js — shared navigation for How to Pass Your Software Developer Interview
(function () {
  // ---- Dark mode (applied before paint to prevent flash) ----
  var savedTheme = localStorage.getItem('sdei_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  var toggleBtn = document.createElement('button');
  toggleBtn.className = 'dark-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
  toggleBtn.textContent = savedTheme === 'dark' ? '☀ Light Mode' : '☾ Dark Mode';

  var sidebarHeader = document.querySelector('.sidebar-header');
  if (sidebarHeader) {
    sidebarHeader.appendChild(toggleBtn);
    toggleBtn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('sdei_theme', next);
      toggleBtn.textContent = next === 'dark' ? '☀ Light Mode' : '☾ Dark Mode';
    });
  }

  // ---- Mobile menu toggle ----
  var btn = document.querySelector('.menu-btn');
  var sidebar = document.querySelector('.sidebar');
  if (btn && sidebar) {
    btn.addEventListener('click', function () { sidebar.classList.toggle('open'); });
    document.addEventListener('click', function (e) {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== btn) {
        sidebar.classList.remove('open');
      }
    });
  }

  // ---- Mark active link ----
  var links = document.querySelectorAll('.sidebar nav a');
  var current = window.location.pathname.replace(/\/$/, '');
  links.forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href) return;
    var resolved = new URL(href, window.location.href).pathname.replace(/\/$/, '');
    if (resolved === current) a.classList.add('active');
  });
})();
