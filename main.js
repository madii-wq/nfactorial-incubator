class Colour {
	constructor(hex, element) {
		this.hex = hex;
		this.element = element;
		this.locked = false;
	}

	setHex(hex) {
		this.hex = hex;
		this.element.style.backgroundColor = hex;
		this.element.querySelector(".colour-input").value = hex;
	}

	setLocked(locked) {
		this.locked = locked;

		if (locked) {
			this.element
				.querySelector(".lock-toggle")
				.classList.add("is-locked");

			this.element
				.querySelector("img")
				.src = "icons/lock-closed.svg";
		} else {
			this.element
				.querySelector(".lock-toggle")
				.classList.remove("is-locked");

			this.element
				.querySelector("img")
				.src = "icons/lock-open.svg";
		}
	}

	toggleLocked() {
		this.setLocked(!this.locked);
	}

	generateHex() {
		if (this.locked) {
			return
		}
		
		const chars = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += chars[Math.floor(Math.random() * 16)];
		}
		
		this.setHex(color);
	}

	copyToClipboard() {
		const input = this.element.querySelector(".colour-input");
		input.select();
		document.execCommand("copy");
		input.blur();

		this.element.classList.add("copied");
		setTimeout(() => {
			this.element.classList.remove("copied");
		}, 1000);
	}
}

const colour_elements = document.querySelectorAll('.colours .colour');

const colours = [];

for (let i = 0; i < colour_elements.length; i++) {
	const colour_element = colour_elements[i];

	const input = colour_element.querySelector(".colour-input");
	const lock_toggle = colour_element.querySelector(".lock-toggle");
	const copy_btn = colour_element.querySelector(".copy-hex");

	const hex = input.value;

	const colour = new Colour(hex, colour_element);

	input.addEventListener('input', (e) => colour.setHex(e.target.value));
	lock_toggle.addEventListener('click', () => colour.toggleLocked());
	copy_btn.addEventListener('click', () => colour.copyToClipboard());

	colour.generateHex();
	colours.push(colour);
}

document.querySelector(".generator-button").addEventListener("click", () => {
	for (let i = 0; i < colours.length; i++) {
		colours[i].generateHex();
	}
});

document.addEventListener('keypress', (e) => {
	if (e.code.toLowerCase() === "space") {
		document.querySelector(".generator-button").click();
	}
})
window.onload = function() {
    updateColor(); // Call updateColor to set the initial color and RGBA value
}
let currentRGBAColor = "";

let slider_red = document.getElementById("red");
let slider_green = document.getElementById("green");
let slider_blue = document.getElementById("blue");
let slider_alpha = document.getElementById("alpha");

let span_red = document.getElementById("red-span");
let span_green = document.getElementById("green-span");
let span_blue = document.getElementById("blue-span");
let span_alpha = document.getElementById("alpha-span");

let current_color = document.getElementById("current-color");

function updateColor() {
    let rgbaValue = `rgba(${slider_red.value}, ${slider_green.value}, ${slider_blue.value}, ${slider_alpha.value})`;
    current_color.style.backgroundColor = rgbaValue;
	currentRGBAColor = rgbaValue;
}

slider_red.oninput = function() {
    span_red.innerHTML = this.value;
    updateColor();
}

slider_green.oninput = function() {
    span_green.innerHTML = this.value;
    updateColor();
}

slider_blue.oninput = function() {
    span_blue.innerHTML = this.value;
    updateColor();
}

slider_alpha.oninput = function() {
    span_alpha.innerHTML = this.value;
    updateColor();
}

let clrpkr = document.getElementById("clrpkr");
let clrpkr_copy_button = document.getElementById("clrpkr-copy");
let clrpkr_select_button = document.getElementById("clrpkr-selector");

clrpkr.oninput = function() {
    clrpkr_copy_button.value = clrpkr.value;
	clrpkr_select_button.value = clrpkr.value;
};
function RGBAToHexA(rgba, forceRemoveAlpha = false) {
	return "#" + rgba.replace(/^rgba?\(|\s+|\)$/g, '')
	  .split(',')
	  .filter((string, index) => !forceRemoveAlpha || index !== 3)
	  .map(string => parseFloat(string))
	  .map((number, index) => index === 3 ? Math.round(number * 255) : number)
	  .map(number => number.toString(16))
	  .map(string => string.length === 1 ? "0" + string : string)
	  .join("")
  }
function hexToRGB(hex, alphaYes) {
    hex = hex.replace(/^#/, '');

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    if (alphaYes) {
        let alpha = 1;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
        return `rgb(${r}, ${g}, ${b})`;
    }
}

clrpkr_select_button.onclick = function(){
    let rgba_value = hexToRGB(clrpkr.value, true);
	current_color.value = rgba_value;
    current_color.style.backgroundColor = rgba_value;
	currentRGBAColor = rgba_value;
}

clrpkr_copy_button.onclick = function() {
    navigator.clipboard.writeText(clrpkr.value)
        .then(() => {
            console.log('Color value copied to clipboard');
        })
        .catch(err => {
            console.error('Unable to copy color value: ', err);
        });
};
let copy_current_color = document.getElementById("current-color-copy");

copy_current_color.onclick = function(){
	navigator.clipboard.writeText(RGBAToHexA(currentRGBAColor))
        .then(() => {
            console.log('Color value copied to clipboard');
        })
        .catch(err => {
            console.error('Unable to copy color value: ', err);
        });
}


