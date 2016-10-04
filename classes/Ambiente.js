class Ambiente {

    constructor() {
        this._idReciclador = 0;
        this._idLixeira = 0;
    }

	// Método para validar um ambiente dentro das especificações mínimas de quantidade de agentes.
	validarAmbiente(ambiente) {
		if ( ambiente.qntReciclador < 2 ||
			 ambiente.qntLixeiraO   < 1 ||
			 ambiente.qntLixeiraS   < 1 ||
			 ambiente.qntLixoO      < 6 ||
			 ambiente.qntLixoS      < 6  )
		{
			throw new Error("Nao foi respeitado o número mínimo de agentes");
		}

	}

	/* Geração de todos os objetos que estarão presentes na matriz. 
	   Estes objetos serão armazenados em arrays (um array para cada tipo de objeto). */

    geraMatriz() {
		this.criaMatriz();
        this.geraObjetos();
	}

    /* Cria uma matriz de acordo com as propriedades X e Y */
    criaMatriz() {
        this.matriz = [];
        for (var i = 0; i < this.x; i++) {
            this.matriz[i] = new Array(this.y);
        }
    }
    /* Gera objetos de acordo com suas respectivas quantidades */
    geraObjetos() {
        let row, col, lixeiras = [];
        // enquanto tiver quantidades vai criar objetos
        while(
            this.qunR > 0            ||
            this.qntLixoO > 0        ||
            this.qntLixoS > 0        ||
            this.qntLixeiraO > 0     ||
            this.qntLixeiraS > 0
        ) {
            col = Math.floor(Math.random() * this.x);// função randomica para retornar um valor dentro do limite X (coluna)
            row = Math.floor(Math.random() * this.y);// função randomica para retornar um valor dentro do limite Y (Linha)
            if (!this.matriz[col][row])// se não possui nada ainda nesse lugar então cria um novo
                this.matriz[col][row] = this.getObjeto(col, row, lixeiras);
            
            // salva lixeiras para passar para os agentes
            if (this.matriz[col][row] instanceof Lixeira)
                lixeiras.push(this.matriz[col][row]);
        }
    }
    /* Retorna qual objeto ainda tem quantidade para ser criado e diminui o valor da quantidade (alguma hora vai ficar ZERO) */
    getObjeto(col, row, lixeiras) {
		if (this.qntLixoO) {
            this.qntLixoO--;
            return new Lixo("Organico");
        }
		if (this.qntLixoS) {
            this.qntLixoS--;
            return new Lixo("Seco");
        }
		if (this.qntLixeiraO) {
            this.qntLixeiraO--;
            this._idLixeira++;
            return new Lixeira(col, row, "Organico", this._idLixeira, this._limiteLixeiraO);
        }
		if (this.qntLixeiraS) {
            this.qntLixeiraS--;
            this._idLixeira++;
            return new Lixeira(col, row, "Seco", this._idLixeira, this._limiteLixeiraS);
        }
        if (this.qunR) {
            this.qunR--;
            this._idReciclador++;
            return new Reciclador(col, row, lixeiras, this._idReciclador, this._limiteRecicladorO, this._limiteRecicladorS);
        }
    }
}