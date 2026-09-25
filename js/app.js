/**
 * MoizCare - SIM-RS Terintegrasi & Modern
 * CV. Panda Global Teknologi
 * Master Application Script
 */

function startApp() {
  initNavbar();
  initHeroSlideshow();
  initTabs();
  initOdontogram();
  initPainScale();
  initQueueTTS();
  initFhirViewer();
  initRoiCalculator();
  initPortfolioFilter();
  initLeadForm();
  initLightbox();
  initScrollTop();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}

/* ==========================================================================
   1. Navbar & Smooth Scroll
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Active section indicator
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. Interactive Module Tabs
   ========================================================================== */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.getElementById(target);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. Interactive Odontogram Component (Tab 1)
   ========================================================================== */
function initOdontogram() {
  const toothItems = document.querySelectorAll('.tooth-item');
  const statusOptions = document.querySelectorAll('.dental-option');
  const dentalLog = document.getElementById('dentalLog');
  let currentStatus = 'karies'; // default selected condition

  // Condition selector buttons
  statusOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      statusOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      currentStatus = opt.dataset.condition;
    });
  });

  // Tooth click listener
  toothItems.forEach(tooth => {
    tooth.addEventListener('click', () => {
      const toothNum = tooth.dataset.tooth;
      
      // Remove previous status classes
      tooth.classList.remove('status-karies', 'status-tambalan', 'status-cabut');

      if (currentStatus === 'normal') {
        // back to normal
      } else {
        tooth.classList.add(`status-${currentStatus}`);
      }

      // Update log preview
      if (dentalLog) {
        let label = 'Normal';
        if (currentStatus === 'karies') label = 'Karies Oklusal (D02)';
        else if (currentStatus === 'tambalan') label = 'Tambalan Komposit (F01)';
        else if (currentStatus === 'cabut') label = 'Missing / Ekstraksi (X01)';
        
        dentalLog.innerHTML = `<span class="text-cyan">Elemen Gigi ${toothNum}:</span> Diagnosa tercatat sebagai <strong>${label}</strong>. Sinkron ke RME Poli Gigi & Satu Sehat.`;
      }
    });
  });
}

/* ==========================================================================
   4. Skala Nyeri FLACC & Wong-Baker Slider (Tab 1)
   ========================================================================== */
function initPainScale() {
  const slider = document.getElementById('painSlider');
  const painVal = document.getElementById('painVal');
  const painLevel = document.getElementById('painLevel');
  const painAction = document.getElementById('painAction');
  const painEmoji = document.getElementById('painEmoji');

  if (!slider) return;

  const painData = [
    { level: '0 - Tidak Nyeri', emoji: '😊', action: 'Tidak memerlukan intervensi farmakologis' },
    { level: '1 - Nyeri Sangat Ringan', emoji: '🙂', action: 'Observasi berkala, edukasi relaksasi' },
    { level: '2 - Nyeri Ringan', emoji: '😐', action: 'Observasi, evaluasi postur atau kompres hangat' },
    { level: '3 - Nyeri Ringan', emoji: '😕', action: 'Pertimbangkan Paracetamol oral bila diperlukan' },
    { level: '4 - Nyeri Sedang', emoji: '🙁', action: 'Analgetik non-opioid (Paracetamol / NSAID oral)' },
    { level: '5 - Nyeri Sedang', emoji: '😟', action: 'Kombinasi analgetik & pemantauan tanda vital' },
    { level: '6 - Nyeri Sedang Berat', emoji: '😣', action: 'NSAID injeksi / Pertimbangan opioid ringan' },
    { level: '7 - Nyeri Berat Terkontrol', emoji: '😫', action: 'Kolaborasi DPJP, opioid sistemik terkontrol' },
    { level: '8 - Nyeri Berat', emoji: '😭', action: 'Protokol nyeri berat, evaluasi skala tiap 2 jam' },
    { level: '9 - Nyeri Sangat Berat', emoji: '😱', action: 'Konsultasi Tim Manajemen Nyeri & Anestesi' },
    { level: '10 - Nyeri Tak Tertahankan', emoji: '🚨', action: 'Darurat Nyeri: Manajemen intervensi segera' }
  ];

  slider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    const data = painData[val];
    if (painVal) painVal.textContent = val;
    if (painLevel) painLevel.textContent = data.level;
    if (painAction) painAction.textContent = data.action;
    if (painEmoji) painEmoji.textContent = data.emoji;
  });
}

/* ==========================================================================
   5. TV Queue & Live Text-To-Speech Caller (Tab 2)
   ========================================================================== */
