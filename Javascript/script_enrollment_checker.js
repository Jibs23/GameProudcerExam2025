const enrollmentOpen = new Date('2025-05-01T00:00:00+02:00');
const enrollmentClose = new Date('2025-08-01T23:59:59+02:00');

function updateEnrollmentStatus() {
	const today = new Date();

	const statusElement = document.getElementById('enrollment-status');
	if (!statusElement) {
		console.error("ERROR: could not verify if enrollment was open");
		return;
	}
	if (today >= enrollmentOpen && today <= enrollmentClose) {
		statusElement.textContent = "ENROLLMENT OPEN NOW!";
	} else {
		// Enrollment closed, show next opening
		const nextOpen = new Date('2026-06-01T00:00:00+02:00');
		statusElement.textContent = `Enrollment opens ${nextOpen.toLocaleDateString('en-GB', { timeZone: 'Europe/Copenhagen' })}`;
	}
}

// Run on page load
window.addEventListener('DOMContentLoaded', updateEnrollmentStatus);