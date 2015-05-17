

	divArr = []
	aSquare2 = ""
	aSquare3 = ""
	clickable = true

	function makeBoard(){

			var body = document.querySelector("body");

			makeStyle();
			

			var resetButton = document.createElement("button");
			resetButton.style.float = "right";
			resetButton.style.fontFamily = "Courier";
			resetButton.style.color = "white";
			resetButton.style.marginTop = "21%"
			resetButton.style.marginRight = "4%"
			resetButton.style.backgroundColor = "gray";
			resetButton.innerHTML = "<h2>Reset</h2>"
			resetButton.style.textShadow = "2px 2px 2px black"
			resetButton.style.boxShadow = "2px 2px 2px black"

			resetButton.addEventListener("click", function(){removeTiles()});
			body.appendChild(resetButton);

			createTiles();
	}

	function removeTiles(){
		for (var i = 15; i >= 0; i--){
			divArr[i].parentNode.removeChild(divArr[i]);
			divArr.splice(i,i-1);
		}
			divArr.splice(0,3);
		  createTiles();
	}

	function createTiles(){

		var body = document.querySelector("body");				

			//	Creates 'tiles' (aSquare) that constitute board

			for (var i = 0; i < 16; i++){

				var aSquare = document.createElement("div");
				aSquare.style.width = "16.5%";
				aSquare.style.float = "left";
				aSquare.style.marginTop = "8px";
				aSquare.style.marginBottom = "8px";
				aSquare.style.marginLeft = "10px";
				aSquare.style.marginRight = "10px";
				aSquare.style.paddingBottom = "10%";
				aSquare.style.borderRadius = "10px";
				aSquare.style.border = "3px solid gray";
				// aSquare.className = ".flip-container:hover .flipper, .flip-container.hover .flipper, .flip-container.flip .flipper"
				aSquare.style.backgroundColor = "black";
				aSquare.style.boxShadow = "3px 2px 2px black"

				aSquare.id = Math.floor(i/2).toString();
				makeListener(aSquare);

				// Pushes divs to array for other functions

				divArr.push(aSquare);
			}

			//  Shuffles tiles

			divArr = shuffleImg(divArr);

			// Places tiles on board

			for (var j = 0; j < divArr.length; j++){
				body.appendChild(divArr[j]);
			}
	}

	function makeStyle(){

		var body = document.querySelector("body");
			body.style.backgroundColor = "maroon"

		var topMargin = document.createElement("div");
			topMargin.style.float = "left";
			topMargin.style.paddingBottom = "0%";
			topMargin.style.width = "50%";
			topMargin.style.marginLeft = "24.5%";
			topMargin.style.marginRight = "25.5%";
			topMargin.style.marginBottom = "0.75%"
			topMargin.style.textAlign = "center";
			topMargin.innerHTML = "<h1>Match 'em!</h1>";
			topMargin.style.fontFamily = "Courier";
			topMargin.style.color = "white";
			topMargin.style.border = "5px solid gray"
			topMargin.style.borderRadius = "10px"
			topMargin.style.textShadow = "4px 2px 2px black"
			topMargin.style.boxShadow = "3px 2px 2px black"
			body.appendChild(topMargin);

		var leftMargin = document.createElement("div");
			leftMargin.id = ".aClass";
			leftMargin.style.borderRadius = "10px"
			leftMargin.style.fontFamily = "Courier";
			leftMargin.style.color = "white";
			leftMargin.style.fontSize = "48pt"
			leftMargin.style.textAlign = "center";
			leftMargin.style.float = "left";
			leftMargin.style.textShadow = "2px 2px 2px black"
			leftMargin.style.boxShadow = "3px 2px 2px black"
			leftMargin.style.WebkitTransition = 'opacity 1s';
			leftMargin.style.MozTransition = 'opacity 1s'
			// leftMargin.style.height = "20%";
			leftMargin.style.marginTop = "5%";
			leftMargin.style.marginBottom = "37%";
			leftMargin.style.width = "12%";
			body.appendChild(leftMargin);
	}

	function makeListener(aSquare){

			aSquare.addEventListener("click", function(){evaluateListener(this);});
	}

	function evaluateListener(aSquare){

		if (clickable){
			if (aSquare.id.length > 0 && aSquare.id.length < 3){
				flipUp(aSquare);

				aSquare.id += " clicked";

				for (var i = 0; i < divArr.length; i++){
					if (divArr[i].id.length > 3 && divArr[i].id == aSquare.id && divArr[i] != aSquare){
						// alert("Those match!");

						var aVar = document.getElementById(".aClass");
						aVar.style.border = "3px solid gray"
						aVar.innerHTML = "M<br>A<br>T<br>C<br>H<br>!"
						aVar.style.marginBottom = "0%"
						aVar.style.width = "11.5%"

						setTimeout( function(){
								var aVar = document.getElementById(".aClass");
								aVar.innerHTML = ""
								aVar.style.border = ""
								aVar.style.marginBottom = "37%"
								aVar.style.width = "12%"
							}, 3700);

						aSquare.id = "";
						divArr[i].id = "";
						checkWin();

					} else if (divArr[i].id.length > 3 && divArr[i] != aSquare) {
						
						aSquare2 = aSquare.id[0];
						aSquare3 = divArr[i].id[0];

							clickable = false;

							setTimeout( function(){
								flipDown(aSquare3,aSquare2);
								clickable = true;
							}, 500);

						aSquare.id = aSquare.id.slice(0,1);
						divArr[i].id = divArr[i].id.slice(0,1);
					}
				}
				
			}
		}
	}

	function checkWin(){
		var matched = true;
		var i = 0;
		while(matched && i < 16){
			if (divArr[i].id != "")
				matched = false;
			i++;
		}

		if (matched){
			var aVar = document.getElementById(".aClass");
						aVar.style.border = "3px solid gray"
						aVar.innerHTML = "W<br>I<br>N<br>N<br>E<br>R<br>!"
						aVar.style.marginBottom = "0%"
						aVar.style.width = "11.5%"
		}
	}

	function flipUp(aSquare){
		var string = aSquare.id
		console.log(string)
		aSquare.classList.toggle("flip")

		if(aSquare.id == "0")
			aSquare.style.backgroundColor = "teal";
		else if (aSquare.id == "1")
			aSquare.style.backgroundColor = "blue";
		else if (aSquare.id == "2")
			aSquare.style.backgroundColor = "red";
		else if (aSquare.id == "3")
			aSquare.style.backgroundColor = "yellow";
		else if (aSquare.id == "4")
			aSquare.style.backgroundColor = "green";
		else if (aSquare.id == "5")
			aSquare.style.backgroundColor = "orange";
		else if (aSquare.id == "6")
			aSquare.style.backgroundColor = "purple";
		else if (aSquare.id == "7")
			aSquare.style.backgroundColor = "pink";

	}

	function flipDown(id1, id2){
		 console.log(id1)
		 console.log(id2)

		for (var i = 0; i < divArr.length; i++){

			if (divArr[i].id == id1 || divArr[i].id == id2)
				divArr[i].style.backgroundColor = "black";
		}
	}

	function shuffleImg(tiles){
		var i = 0;
		var temp;
		// console.log(tiles)

		while (i<tiles.length)
		{
			var randIndex = Math.floor(Math.random() * (tiles.length - 1));
			temp = tiles[i];
			tiles[i] = tiles[randIndex];
			tiles[randIndex] = temp;
			i++;
		}
		
		return tiles;
	}

makeBoard();
		