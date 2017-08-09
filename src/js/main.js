import {NodeGarden, pixelRatio} from './nodegarden.js';
import {} from 'normalize.css';
import {} from '../scss/main.scss';

window.addEventListener('load', () => {
	// Deobfuscate email address
	[].forEach.call(document.querySelectorAll('[data-rot13-href]'), element => {
		// Super-secure quantum-based data encryption algorithm!!1!!111
		element.setAttribute('href', element.getAttribute('data-rot13-href').replace(/[a-z]/gi, s => {
			return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13));
		}));
	});

	if (window.matchMedia && window.matchMedia('(min-device-width: 768px)').matches) {
		let $container = document.body;

		let nodeGarden = new NodeGarden($container);
		nodeGarden.start();

		let resetNode = 0;
		$container.addEventListener('click', event => {
			resetNode++;

			if (resetNode > nodeGarden.nodes.length - 1) {
				resetNode = 1;
			}

			nodeGarden.nodes[resetNode].reset({
				x: event.pageX * pixelRatio,
				y: event.pageY * pixelRatio,
				vx: 0,
				vy: 0
			});
		});

		window.addEventListener('resize', () => {
			nodeGarden.resize();
		});
	}
});
