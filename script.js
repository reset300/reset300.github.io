(() => {
  const cfg = window.LIMEN_SITE || {};

  const wire = (selector, url) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (!url) {
        el.classList.add('is-hidden');
        return;
      }
      el.href = url;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
      el.classList.remove('is-hidden');
    });
  };

  wire('.js-modrinth', cfg.modrinth);
  wire('.js-curseforge', cfg.curseforge);
  wire('.js-discord', cfg.discord);

  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    heroVideo.pause();
    heroVideo.removeAttribute('autoplay');
  }

  if (cfg.trailer) {
    const section = document.querySelector('#trailer');
    const frame = document.querySelector('.js-trailer');
    if (section && frame) {
      frame.src = cfg.trailer;
      section.classList.remove('is-hidden');
    }
  }

  const dialog = document.querySelector('#lightbox');
  const dialogImg = dialog?.querySelector('img');
  if (dialog && dialogImg) {
    document.querySelectorAll('.shot').forEach((shot) => {
      shot.addEventListener('click', () => {
        dialogImg.src = shot.dataset.image;
        dialog.showModal();
      });
    });
    dialog.querySelector('.close')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }
})();
