/* Este método herda as características da classe pai (Ambiente),
   possuindo seus atributos e métodos. Nesta classe, é designado
   os parâmetros necessários para a geração de um ambiente. */

class AmbienteGrande extends Ambiente {

	constructor() {
		super();
		this.x           = 30;
		this.y           = 30;
		this.qunR        = 5;
		this.qntLixeiraO = 7;
		this.qntLixeiraS = 6;
		this.qntLixoO    = 35;
		this.qntLixoS    = 30;

		this.qntLimiteLixeiraS = 6;
		this.qntLimiteLixeiraO = 6;
		this.qntRecicladorO = 6;
		this.qntRecicladorS = 6;
	}

}