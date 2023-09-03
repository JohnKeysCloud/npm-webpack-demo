import _ from 'lodash';
import './css/style.css';

import Icon from './icon.png';
import Data from './data/data.xml';
import Notes from './data/data.csv';
import toml from './data/data.toml';
import yaml from './data/data.yaml';
import json from './data/data.json5';

import printMe from './print.js';

console.log(toml.title); // output `TOML Example`
console.log(toml.owner.name); // output `Tom Preston-Werner`

console.log(yaml.title); // output `YAML Example`
console.log(yaml.owner.name); // output `Tom Preston-Werner`

console.log(json.title); // output `JSON5 Example`
console.log(json.owner.name); // output `Tom Preston-Werner`


const main = document.querySelector('main');

function component() {
	const element = document.createElement('div'); 
	
	// Lodash, currently included via a script, is required for this line to work
	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	element.classList.add('hello');
	
	const myIcon = new Image(100);
	myIcon.src = Icon;

	const button = document.createElement('button');
	button.innerHTML = 'Click me and check the console!';
	button.onclick = printMe;
	
	
	element.appendChild(myIcon);
	element.appendChild(button);

	console.log(Data);
	console.log(Notes);

	return element;
}

main.appendChild(component());
