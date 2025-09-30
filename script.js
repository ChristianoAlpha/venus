document.addEventListener('DOMContentLoaded', function() {
  // Partículas no hero
  const profileWrapper = document.querySelector('.profile-wrapper');
  const particleCount = 40;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 8 + 4; // Aumentado o tamanho máximo para 12px
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
    particle.style.background = `hsl(43, 100%, 50%)`; // Dourado
    particle.style.borderRadius = '50%'; // Tornando as partículas circulares
    profileWrapper.appendChild(particle);
  }



  // Animações de fundo com logos
  const bgAnimations = document.querySelector('.background-animations');
  const bgLogoCount = 20; // Número de logos flutuantes no fundo
  for (let i = 0; i < bgLogoCount; i++) {
    const bgLogo = document.createElement('img');
    bgLogo.src = 'venus.png';
    bgLogo.classList.add('background-logo');
    bgLogo.style.left = `${Math.random() * 100}%`;
    bgLogo.style.animationDelay = `${Math.random() * 10}s`;
    bgLogo.style.animationDuration = `${Math.random() * 20 + 20}s`; // Lento, 20-40s
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

  // Modal para portfolio
  const modal = document.getElementById('portfolio-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const closeBtn = document.querySelector('.modal-close');

  document.querySelectorAll('.portfolio-img').forEach(img => {
    img.addEventListener('click', function() {
      modal.style.display = 'flex';
      modalImg.src = this.src;
      modalTitle.textContent = this.dataset.title || 'Título Padrão';
      modalDesc.textContent = this.dataset.desc || 'Descrição Padrão';
    });
  });

  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Simulação de envio de form
  document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! (Simulação - integre backend no Laravel para envio real)');
    this.reset();
  });
});