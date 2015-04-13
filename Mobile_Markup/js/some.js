window.onload = function() {
	document.getElementsByClassName("nav-btn")[0].addEventListener("click", showNav, false);
}

function showNav() {
	console.log(document.getElementsByClassName("main-nav-mobile")[0].style.display);
	var mainNav = document.getElementsByClassName("main-nav-mobile")[0].style.display;
	if (mainNav === "") {
		document.getElementsByClassName("main-nav-mobile")[0].style.display = "none";
	} else if (mainNav === "none") {
		document.getElementsByClassName("main-nav-mobile")[0].style.display = "block";
	} else {
		document.getElementsByClassName("main-nav-mobile")[0].style.display = "none";
	}
}