function initQueueTTS() {
  const callBtn = document.getElementById('callQueueBtn');
  const nextBtn = document.getElementById('nextQueueBtn');
  const queueDisplayNum = document.getElementById('currentQueueNum');
  const queuePoliName = document.getElementById('currentQueuePoli');

  let queueIndex = 24;
  const queues = [
    { num: 'A-024', poli: 'Poli Penyakit Dalam - Dokter Spesialis' },
    { num: 'B-015', poli: 'Poli Anak & Tumbuh Kembang' },
    { num: 'C-008', poli: 'Poli Bedah Umum' },
    { num: 'F-042', poli: 'Apotek & Farmasi Rawat Jalan' }
  ];

  let currentItem = 0;

  function speakQueue(num, poli) {
    // Play bell tone simulation with Web Audio API
    playQueueChime();

    // Voice announcement after brief chime
    setTimeout(() => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // clear previous speech
        const text = `Nomor antrean... ${num.replace('-', ' ')}... silakan menuju... ${poli}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID';
        utterance.rate = 0.9;
        utterance.pitch = 1.05;
        
        // Try finding Indonesian voice if available
        const voices = window.speechSynthesis.getVoices();
        const idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID'));
        if (idVoice) utterance.voice = idVoice;

        window.speechSynthesis.speak(utterance);
      }
    }, 600);
  }

  function playQueueChime() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc1.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.3); // E5

      osc2.frequency.setValueAtTime(659.25, ctx.currentTime + 0.3);
      osc2.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.6); // G5

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.4);
      osc2.start(ctx.currentTime + 0.3);
      osc2.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.log('Audio API not active yet or needs user interaction');
    }
  }

  if (callBtn) {
    callBtn.addEventListener('click', () => {
      const num = queueDisplayNum.textContent.trim();
      const poli = queuePoliName.textContent.trim();
      speakQueue(num, poli);
      showToast(`📢 Memanggil ${num} menuju ${poli}`);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentItem = (currentItem + 1) % queues.length;
      const nextItem = queues[currentItem];
      queueDisplayNum.textContent = nextItem.num;
      queuePoliName.textContent = nextItem.poli;
      speakQueue(nextItem.num, nextItem.poli);
      showToast(`⏩ Antrean berikutnya: ${nextItem.num}`);
    });
  }
}

/* ==========================================================================
   6. FHIR JSON Inspector (Tab 3)
   ========================================================================== */
function initFhirViewer() {
  const fhirTabs = document.querySelectorAll('.fhir-selector-btn');
  const fhirPre = document.getElementById('fhirJsonContent');

  const fhirSamples = {
    encounter: {
      "resourceType": "Encounter",
      "id": "moizcare-enc-20260924-001",
      "status": "in-progress",
      "class": {
        "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
        "code": "AMB",
        "display": "ambulatory / rawat jalan"
      },
      "subject": {
        "reference": "Patient/10000004",
        "display": "Ahmad Fauzi (NIK: 1471082309850001)"
      },
      "serviceProvider": {
        "reference": "Organization/10082736",
        "display": "CV. Panda Global Teknologi - RS Mitra"
      },
      "period": {
        "start": "2026-09-24T08:15:00+07:00"
      },
      "moizcareSyncStatus": "SYNCED_HL7_FHIR_R4_SUCCESS"
    },
    condition: {
      "resourceType": "Condition",
      "id": "moizcare-cond-icd10-098",
      "clinicalStatus": {
        "coding": [{
          "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
          "code": "active"
        }]
      },
      "category": [{
        "coding": [{
          "system": "http://terminology.hl7.org/CodeSystem/condition-category",
          "code": "encounter-diagnosis",
          "display": "Encounter Diagnosis"
        }]
      }],
      "code": {
        "coding": [{
          "system": "http://hl7.org/fhir/sid/icd-10",
          "code": "I10",
          "display": "Essential (primary) hypertension"
        }]
      },
      "subject": { "reference": "Patient/10000004" }
    },
    medication: {
      "resourceType": "MedicationRequest",
      "id": "moizcare-med-kfa-7741",
      "status": "active",
      "intent": "order",
      "medicationCodeableConcept": {
        "coding": [{
          "system": "http://sys-ids.kemkes.go.id/kfa",
          "code": "93001024",
          "display": "Amlodipine Besylate 10 mg Tablet (E-Katalog KFA)"
        }]
      },
      "dosageInstruction": [{
        "text": "1 kali sehari 1 tablet sesudah makan",
        "timing": { "repeat": { "frequency": 1, "period": 1, "periodUnit": "d" } }
      }]
    }
  };

  if (fhirTabs.length > 0 && fhirPre) {
    fhirTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        fhirTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const type = btn.dataset.fhir;
        if (fhirSamples[type]) {
          fhirPre.textContent = JSON.stringify(fhirSamples[type], null, 2);
        }
      });
    });
  }
}

/* ==========================================================================
   7. Interactive ROI & Investment Calculator
   ========================================================================== */
function initRoiCalculator() {
  const bedSlider = document.getElementById('calcBeds');
  const patientSlider = document.getElementById('calcPatients');
  const bedDisplay = document.getElementById('calcBedsVal');
  const patientDisplay = document.getElementById('calcPatientsVal');

  const savingsPaper = document.getElementById('savingsPaper');
  const hoursSaved = document.getElementById('hoursSaved');
  const paybackTime = document.getElementById('paybackTime');

  if (!bedSlider || !patientSlider) return;

  function recalculate() {
    const beds = parseInt(bedSlider.value, 10);
    const patients = parseInt(patientSlider.value, 10);

    bedDisplay.textContent = `${beds} Bed`;
    patientDisplay.textContent = `${patients} Pasien/hari`;

    // Estimation formulas based on healthcare economics
    // Paper + printout + physical folder savings approx Rp 35.000 per patient per year + RM warehouse storage
    const annualPatients = patients * 300;
    const paperSavingsJt = Math.round((annualPatients * 3200) / 1000000 + (beds * 250000) / 1000000);
    
    // Admin hours saved in BPJS verification & coding (approx 2 hours/day per 50 patients)
    const hoursYear = Math.round((patients / 50) * 2 * 300);

    // Payback period for 250jt SIMRS
    // Monthly efficiency approx (paperSavingsJt / 12) + (admin efficiency approx 15jt/mo)
    const monthlyNetBenefit = (paperSavingsJt / 12) + (beds > 100 ? 25 : 15);
    const monthsPayback = Math.max(3.2, (250 / monthlyNetBenefit)).toFixed(1);

    if (savingsPaper) savingsPaper.textContent = `Rp ${paperSavingsJt.toLocaleString('id-ID')} Jt / thn`;
    if (hoursSaved) hoursSaved.textContent = `${hoursYear.toLocaleString('id-ID')} Jam / thn`;
    if (paybackTime) paybackTime.textContent = `${monthsPayback} Bulan`;
  }

  bedSlider.addEventListener('input', recalculate);
  patientSlider.addEventListener('input', recalculate);
  recalculate();
}

/* ==========================================================================
   8. Portfolio Filtering
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.client-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 20);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   9. Lead Generation Form & Direct WhatsApp Forwarder
   ========================================================================== */
function initLeadForm() {
  const form = document.getElementById('leadGenForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('leadName').value.trim();
    const role = document.getElementById('leadRole').value.trim();
    const hospital = document.getElementById('leadHospital').value.trim();
    const faskesType = document.getElementById('leadType').value;
    const phone = document.getElementById('leadPhone').value.trim();
    const demoDate = document.getElementById('leadDemoDate').value;
    const notes = document.getElementById('leadNotes').value.trim();

    if (!name || !hospital || !phone) {
      alert('Mohon lengkapi Nama, Rumah Sakit/Klinik, dan Nomor WhatsApp Anda.');
      return;
    }

    // Build structured WhatsApp message
    const waText = 
      `*PERMINTAAN LIVE DEMO SIM-RS MOIZCARE*%0A%0A` +
      `Halo Konsultan MoizCare (CV. Panda Global Teknologi), saya berminat untuk demo SIMRS:%0A` +
      `• *Nama*: ${name}%0A` +
      `• *Jabatan*: ${role || '-' }%0A` +
      `• *Instansi/Faskes*: ${hospital}%0A` +
      `• *Tipe Faskes*: ${faskesType}%0A` +
      `• *No. WhatsApp*: ${phone}%0A` +
      `• *Rencana Demo*: ${demoDate || 'Segera'}%0A` +
      `• *Kebutuhan Khusus*: ${notes || 'Integrasi Satu Sehat & Modul RME Lengkap'}%0A%0A` +
      `Mohon dihubungi untuk konfirmasi jadwal. Terima kasih.`;

    const waUrl = `https://wa.me/6285365811832?text=${waText}`;

    showToast('🚀 Menyiapkan format WhatsApp untuk Ahmad Tohar, S.Kom...');
    
    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(waUrl, '_blank');
      form.reset();
      showToast('✅ Berhasil diteruskan! Anda juga dapat email ke moizclient30@gmail.com');
    }, 800);
  });
}

