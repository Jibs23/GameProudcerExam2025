function updateEnrollmentStatus() {
    const today = new Date();
    const year = today.getFullYear();

    // Enrollment period for this year
    const enrollmentOpen = new Date(`${year}-05-01T00:00:00+02:00`);
    const enrollmentClose = new Date(`${year}-08-01T23:59:59+02:00`);

	// If today is before the enrollment period starts, we need to check next year's dates
    const statusElement = document.getElementById('enrollment-status');
    if (!statusElement) {
        console.error("ERROR: could not verify if enrollment was open");
        return;
    }

	// Check if today is within the enrollment period
    if (today >= enrollmentOpen && today <= enrollmentClose) {
        statusElement.textContent = "ENROLLMENT OPEN NOW!";
    } else {
        let nextOpen;
		// If today is before the enrollment period, set next open to this year's start date
        if (today < enrollmentOpen) {
            nextOpen = enrollmentOpen;
        } 
		// If today is after the enrollment period, set next open to next year's start date
		else {
            nextOpen = new Date(`${year + 1}-05-01T00:00:00+02:00`);
        }
		// Format the date to 'dd/mm/yyyy' in the Denmark timezone
        statusElement.textContent = `Enrollment opens ${nextOpen.toLocaleDateString('en-GB', { timeZone: 'Europe/Copenhagen' })}`;
    }
}

// Run on page load
window.addEventListener('DOMContentLoaded', updateEnrollmentStatus);