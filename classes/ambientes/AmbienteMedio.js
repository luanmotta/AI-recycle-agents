/* Este método herda as características da classe pai (Ambiente),
   possuindo seus atributos e métodos. Nesta classe, é designado
   os parâmetros necessários para a geração de um ambiente. */
   
class AmbienteMedio extends Ambiente {
	
	constructor() {
		super();
		this.x           = 20;
		this.y           = 12;
		this.qunR        = 3;
		this.qntLixeiraO = 2;
		this.qntLixeiraS = 2;
		this.qntLixoO    = 12;
		this.qntLixoS    = 15;

		this.qntLimiteLixeiraS = 6;
		this.qntLimiteLixeiraO = 6;
		this.qntRecicladorO = 6;
		this.qntRecicladorS = 6;
	}

}