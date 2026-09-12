// LeadRight WPG — site scripts

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('show-mobile');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('show-mobile');
      });
    });
  }

  // Scroll-reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // Contact form: role toggle (Business vs Rep applicant)
  var roleBtns = document.querySelectorAll('.role-btn');
  var roleField = document.getElementById('lead-role');
  if (roleBtns.length && roleField) {
    roleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        roleBtns.forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        roleField.value = btn.dataset.role;
      });
    });
  }

  // Contact form: Formspree submit -> redirect to thank-you
  var form = document.querySelector('form.lead-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
        .then(function (response) {
          if (response.ok) {
            window.location.href = '/contact-thank-you.html';
          } else {
            alertFallback();
          }
        })
        .catch(alertFallback);
    });
  }

  function alertFallback() {
    var status = document.getElementById('form-status');
    if (status) {
      status.textContent = 'Something went wrong sending that — try again, or email us directly.';
      status.hidden = false;
    }
  }
});