/* ==========================================================================
   10. Lightbox Modal
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalVideo = document.getElementById('lightboxVideo');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.querySelector('.modal-close-btn');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const videoSrc = trigger.dataset.video || (trigger.tagName === 'VIDEO' ? trigger.getAttribute('src') : null);
      const imgSrc = trigger.dataset.full || (trigger.tagName === 'IMG' ? trigger.getAttribute('src') : null);
      const caption = trigger.dataset.caption || 'Antarmuka Sistem Informasi Manajemen RS MoizCare';

      if (!modal) return;

      if (videoSrc && modalVideo) {
        if (modalImg) modalImg.style.display = 'none';
        modalVideo.style.display = 'block';
        modalVideo.src = videoSrc;
        modalVideo.play().catch(() => {});
      } else if (imgSrc && modalImg) {
        if (modalVideo) {
          modalVideo.pause();
          modalVideo.style.display = 'none';
        }
        modalImg.style.display = 'block';
        modalImg.src = imgSrc;
      }

      if (modalCaption) modalCaption.textContent = caption;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.src = '';
      }
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ==========================================================================
   11. Scroll to Top & Toast Notification
   ========================================================================== */
function initScrollTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function showToast(msg) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>${msg}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   12. Hero Slideshow & Dynamic og:image Rotator from Assets
   ========================================================================== */
