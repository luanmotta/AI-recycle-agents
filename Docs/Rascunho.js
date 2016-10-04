/*
	constructor (x, y, qntReciclador, qntLixeiraO, qntLixeiraS, qntLixoO, qntLixoS ) {
		this._x     = x;
		this._y     = y;
		this._qunR  = qntR;
		this._qntLixeiraO = qntLixeiraO;
		this._qntLixeiraS = qntLixeiraS;
		this._qntLixoS	  = qntLixoS;
		this._qntLixoO    = qntLixoO;
	}

	get qntR() {
		return this._qntReciclador;
	}

	get qntLixeiraO() {
		return this._qntLixeiraO;
	}

	get qntLixeiraS() {
		return this._qntLixeiraS;
	}

	get qntLixoO() {
		return this._qntLixoO;
	}

	get qntLixoS() {
		return this._qntLixoS;
	}





function generateGround(height, width, qntR, qntLixeiraO, qntLixeiraS, qntLixoO, qntLixoS)
{
  var ground = [];
  var espacosVazios = (height * width) - (qntR + qntLixeiraO + qntLixeiraS + qntLixoO + qntLixoS);
  
  for (var y = 0 ; y < height; y++) 
  {
    ground[y] = [];
    for (var x = 0; x < width; x++) 
    {
        let validNumber = false;
        while(validNumber==false) {
          var numero = (Math.random() * 15 | 0);
          switch(numero) {
              
            case 1: {
                if (qntR > 0) {
                  validNumber = true;
                  qntR--;
                  ground[y][x] = "Reciclador";
                  break;
                }
            }
            case 2: {
                if (qntLixeiraO > 0) {
                  validNumber = true;
                  qntLixeiraO--;
                  ground[y][x] = "LixeiraO";
                  break;
                }
            }
            case 3: {
                if (qntLixeiraS > 0) {
                  validNumber = true;
                  qntLixeiraS--;
                  ground[y][x] = "LixeiraS";
                  break;
                }
            }
            case 4: {
                if (qntLixoO > 0) {
                  validNumber = true;
                  qntLixoO--;
                  ground[y][x] = "LixoO";
                  break;
                }
            }
            case 5: {
                if (qntLixoS > 0) {
                  validNumber = true;
                  qntLixoS--;
                  ground[y][x] = "LixoS";
                  break;
                }
            }
            default: {
                if (espacosVazios > 0) {
                  validNumber = true;
                  espacosVazios--;
                  ground[y][x] = 0;
                }
            }
          }    
        }      
     }  
  }
  return ground;
}

var ground = generateGround(5, 5, 2, 1, 1, 1, 1); //Simple usage


console.log(ground);

*/