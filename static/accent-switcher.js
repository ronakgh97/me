(function () {
	const defaultColor = document.documentElement.style.getPropertyValue("--accent-color") ||
		getComputedStyle(document.documentElement).getPropertyValue("--accent-color").trim();

	const stored = localStorage.getItem("accent");

	function applyAccent(color) {
		if (!color) return;
		document.documentElement.style.setProperty("--accent-color", color);
		const alpha = color + "1a";
		document.documentElement.style.setProperty("--accent-color-alpha", alpha);

		document.querySelectorAll(".accent-btn").forEach(function (btn) {
			btn.style.border = btn.dataset.color === color
				? "2px solid var(--fg-color)"
				: "2px solid transparent";
		});
	}

	if (stored) {
		applyAccent(stored);
	}

	document.querySelectorAll(".accent-btn").forEach(function (btn) {
		if (stored && btn.dataset.color === stored) {
			btn.style.border = "2px solid var(--fg-color)";
		}

		btn.addEventListener("click", function () {
			var color = this.dataset.color;
			applyAccent(color);
			localStorage.setItem("accent", color);
		});
	});
})();
