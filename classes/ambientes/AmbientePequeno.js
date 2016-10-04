/* Este método herda as características da classe pai (Ambiente),
   possuindo seus atributos e métodos. Nesta classe, é designado
   os parâmetros necessários para a geração de um ambiente. */
   
class AmbientePequeno extends Ambiente {
	
	constructor() {
		super();
		this.x           = 10;
		this.y           = 10;
		this.qunR        = 2;
		this.qntLixeiraO = 1;
		this.qntLixeiraS = 1;
		this.qntLixoO    = 6;
		this.qntLixoS    = 6;
		
		this._limiteLixeiraS = 6;
		this._limiteLixeiraO = 6;
		this._limiteRecicladorO = 3;
		this._limiteRecicladorS = 3;
	}

}