document.addEventListener('DOMContentLoaded', function() {
  // Partículas no hero (mantive igual)
  const profileWrapper = document.querySelector('.profile-wrapper');
  const particleCount = 40;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 8 + 4;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 5 + 3;
    const delay = Math.random() * 4;
    const opacity = Math.random() * 0.4 + 0.1;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.opacity = opacity;
    
    profileWrapper.appendChild(particle);
  }

  // Animações de fundo com logos espalhados
  const bgAnimations = document.querySelector('.background-animations');
  const bgLogoCount = 25;
  for (let i = 0; i < bgLogoCount; i++) {
    const bgLogo = document.createElement('img');
    bgLogo.src = 'venus.png';
    bgLogo.classList.add('background-logo');
    bgLogo.style.left = `${Math.random() * 100}%`;
    bgLogo.style.top = `${Math.random() * 100}%`;
    bgLogo.style.animationDelay = `${Math.random() * 15}s`;
    bgLogo.style.animationDuration = `${Math.random() * 20 + 20}s`;
    bgAnimations.appendChild(bgLogo);
  }

  // Navegação suave
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Menu toggle para mobile
  document.querySelector('.menu-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });

  // Fade-in nas seções ao scroll
  const elements = document.querySelectorAll('.reveal, section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
  });

  // Modal de vídeos no portfólio (lazy: só carrega iframe no modal)
  const modal = document.getElementById('portfolio-modal');
  const modalVideo = document.getElementById('modal-video');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const closeBtn = document.querySelector('.modal-close');

  // Abrir modal quando clicam numa miniatura (thumbnail)
  document.querySelectorAll('.portfolio-thumb').forEach(item => {
    item.addEventListener('click', function() {
      const videoUrl = this.dataset.url;
      const embedUrl = ensureEmbedUrl(videoUrl);
      modal.style.display = 'flex';
      modalTitle.textContent = this.dataset.title || '';
      modalDesc.textContent = this.dataset.desc || '';
      // carrega o embed só no modal (lazy)
      modalVideo.src = embedUrl;
    });
  });

  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    // remover src para parar o video
    modalVideo.src = "";
  });

  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      modalVideo.src = "";
    }
  });

  // Simulação de envio de formulário
  document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Não podemos enviar mensagens neste momento');
    this.reset();
  });

  // --- Funções auxiliares ---
  function ensureEmbedUrl(url) {
    if (!url) return '';
    url = url.trim();
    // remove query
    const q = url.indexOf('?');
    if (q !== -1) url = url.substring(0, q);
    if (!url.endsWith('/')) url = url + '/';
    return url + 'embed';
  }
});