function initHeroSlideshow() {
  const container = document.getElementById('heroSlideshow');
  if (!container) return;

  const slides = container.querySelectorAll('.slide-item');
  const dots = container.querySelectorAll('.dot-btn');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  const soundToggleBtn = document.getElementById('heroSoundToggle');

  let currentIndex = 0;
  const totalSlides = slides.length;
  let slideTimeout = null;
  let isMuted = true;
  const maxSlideDuration = 7000; // 7 seconds per slide

  function updateSoundUI() {
    if (!soundToggleBtn) return;
    const mutedIcon = soundToggleBtn.querySelector('.sound-icon-muted');
    const unmutedIcon = soundToggleBtn.querySelector('.sound-icon-unmuted');
    if (mutedIcon) mutedIcon.style.display = isMuted ? 'block' : 'none';
    if (unmutedIcon) unmutedIcon.style.display = isMuted ? 'none' : 'block';
  }

  function updateSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;

    // Toggle active slide & manage video play / pause states
    slides.forEach((slide, i) => {
      const vid = slide.querySelector('video');
      if (i === currentIndex) {
        slide.classList.add('active');
        if (vid) {
          vid.muted = isMuted;
          vid.currentTime = 0;
          const playPromise = vid.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        }
      } else {
        slide.classList.remove('active');
        if (vid) {
          vid.pause();
          vid.currentTime = 0;
        }
      }
    });

    // Toggle active dot
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    scheduleNext();
  }

  function nextSlide() {
    updateSlide(currentIndex + 1);
  }

  function prevSlide() {
    updateSlide(currentIndex - 1);
  }

  function scheduleNext() {
    clearTimeout(slideTimeout);
    slideTimeout = setTimeout(nextSlide, maxSlideDuration);
  }

  function stopAutoPlay() {
    clearTimeout(slideTimeout);
    slideTimeout = null;
  }

  // Hook ended event on each video to auto-advance to next video smoothly
  slides.forEach((slide) => {
    const vid = slide.querySelector('video');
    if (vid) {
      vid.addEventListener('ended', () => {
        if (slide.classList.contains('active')) {
          nextSlide();
        }
      });
    }
  });

  // Sound Toggle Button
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isMuted = !isMuted;
      updateSoundUI();
      const currentVideo = slides[currentIndex]?.querySelector('video');
      if (currentVideo) {
        currentVideo.muted = isMuted;
      }
    });
  }

  // Prev / Next button listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
    });
  }

  // Dots navigation
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const slideIdx = parseInt(dot.dataset.slide, 10);
      updateSlide(slideIdx);
    });
  });

  // Pause on hover
  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', scheduleNext);

  // Touch Swipe for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 40) {
      nextSlide();
    } else if (touchEndX > touchStartX + 40) {
      prevSlide();
    } else {
      scheduleNext();
    }
  }, { passive: true });

  // Initial setup
  updateSoundUI();
  updateSlide(0);
}

