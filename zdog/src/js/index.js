Zdog.Anchor.prototype.renderGraphSvg = function (svg) {
	if (!svg) {
		throw new Error('svg is ' + svg + '. ' +
			'SVG required for render. Check .renderGraphSvg( svg ).');
	}
	this.flatGraph.forEach(function (item) {
		item.render(svg, Zdog.SvgRenderer);
	});
};

document.addEventListener("DOMContentLoaded", function (event) {
	// Set width and height attributes of SVG
	let canvas = document.getElementsByClassName("zdog-canvas")[0];
	canvas.setAttribute("width", window.innerWidth);
	canvas.setAttribute("height", window.outerHeight);


	let illo = new Zdog.Illustration({
		element: ".zdog-canvas",
		zoom: zoom,
		dragRotate: true
	});

	let letterB = new Zdog.Group({
		addTo: illo,
		translate: {
			x: -25
		}
	});

	let letterS = new Zdog.Group({
		addTo: illo,
		translate: {
			x: 25
		}
	});

	const addZProperty = (array, z) => {
		array.forEach(function (e) {
			e.z = z;
		})
		return array;
	}

	let colorNumber = null;

	const getColors = _ => {
		if (colorNumber != null) {
			return colorNumber
		} else {
			colorNumber = colors[Math.floor(Math.random() * (colors.length - 0) + 0)];
			return colorNumber;
		}
	}

	const generateLetter = (array, letter) => {
		const colorArray = getColors();
		var prevColor = 0;

		const randomColor = (prev) => {
			let number = Math.floor(Math.random() * (5 - 0 + 0));

			if (prev != number) {
				prevColor = number;
				return prevColor;
			} else if (number <= 5) {
				prevColor = number - 1;
				return prevColor;
			} else if (number == 0) {
				prevColor = number + 1;
				return prevColor;
			}
		}

		for(let i = 0; i < amount; i++) {
			new Zdog.Shape({
				addTo: letter,
				path: addZProperty(array, (i * - distance)),
				color: colorArray[randomColor(prevColor)],
				stroke: strokeWidth,
				fill: false,
				closed: false
			})
		}
	}

	generateLetter(bArray, letterB);
	generateLetter(sArray, letterS);

	function animate() {
		// Rotate illo each frame
		illo.rotate.x += speed;
		illo.rotate.y += speed;
		illo.rotate.z += speed + 0.01;
		illo.updateRenderGraph();

		// Animate next frame
		requestAnimationFrame(animate);
	}
	// Start animation
	animate();
});

