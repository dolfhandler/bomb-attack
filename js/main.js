import { Game } from "./Game.js";

const canvas = document.getElementById("canvas");
const canvas2 = document.getElementById("canvas2");
const ctx = canvas.getContext("2d");
const ctx2 = canvas2.getContext("2d");

const game = new Game([ctx,ctx2], canvas);
console.log("game run ", game);
game.start();
