let currentSlide = 0;

// Select all carousells on the page
document.querySelectorAll('.carousell').forEach(carousell => {
  const slides = carousell.querySelectorAll('.carousell-slide');
  const prevBtn = carousell.querySelector('.carousell-btn:first-of-type');
  const nextBtn = carousell.querySelector('.carousell-btn:last-of-type');
  const animationDuration = 400; // ms, match your CSS animation duration
  let localCurrent = 0;
  let isAnimating = false;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active'); // Ensure all others are not active
      }
    });
  }

  function setButtonsDisabled(disabled) {
    if (prevBtn) prevBtn.disabled = disabled;
    if (nextBtn) nextBtn.disabled = disabled;
  }

function goToSlide(direction) {
	if (isAnimating) return;
	isAnimating = true;
	setButtonsDisabled(true);

	const prevIndex = localCurrent;
	if (direction === 1) {
		localCurrent = (localCurrent + 1) % slides.length;
	} else if (direction === -1) {
		localCurrent = (localCurrent - 1 + slides.length) % slides.length;
	}

	// Mark outgoing slide
	slides[prevIndex].setAttribute(
		'data-carousell-signal',
		direction === 1 ? 'exit-next' : 'exit-prev'
	);
	// Remove signal from all others
	slides.forEach((slide, i) => {
		if (i !== prevIndex) slide.removeAttribute('data-carousell-signal');
	});

	showSlide(localCurrent);
	void slides[localCurrent].offsetWidth;
	slides[localCurrent].setAttribute(
		'data-carousell-signal',
		direction === 1 ? 'next' : 'previous'
	);

	setTimeout(() => {
		slides[prevIndex].classList.remove('active');
		slides[prevIndex].removeAttribute('data-carousell-signal');
		isAnimating = false;
		setButtonsDisabled(false);
	}, animationDuration);
}

function nextSlide() {
	goToSlide(1);
}

function prevSlide() {
	goToSlide(-1);
}

  // Attach event listeners to the buttons
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
  }

  // Initialize
  showSlide(localCurrent);
});