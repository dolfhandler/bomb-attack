import { Game } from "./Game.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const game = new Game(ctx, canvas);
console.log("game run ", game);
game.start();
