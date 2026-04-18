export function initTheme() {
  const themeToggle = document.getElementById('themeToggle') as HTMLButtonElement | null;

  const updateLabel = (theme: string) => {
    themeToggle?.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  };

  themeToggle?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('debesh-blog-theme', next);
    updateLabel(next);
  });

  updateLabel(document.documentElement.dataset.theme ?? 'light');
}
