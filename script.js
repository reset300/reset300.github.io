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

  if (cfg.trailer) {
    const section = document.querySelector('#trailer');
    const frame = document.querySelector('.js-trailer');
    frame.src = cfg.trailer;
    section.classList.remove('is-hidden');
  }

  const dialog = document.querySelector('#lightbox');
  const dialogImg = dialog.querySelector('img');
  document.querySelectorAll('.frame').forEach((frame) => {
    frame.addEventListener('click', () => {
      dialogImg.src = frame.dataset.image;
      dialog.showModal();
    });
  });
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  const canvas = document.querySelector('#staticCanvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const size = 96;
  canvas.width = size;
  canvas.height = size;
  const image = ctx.createImageData(size, size);
  let last = 0;

  const drawStatic = (time) => {
    if (time - last > 85) {
      last = time;
      for (let i = 0; i < image.data.length; i += 4) {
        const band = Math.sin((i / 4 / size) * .19) * 14;
        const value = Math.max(10, Math.min(225, 82 + Math.random() * 145 + band));
        image.data[i] = value;
        image.data[i + 1] = value;
        image.data[i + 2] = value;
        image.data[i + 3] = 255;
      }
      ctx.putImageData(image, 0, 0);
    }
    requestAnimationFrame(drawStatic);
  };
  requestAnimationFrame(drawStatic);
})();
