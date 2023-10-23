
import React from "react";

import { Jwt } from "jsonwebtoken";

import { useCookies } from "react-cookie";
import { useState } from "react";

import Cookies from "js-cookie";

import jwtDecode from "jwt-decode";

export default function HomePage() {

	// recuperation du cookie //
let coco = Cookies.get('AUTH_TOKEN');	

if (!coco)
	return (<> </>);

	// extraction du code JWT depuis le cookie //
const regex = /"(.*?)"/g;
let matches = [];
let match;

let raw_jwt : string = "";
while ((match = regex.exec(coco)) !== null) {
	matches.push(match[1]);
}
if (matches.length == 2) {
	raw_jwt = matches[1];

} else {
	console.log("Pas trouvé");
}

console.log('ON A : jwt [', raw_jwt, ']');

	// decodage du token jwt // attention les parametres de decoded seront different !
var decoded: { username: string, iat: number };

decoded = jwtDecode(raw_jwt);

	// token jwt decode //
console.log(decoded);

return (
		<div style={{ textAlign: 'center' }}>
		<h1> Bienvenue {decoded.username} </h1>
		</div>
	   );
}

//const [cookies] = useCookies();

//	function getCookie(name: string): string | null {
//    const value = `; ${document.cookie}`;
//	return value;
//    const parts = value.split(`; ${name}=`);
//    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
//    return null;
//}
//
//const myCookie: string | null = getCookie('AUTH_TOKEN');
//
//	console.log("%c voiture", "color:red");

//let value = getCookie('AUTH_TOKEN');

//let value = document.cookie;

//console.log(value);
//console.dir(myCookie, { depth: null })
