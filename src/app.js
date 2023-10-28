import './css/style.css';

import Icon from './assets/images/icon.png';

import _ from 'lodash';
import Data from './data/data.xml';
import Notes from './data/data.csv';
import toml from './data/data.toml';
import yaml from './data/data.yaml';
import json from './data/data.json5';

import alertMe from './alert.js';

console.log(toml.title); // output `TOML Example`
console.log(toml.owner.name); // output `Tom Preston-Werner`

console.log(yaml.title); // output `YAML Example`
console.log(yaml.owner.name); // output `Tom Preston-Werner`

console.log(json.title); // output `JSON5 Example`
console.log(json.owner.name); // output `Tom Preston-Werner`


const main = document.querySelector('main');

function component() {
	const element = document.createElement('div'); 
	const header = document.createElement('h3');
	
	// Lodash, currently included via a script, is required for this line to work
	header.innerHTML = _.join(['Hello', 'webpack'], ' ');
	element.classList.add('container');
	
	const myIcon = new Image(100);
	myIcon.src = Icon;

	const button = document.createElement('button');
	button.innerHTML = 'Click me and get alerted!';
	button.onclick = alertMe;
	
	element.appendChild(header);
	element.appendChild(myIcon);
	element.appendChild(button);

	console.log(Data);
	console.log(Notes);

	return element;
}

main.appendChild(component());