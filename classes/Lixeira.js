class Lixeira {

	constructor(col, row, tipo, id, limite) {
		this._id 		 = id;
		this._capacidade = limite;
		this._qntLixo 	 = 0;
		this._tipo		 = tipo; // O tipo pode ser "Organico" ou "Seco".
		this._posicaoX   = col;
		this._posicaoY   = row;
	}

	// Método que faz a lixeira receber o lixo do Reciclador.
	recebeLixo(qntLixo) {

		// Se há capacidade na lixeira...
		if (this._qntLixo < this._capacidade) {

			// se lixeira suporta todo lixo
			if (qntLixo + this._qntLixo <= this._capacidade) {
				this._qntLixo += qntLixo; // Adiciona o lixo na lixeira
				qntLixo = 0;
			} else {
				this._qntLixo = this._capacidade;// enche a lixeira
				qntLixo = (this._qntLixo + qntLixo) - this._capacidade;// sobra
			}
		}
		console.log('Lixeira tipo='+this._tipo+' qnt='+this._qntLixo);
		return qntLixo; // Retorna o numero de lixos q salvou na lixeira
	}

}