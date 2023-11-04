import React, { useRef, useEffect, useState } from 'react';

const Pong = () => {

	const [leftPaddleY, setLeftPaddleY] = useState(300);

	const [rightPaddleY, setRightPaddleY] = useState(300);

	//const [ball, setBall] = useState({ x: 320, y: 240, radius: 10, dx: 1, dy: 0 });

	//let ball = { x: 320, y: 240, radius: 10, dx: -3, dy: 0 };

	//epaisseur totale du canva
	let wwidth = 300;
	//hauteur totale du canva
	let hheight = 600;
	//hauteur paddle
	let paddleHeight = 80;
	//epaisseur paddle
	let paddleWidth = 10;
	//radius de la balle
	let ballRadius = 10;
	//pas mouvement paddle
	let paddleStep = 3;

	// vitesse vertivale de la balle
	let ballDx = 3;
	//vitesse horizontale
	let ballDy = 0;


//setup first angle of the ball
//useEffect( () => {
//	changeBallAngle(toRadians(0));
//}, []);

	const ballRef = useRef({ x: wwidth / 2, y: hheight / 2, radius: 10, dx: ballDx, dy: ballDy });

	const canvasRef = useRef(null);

	//Fonction qui permet de donner un angle donne a la basse sans changer la vitesse
	const changeBallAngle = (theta) => {
    const currentDx = ballRef.current.dx;
    const currentDy = ballRef.current.dy;
    const currentSpeed = Math.sqrt(currentDx * currentDx + currentDy * currentDy);

    ballRef.current.dx = currentSpeed * Math.cos(theta);
    ballRef.current.dy = currentSpeed * Math.sin(theta);
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

	let leftPaddle = { x: 35, y: leftPaddleY, width: paddleWidth, height: paddleHeight, dy: 0 };

	let rightPaddle = { x: wwidth - 40, y: rightPaddleY, width: paddleWidth, height: paddleHeight, dy: 0 };

	let border_top = { x: 0, y: 0, width: wwidth, height: 3};
	let border_bot = { x: 0, y: hheight - 3, width: wwidth, height: 3};
	let border_left = { x: 0, y: 0, width: 3, height: hheight};
	let border_right = { x: wwidth - 3, y: 0, width: 3, height: hheight};


	useEffect(() => {
		const handleKeyDown = (event) => {

			if (event.keyCode === 87) { // 'W' key
				if (leftPaddle.y > (paddleHeight / 2)) 
					setLeftPaddleY((prevY) => prevY - paddleStep); 
			}

			if (event.keyCode === 83) { // 'S' key
				if (leftPaddle.y + leftPaddle.height < hheight - (paddleHeight / 2)) 
					setLeftPaddleY((prevY) => prevY + paddleStep);
			}
		};
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown); // Cleanup on unmount
		};
	}, [leftPaddleY]);

	useEffect(() => {
		const handleKeyDown = (event) => {

			if (event.keyCode === 38) { // 'W' key
				if (rightPaddle.y > (paddleHeight / 2)) 
					setRightPaddleY((prevY) => prevY - paddleStep); 
			}

			if (event.keyCode === 40) { // 'S' key
				if (rightPaddle.y + rightPaddle.height < hheight - (paddleHeight / 2)) 
					setRightPaddleY((prevY) => prevY + paddleStep);
			}
		};
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown); // Cleanup on unmount
		};
	}, [rightPaddleY]);



	useEffect(() => {

		const canvas = canvasRef.current;
		if (!canvas)
			return; //gpt
		const context = canvas.getContext('2d');

		let animation_id;

		const update = () => {

			const ballX = ballRef.current.x;
			const ballY = ballRef.current.y;

			let newDx = ballRef.current.dx;
			let newDy = ballRef.current.dy;

			//// CONTACT AVEC PADDLES /////////////////////////////

			//if (ballRef.current.y + ballRadius <= leftPaddle.y

				// PADDLE GAUCHE //
				if (ballY - ballRadius <= leftPaddle.y + paddleHeight)
				if (ballY + ballRadius >= leftPaddle.y)
				if (ballX - ballRadius < leftPaddle.x + leftPaddle.width)
				{
					newDx = -newDx;

					//definir le nouvel angle :

					// le centre vertical du paddle
					let centre_paddle_Y = leftPaddle.y + (leftPaddle.height / 2);
					let distance_ball_paddle_Y;
					//variable  pour savoir si la balle tape au dessus ou dessous du centre du paddle :
					let quadrant = 1; //pour au dessus

					if (ballY > centre_paddle_Y)
					{
						distance_ball_paddle_Y = ballY - centre_paddle_Y;
						quadrant = 0; // la balle tape au dessous du centre
					}
					else
						distance_ball_paddle_Y = centre_paddle_Y - ballY;

					// L'angle_impact prendra une valeur de 0 si la balle tape au centre du paddle, jusqu a 1 si la balle tape totalement dans un coin, a partir de cela on va a la fois pouvoir determiner l' angle dans lequel la balle repartira mais aussi son acceleration
					let angle_impact = distance_ball_paddle_Y / (leftPaddle.height / 2);

					console.log(angle_impact);

					//on envoi une valeur entre 0 et 80 degres ( 0 < angle_impact < 1 )
					//if (quadrant === 0)
					changeBallAngle(toRadians(angle_impact * 20));

				}

				// PADDLE DROIT //
				if (ballY - ballRadius <= rightPaddle.y + paddleHeight)
				if (ballY + ballRadius >= rightPaddle.y)
				if (ballX + ballRadius >= rightPaddle.x)
				newDx = -newDx;

				//// CONTACT AVEC BORDS //////////////////////////////
				//let for_test = wwidth / 2 + 160;
				let for_test = 0;

				if (ballX > canvas.width - 10 - for_test || ballX <= 10)
				newDx = -newDx;

				if (ballY > canvas.height - 10 || ballY <= 10)
				newDy = -newDy;
				///////////////////////////////////////////////////////

				// ACTUALISATION VALEURS
				ballRef.current.x += newDx;
				ballRef.current.y += newDy;
				ballRef.current.dx = newDx;
				ballRef.current.dy = newDy;

				// Clear canvas
				context.clearRect(0, 0, canvas.width, canvas.height);

				// Draw Ball
				context.beginPath();
				context.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2);
				context.fill();

				// Draw Paddles
				context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);

				context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

				context.fillRect(border_top.x, border_top.y, border_top.width, border_top.height);
				context.fillRect(border_bot.x, border_bot.y, border_bot.width, border_bot.height);
				context.fillRect(border_left.x, border_left.y, border_left.width, border_left.height);
				context.fillRect(border_right.x, border_left.y, border_left.width, border_left.height);

				//aide a la visualisation
				//context.fillRect(ballX - 250, ballY, 500, 1);
				//context.fillRect(leftPaddle.x, leftPaddle.y, 20, 1);
				//context.fillRect(leftPaddle.x, leftPaddle.y + paddleHeight, 20, 1);

				// Next frame
				animation_id = requestAnimationFrame(update);
			}

		animation_id = requestAnimationFrame(update);


		return () => {
			cancelAnimationFrame(animation_id);
		}

	}, [leftPaddleY, rightPaddleY]);

			return (
				<canvas ref={canvasRef} width={wwidth} height={hheight} />
			);
}

export default Pong;

