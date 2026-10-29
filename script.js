/**
 * EMBER & OLIVE — Modern American Bistro (Austin, Texas)
 * Portfolio Concept Website Interactive Script (Vanilla ES6+)
 *
 * Features:
 * 1. Accessible Mobile Navigation Drawer (toggle, Escape key, link auto-close)
 * 2. Sticky Header State & Back-to-Top Control
 * 3. WAI-ARIA Menu Category Tabs (pointer + keyboard ArrowLeft/Right/Home/End) & Dietary Filter
 * 4. Signature Dish "View in Full Menu" & Dining Experience Seating Pre-selection
 * 5. Accessible Reservation Form Validation (past-date prevention, Monday closure check, demo receipt)
 * 6. Accessible Contact Form Validation & Sample Social Profile Notice
 * 7. Resilient Image Error Fallbacks
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initHeaderAndMobileNav();
    initImageFallbacks();
    initMenuTabsAndFilters();
    initSignatureDishJumpLinks();
    initExperienceZoneSelectors();
    initServiceHoursHighlight();
    initReservationForm();
    initContactFormAndSocials();
    initBackToTop();
  });

  /* --------------------------------------------------------------------------
     1. Header Scroll State & Accessible Mobile Navigation
     -------------------------------------------------------------------------- */
  function initHeaderAndMobileNav() {
    var header = document.getElementById('site-header');
    var toggleBtn = document.getElementById('mobile-nav-toggle');
    var drawer = document.getElementById('mobile-nav-drawer');
    var drawerLinks = drawer ? drawer.querySelectorAll('a') : [];

    function updateHeaderScroll() {
      if (!header) return;
      if (window.scrollY > 24) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', updateHeaderScroll, { passive: true });
    updateHeaderScroll();

    if (!toggleBtn || !drawer) return;

    function setMenuOpen(isOpen) {
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggleBtn.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
      );
      if (isOpen) {
        drawer.classList.add('is-open');
        drawer.removeAttribute('hidden');
      } else {
        drawer.classList.remove('is-open');
        drawer.setAttribute('hidden', '');
      }
    }

    toggleBtn.addEventListener('click', function () {
      var expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      setMenuOpen(!expanded);
    });

    drawerLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        toggleBtn.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. Resilient Image Fallbacks
     -------------------------------------------------------------------------- */
  function initImageFallbacks() {
    var figures = document.querySelectorAll('.editorial-media');
    figures.forEach(function (fig) {
      var img = fig.querySelector('img');
      if (!img) return;

      function handleImgError() {
        fig.classList.add('img-fallback-active');
      }

      img.addEventListener('error', handleImgError);
      if (img.complete && img.naturalWidth === 0) {
        handleImgError();
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. WAI-ARIA Menu Category Tabs & Dietary Filter
     -------------------------------------------------------------------------- */
  var activeCategory = 'starters';
  var activeDiet = 'all';

  function activateMenuCategory(category, shouldFocusTab) {
    var tabs = document.querySelectorAll('.menu-tab');
    var panels = document.querySelectorAll('.menu-panel');
    activeCategory = category;

    tabs.forEach(function (tab) {
      var tabCat = tab.getAttribute('data-category');
      var isSelected = tabCat === category;
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
      if (isSelected && shouldFocusTab) {
        tab.focus();
      }
    });

    panels.forEach(function (panel) {
      var panelCat = panel.getAttribute('data-category-panel');
      if (panelCat === category) {
        panel.classList.add('is-active');
        panel.removeAttribute('hidden');
      } else {
        panel.classList.remove('is-active');
        panel.setAttribute('hidden', '');
      }
    });

    applyDietaryFilter(activeDiet);
  }

  function applyDietaryFilter(diet) {
    activeDiet = diet;
    var chips = document.querySelectorAll('.dietary-chip');
    chips.forEach(function (chip) {
      var isMatch = chip.getAttribute('data-diet') === diet;
      chip.classList.toggle('is-active', isMatch);
      chip.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
    });

    var activePanel = document.querySelector(
      '.menu-panel[data-category-panel="' + activeCategory + '"]'
    );
    if (!activePanel) return;

    var entries = activePanel.querySelectorAll('.menu-entry');
    var visibleCount = 0;

    entries.forEach(function (entry) {
      var tags = (entry.getAttribute('data-tags') || '').split(',');
      if (diet === 'all' || tags.indexOf(diet) !== -1) {
        entry.classList.remove('is-hidden-by-diet');
        visibleCount++;
      } else {
        entry.classList.add('is-hidden-by-diet');
      }
    });

    var emptyNotice = document.getElementById('menu-empty-notice');
    if (emptyNotice) {
      emptyNotice.classList.toggle('is-visible', visibleCount === 0);
    }
  }

  function initMenuTabsAndFilters() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.menu-tab'));
    var chips = document.querySelectorAll('.dietary-chip');
    var resetDietBtn = document.getElementById('reset-dietary-btn');

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        var cat = tab.getAttribute('data-category');
        activateMenuCategory(cat, false);
      });

      tab.addEventListener('keydown', function (e) {
        var targetIndex = null;
        if (e.key === 'ArrowRight') {
          targetIndex = (index + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft') {
          targetIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
          targetIndex = 0;
        } else if (e.key === 'End') {
          targetIndex = tabs.length - 1;
        }

        if (targetIndex !== null) {
          e.preventDefault();
          var nextCat = tabs[targetIndex].getAttribute('data-category');
          activateMenuCategory(nextCat, true);
        }
      });
    });

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var diet = chip.getAttribute('data-diet');
        applyDietaryFilter(diet);
      });
    });

    if (resetDietBtn) {
      resetDietBtn.addEventListener('click', function () {
        applyDietaryFilter('all');
      });
    }
  }

  /* --------------------------------------------------------------------------
     4. Signature Dish Jump Links & Experience Seating Pre-selection
     -------------------------------------------------------------------------- */
  function initSignatureDishJumpLinks() {
    var jumpBtns = document.querySelectorAll('.dish-jump-btn');
    var menuSection = document.getElementById('menu');

    jumpBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetCat = btn.getAttribute('data-jump-category') || 'mains';
        applyDietaryFilter('all');
        activateMenuCategory(targetCat, false);
        if (menuSection) {
          menuSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  function initExperienceZoneSelectors() {
    var zoneBtns = document.querySelectorAll('.zone-select-btn');
    var zoneCards = document.querySelectorAll('.experience-zone');
    var notesInput = document.getElementById('res-requests');
    var resSection = document.getElementById('reservations');

    zoneBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var zoneName = btn.getAttribute('data-zone-name') || 'Main Dining Room';
        zoneCards.forEach(function (card) {
          card.classList.remove('is-selected');
        });
        var parentCard = btn.closest('.experience-zone');
        if (parentCard) {
          parentCard.classList.add('is-selected');
        }

        if (notesInput) {
          var existing = notesInput.value.trim();
          var prefix = 'Preferred Seating: ' + zoneName + '.';
          if (existing.indexOf('Preferred Seating:') !== -1) {
            notesInput.value = existing.replace(/Preferred Seating:[^.]*\./, prefix);
          } else {
            notesInput.value = existing ? prefix + ' ' + existing : prefix;
          }
        }

        if (resSection) {
          resSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. Opening Hours Highlight & Service Status
     -------------------------------------------------------------------------- */
  function initServiceHoursHighlight() {
    var now = new Date();
    var dayIndex = now.getDay(); // 0 = Sun, 1 = Mon, ... 6 = Sat
    var rows = document.querySelectorAll('.hours-table tr[data-day]');
    rows.forEach(function (row) {
      var days = (row.getAttribute('data-day') || '').split(',');
      if (days.indexOf(String(dayIndex)) !== -1) {
        row.classList.add('is-today');
      }
    });

    var statusPill = document.getElementById('service-status-pill');
    if (statusPill) {
      if (dayIndex === 1) {
        statusPill.textContent = 'Monday Schedule · Closed for Weekly Hearth Maintenance';
      } else if (dayIndex === 5 || dayIndex === 6) {
        statusPill.textContent = 'Weekend Service · Aperitivo 4:30 PM & Dinner until 11:00 PM';
      } else {
        statusPill.textContent = 'Evening Service · Wood-Fired Kitchen Open from 5:00 PM';
      }
    }
  }

  /* --------------------------------------------------------------------------
     6. Accessible Reservation Form Validation & Demo Receipt
     -------------------------------------------------------------------------- */
  function getTodayISOString() {
    var d = new Date();
    var year = d.getFullYear();
    var month = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  function getNextOpenDateISOString() {
    var d = new Date();
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 1) {
      d.setDate(d.getDate() + 1); // Skip Monday closure
    }
    var year = d.getFullYear();
    var month = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  function setFieldError(inputEl, errorEl, message) {
    if (!inputEl || !errorEl) return;
    if (message) {
      inputEl.setAttribute('aria-invalid', 'true');
      errorEl.textContent = message;
    } else {
      inputEl.setAttribute('aria-invalid', 'false');
      errorEl.textContent = '';
    }
  }

  function initReservationForm() {
    var form = document.getElementById('reservation-form');
    if (!form) return;

    var nameInput = document.getElementById('res-name');
    var emailInput = document.getElementById('res-email');
    var phoneInput = document.getElementById('res-phone');
    var dateInput = document.getElementById('res-date');
    var timeInput = document.getElementById('res-time');
    var guestsInput = document.getElementById('res-guests');
    var requestsInput = document.getElementById('res-requests');

    var sampleBtn = document.getElementById('res-sample-fill');
    var resetBtn = document.getElementById('res-reset-btn');
    var newDemoBtn = document.getElementById('res-new-demo-btn');
    var confirmationBox = document.getElementById('res-demo-confirmation');
    var summaryBox = document.getElementById('res-confirmation-summary');

    var todayISO = getTodayISOString();
    if (dateInput) {
      dateInput.setAttribute('min', todayISO);
      if (!dateInput.value) {
        dateInput.value = getNextOpenDateISOString();
      }
    }

    function validateReservationField(field) {
      var id = field.id;
      var val = field.value.trim();
      var errEl = document.getElementById(id + '-error');

      if (id === 'res-name') {
        if (!val) {
          setFieldError(field, errEl, 'Please enter the full name for the reservation.');
          return false;
        }
        if (val.length < 2) {
          setFieldError(field, errEl, 'Name must be at least 2 characters long.');
          return false;
        }
        setFieldError(field, errEl, '');
        return true;
      }

      if (id === 'res-email') {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val) {
          setFieldError(field, errEl, 'Please provide an email address for your confirmation summary.');
          return false;
        }
        if (!emailPattern.test(val)) {
          setFieldError(field, errEl, 'Please enter a valid email address (for example, alex@domain.com).');
          return false;
        }
        setFieldError(field, errEl, '');
        return true;
      }

      if (id === 'res-phone') {
        var digits = val.replace(/\D/g, '');
        if (!val) {
          setFieldError(field, errEl, 'Please enter a contact phone number.');
          return false;
        }
        if (digits.length < 10 || digits.length > 15) {
          setFieldError(field, errEl, 'Please enter a valid 10-digit phone number.');
          return false;
        }
        setFieldError(field, errEl, '');
        return true;
      }

      if (id === 'res-date') {
        if (!val) {
          setFieldError(field, errEl, 'Please select a reservation date.');
          return false;
        }
        var currentMin = getTodayISOString();
        if (val < currentMin) {
          setFieldError(field, errEl, 'Reservation date cannot be in the past. Please choose today or a future date.');
          return false;
        }
        var parts = val.split('-');
        var selectedDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        if (selectedDate.getDay() === 1) {
          setFieldError(field, errEl, 'Ember & Olive is closed on Mondays. Please select Tuesday through Sunday.');
          return false;
        }
        setFieldError(field, errEl, '');
        return true;
      }

      if (id === 'res-time') {
        if (!val) {
          setFieldError(field, errEl, 'Please select a preferred seating time.');
          return false;
        }
        setFieldError(field, errEl, '');
        return true;
      }

      if (id === 'res-guests') {
        if (!val) {
          setFieldError(field, errEl, 'Please select the number of guests in your party.');
          return false;
        }
        setFieldError(field, errEl, '');
        return true;
      }

      return true;
    }

    var requiredFields = [nameInput, emailInput, phoneInput, dateInput, timeInput, guestsInput];
    requiredFields.forEach(function (field) {
      if (!field) return;
      field.addEventListener('blur', function () {
        validateReservationField(field);
      });
      field.addEventListener('input', function () {
        if (field.getAttribute('aria-invalid') === 'true') {
          validateReservationField(field);
        }
      });
      field.addEventListener('change', function () {
        if (field.getAttribute('aria-invalid') === 'true' || field === dateInput) {
          validateReservationField(field);
        }
      });
    });

    if (sampleBtn) {
      sampleBtn.addEventListener('click', function () {
        nameInput.value = 'Clara Vance';
        emailInput.value = 'clara.vance@sample-client.example';
        phoneInput.value = '(512) 555-0148';
        dateInput.value = getNextOpenDateISOString();
        timeInput.value = '19:00';
        guestsInput.value = '4';
        requestsInput.value = 'Preferred Seating: 8-Seat Hearth Counter. Celebrating an anniversary; one guest is gluten-free.';
        requiredFields.forEach(function (f) {
          validateReservationField(f);
        });
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        form.reset();
        dateInput.value = getNextOpenDateISOString();
        requiredFields.forEach(function (f) {
          var errEl = document.getElementById(f.id + '-error');
          setFieldError(f, errEl, '');
        });
        if (confirmationBox) {
          confirmationBox.classList.remove('is-visible');
        }
      });
    }

    if (newDemoBtn) {
      newDemoBtn.addEventListener('click', function () {
        if (confirmationBox) {
          confirmationBox.classList.remove('is-visible');
        }
        nameInput.focus();
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      requiredFields.forEach(function (field) {
        var valid = validateReservationField(field);
        if (!valid && !firstInvalid) {
          firstInvalid = field;
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      var timeLabel = timeInput.options[timeInput.selectedIndex]
        ? timeInput.options[timeInput.selectedIndex].text
        : timeInput.value;
      var guestLabel = guestsInput.options[guestsInput.selectedIndex]
        ? guestsInput.options[guestsInput.selectedIndex].text
        : guestsInput.value;
      var refCode = 'EO-DEMO-' + String(Math.floor(1000 + Math.random() * 9000));

      if (summaryBox) {
        summaryBox.innerHTML = '';
        var details = [
          ['Demo Reference', refCode + ' (Sample Only)'],
          ['Guest Name', nameInput.value.trim()],
          ['Date & Seating', dateInput.value + ' at ' + timeLabel],
          ['Party Size', guestLabel],
          ['Contact', emailInput.value.trim() + ' · ' + phoneInput.value.trim()],
          ['Special Notes', requestsInput.value.trim() || 'None specified']
        ];
        details.forEach(function (pair) {
          var item = document.createElement('div');
          var labelStrong = document.createElement('strong');
          labelStrong.textContent = pair[0] + ': ';
          var valSpan = document.createElement('span');
          valSpan.textContent = pair[1];
          item.appendChild(labelStrong);
          item.appendChild(valSpan);
          summaryBox.appendChild(item);
        });
      }

      if (confirmationBox) {
        confirmationBox.classList.add('is-visible');
        confirmationBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. Accessible Contact Form Validation & Sample Social Profile Links
     -------------------------------------------------------------------------- */
  function initContactFormAndSocials() {
    var contactForm = document.getElementById('contact-form');
    var nameInput = document.getElementById('contact-name');
    var emailInput = document.getElementById('contact-email');
    var topicInput = document.getElementById('contact-topic');
    var messageInput = document.getElementById('contact-message');
    var sampleFillBtn = document.getElementById('contact-sample-fill');
    var confirmationBox = document.getElementById('contact-demo-confirmation');
    var summaryText = document.getElementById('contact-confirmation-text');

    function validateContactField(field) {
      var id = field.id;
      var val = field.value.trim();
      var errEl = document.getElementById(id + '-error');

      if (id === 'contact-name') {
        if (!val || val.length < 2) {
          setFieldError(field, errEl, 'Please enter your name (at least 2 characters).');
          return false;
        }
        setFieldError(field, errEl, '');
        return true;
      }

      if (id === 'contact-email') {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val || !emailPattern.test(val)) {
          setFieldError(field, errEl, 'Please enter a valid email address.');
          return false;
        }
        setFieldError(field, errEl, '');
        return true;
      }

      if (id === 'contact-topic') {
        if (!val) {
          setFieldError(field, errEl, 'Please choose an inquiry topic.');
          return false;
        }
        setFieldError(field, errEl, '');
        return true;
      }

      if (id === 'contact-message') {
        if (!val || val.length < 12) {
          setFieldError(field, errEl, 'Please enter a brief message (at least 12 characters).');
          return false;
        }
        setFieldError(field, errEl, '');
        return true;
      }

      return true;
    }

    if (contactForm) {
      var fields = [nameInput, emailInput, topicInput, messageInput];
      fields.forEach(function (field) {
        if (!field) return;
        field.addEventListener('blur', function () {
          validateContactField(field);
        });
        field.addEventListener('input', function () {
          if (field.getAttribute('aria-invalid') === 'true') {
            validateContactField(field);
          }
        });
      });

      if (sampleFillBtn) {
        sampleFillBtn.addEventListener('click', function () {
          nameInput.value = 'Marcus Holloway';
          emailInput.value = 'm.holloway@austin-events.example';
          topicInput.value = 'Private Dining & Courtyard Buyout (9–28 Guests)';
          messageInput.value = 'Hello Ember & Olive team, we are exploring a private post-oak tasting dinner for 16 guests next month and would love to review your seasonal group menus.';
          fields.forEach(function (f) {
            validateContactField(f);
          });
        });
      }

      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var firstInvalid = null;
        fields.forEach(function (field) {
          var ok = validateContactField(field);
          if (!ok && !firstInvalid) {
            firstInvalid = field;
          }
        });

        if (firstInvalid) {
          firstInvalid.focus();
          return;
        }

        if (summaryText) {
          summaryText.textContent =
            'Thank you, ' +
            nameInput.value.trim() +
            '. Your sample inquiry regarding "' +
            topicInput.value +
            '" passed client-side validation. Because Ember & Olive is a fictional portfolio project with no connected email server, this message was validated locally in your browser and not transmitted.';
        }

        if (confirmationBox) {
          confirmationBox.classList.add('is-visible');
          confirmationBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }

    /* Social Media Sample Buttons */
    var socialBtns = document.querySelectorAll('.social-sample-btn');
    var socialFeedback = document.getElementById('social-sample-feedback');

    socialBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var platform = btn.getAttribute('data-social-platform') || 'Social Channel';
        if (socialFeedback) {
          socialFeedback.textContent =
            'Sample Social Profile Preview: ' +
            platform +
            ' — Ember & Olive is a fictional restaurant created for a web development portfolio, so no live third-party social media account is linked.';
          socialFeedback.classList.add('is-visible');
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     8. Back-to-Top Control
     -------------------------------------------------------------------------- */
  function initBackToTop() {
    var backBtn = document.getElementById('back-to-top');
    if (!backBtn) return;

    function toggleBackBtn() {
      if (window.scrollY > 640) {
        backBtn.classList.add('is-visible');
      } else {
        backBtn.classList.remove('is-visible');
      }
    }

    window.addEventListener('scroll', toggleBackBtn, { passive: true });
    toggleBackBtn();

    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      var brandLink = document.getElementById('brand-home-link');
      if (brandLink) {
        brandLink.focus({ preventScroll: true });
      }
    });
  }
})();
