class Reciclador {

	constructor(col, row, lixeiras, id, limiteO, limiteS) {
		// define id do reciclador
		this._id = id;

		// define limites
		this._capacidadeLO  = limiteO;
		this._capacidadeLS  = limiteS;

		// atual quantidades
		this.qntLS          = 0;
		this.qntLO          = 0;

		this.qntLSAnterior  = 0;
		this.qntLOAnterior  = 0;

		// define atual posicao
		this._posicaoX     = col;
		this._posicaoY     = row;

		// define ciclos sem lixos
		this._cicloSemLixo = 0;

		// status do agente
		this._status = 'lixos';

		// guarda local das lixeiras
		this._lixeiras = lixeiras;
	}

	_cheio() {
		return this.qntLS >= this._capacidadeLS || this.qntLO >= this._capacidadeLO;
	}

	_caminhar(matriz) {
		this._status = this._cheio() ? 'lixeira' : 'lixo';

		if (this._status === 'lixeira')
			this._procuraLixeira(matriz, this.qntLS >= this._capacidadeLS ? 'Seco': 'Organico');
		else
			this._procuraLixo(matriz);

		if (this.qntLSAnterior !== this.qntLS) {
			this.qntLSAnterior = this.qntLS;
			console.log('Agente id='+this._id+' quantidadeSeco='+this.qntLS);
		}
		if (this.qntLOAnterior !== this.qntLO) {
			this.qntLOAnterior = this.qntLO;
			console.log('Agente id='+this._id+' quantidadeOrg='+this.qntLO);
		}
	}

	_procuraLixeira(matriz, tipo) {
		var i, lixeiraMaisPerto = this._lixeiraMaisPerto, x, y;

		if (!lixeiraMaisPerto) {
			for (var i = 0; i < this._lixeiras.length; i++) {
				// Math.abs retorna valor sempre positivo
				x = Math.abs(this._lixeiras[i]._posicaoX - this._posicaoX);
				y = Math.abs(this._lixeiras[i]._posicaoY - this._posicaoY);
				if (tipo === this._lixeiras[i]._tipo && (!lixeiraMaisPerto || lixeiraMaisPerto._posicaoX > x && lixeiraMaisPerto._posicaoY > y)) {
					lixeiraMaisPerto = this._lixeiras[i];
				}
			}
		}
		// Verifica se a posicao da lixeira esta para qual lado e se n tem nada na frente
		if (lixeiraMaisPerto._posicaoX > this._posicaoX && (!this._percepcaoDireita(matriz) ||this._percepcaoDireita(matriz) instanceof Lixeira)) {
			this._andaParaDireita(matriz);



		} else if (lixeiraMaisPerto._posicaoX < this._posicaoX && !this._percepcaoEsquerda(matriz) ||this._percepcaoEsquerda(matriz) instanceof Lixeira) { 
			this._andaParaEsquerda(matriz);



		} else if (lixeiraMaisPerto._posicaoY > this._posicaoY && !this._percepcaoBaixo(matriz) ||this._percepcaoBaixo(matriz) instanceof Lixeira) {
			this._andaParaBaixo(matriz);



		} else if (lixeiraMaisPerto._posicaoY < this._posicaoY && !this._percepcaoCima(matriz) ||this._percepcaoCima(matriz) instanceof Lixeira) {
			this._andaParaCima(matriz);

		} else {
			this._andaAleatorio(matriz);
		}


		console.log('Agente id='+this._id+' procurando lixeira ' + tipo);
	}

	_procuraLixo(matriz) {
		var 
			decisao = false;

		for (var numCasas = 1; decisao === false && numCasas <= 2 ; numCasas++ ) {
			// Lixo em cima
			if (this._pegaPosicao(matriz, this._posicaoX, this._posicaoY - numCasas) instanceof Lixo)
				decisao = this._andaParaCima(matriz);

			// Lixo a direita
			else if (this._pegaPosicao(matriz, this._posicaoX + numCasas, this._posicaoY) instanceof Lixo)
				decisao = this._andaParaDireita(matriz);

			// Lixo em baixo
			else if (this._pegaPosicao(matriz, this._posicaoX, this._posicaoY + numCasas) instanceof Lixo)
				decisao = this._andaParaBaixo(matriz);

			// Lixo a esquerda
			else if (this._pegaPosicao(matriz, this._posicaoX - numCasas, this._posicaoY) instanceof Lixo)
				decisao = this._andaParaEsquerda(matriz);

			// Lixo em cima direita
			else  if (this._pegaPosicao(matriz, this._posicaoX + numCasas, this._posicaoY - numCasas) instanceof Lixo)
				decisao = this._andaParaCima(matriz);

			// Lixo a direita baixo
			else if (this._pegaPosicao(matriz, this._posicaoX + numCasas, this._posicaoY + numCasas) instanceof Lixo)
				decisao = this._andaParaDireita(matriz);

			// Lixo em baixo esquerda
			else if (this._pegaPosicao(matriz, this._posicaoX - numCasas, this._posicaoY + numCasas) instanceof Lixo)
				decisao = this._andaParaBaixo(matriz);

			// Lixo a esquerda cima
			else if (this._pegaPosicao(matriz, this._posicaoX - numCasas, this._posicaoY - numCasas) instanceof Lixo)
				decisao = this._andaParaEsquerda(matriz);

		}

		// se não encontrou lixo anda aleatoriamente em busca
		if (!decisao)
			this._andaAleatorio(matriz);
		
		// se chegou aqui sem pegar lixo
		this._cicloSemLixo++;

		return decisao;
	}

	_andaAleatorio(matriz) {
		var disponivel = [], i;// vetor armazena posicoes disponiveis

		// grava posicoes que estao vazias para andar
		if (!this._percepcaoCima(matriz, true))
			disponivel.push("cima");

		if (!this._percepcaoDireita(matriz, true))
			disponivel.push("direita");

		if (!this._percepcaoBaixo(matriz, true))
			disponivel.push("baixo");

		if (!this._percepcaoEsquerda(matriz, true))
			disponivel.push("esquerda");

		// se passou do limite cicloSemLixo deixa apenas as opcoes esquerda e direita
		/*
		if (this._cicloSemLixo >= 3 && (disponivel.indexOf("esquerda") > -1 || disponivel.indexOf("esquerda") > -1)) {
			disponivel.remove("cima");// remove posicao de cima
			disponivel.remove("baixo");// remove posicao de baixo
		}*/

		// gera posicao aleatória com base no tamanho do array
		i = Math.floor(Math.random() * disponivel.length);

		if (disponivel[i] === 'cima')
			this._andaParaCima(matriz);
		else if (disponivel[i] === 'baixo')
			this._andaParaBaixo(matriz);
		else if (disponivel[i] === 'esquerda')
			this._andaParaEsquerda(matriz);
		else if (disponivel[i] === 'direita')
			this._andaParaDireita(matriz);
		// se não andou é pq está cercado...
	}

	/* funcoes que andam na matriz */
	_andaParaCima(matriz) {
		return this._atualizaPosicao(matriz, this._posicaoX, this._posicaoY - 1);
	}

	_andaParaDireita(matriz) {
		return this._atualizaPosicao(matriz, this._posicaoX + 1, this._posicaoY);
	}

	_andaParaBaixo(matriz) {
		return this._atualizaPosicao(matriz, this._posicaoX, this._posicaoY + 1);
	}

	_andaParaEsquerda(matriz) {
		return this._atualizaPosicao(matriz, this._posicaoX - 1, this._posicaoY);
	}

	/* funcoes de percepcao pra saber o q tem em volta */
	_percepcaoCima(matriz, mostraQuemSaiuDoLimite) {
		return this._pegaPosicao(matriz, this._posicaoX, this._posicaoY - 1, mostraQuemSaiuDoLimite);
	}
	_percepcaoDireita(matriz, mostraQuemSaiuDoLimite) {
		return this._pegaPosicao(matriz, this._posicaoX + 1, this._posicaoY, mostraQuemSaiuDoLimite);
	}
	_percepcaoBaixo(matriz, mostraQuemSaiuDoLimite) {
		return this._pegaPosicao(matriz, this._posicaoX, this._posicaoY + 1, mostraQuemSaiuDoLimite);
	}
	_percepcaoEsquerda(matriz, mostraQuemSaiuDoLimite) {
		return this._pegaPosicao(matriz, this._posicaoX - 1, this._posicaoY, mostraQuemSaiuDoLimite);
	}

	/* Permite atualizar posição apenas para cima, baixo, esquerda ou direita */
	_atualizaPosicao(matriz, x, y) {
		
		// Se tem uma lixeira para esvaziar
		if (matriz[x][y] instanceof Lixeira) {
			if (matriz[x][y]._tipo === "Seco" && this.qntLS > 0) {
				this._lixeiraMaisPerto = false;
				this.qntLS = matriz[x][y].recebeLixo(this.qntLS);
			} else if (matriz[x][y]._tipo === "Organico" && this.qntLO > 0) {
				this._lixeiraMaisPerto = false;
				this.qntLO = matriz[x][y].recebeLixo(this.qntLO);
			}
			this._andaAleatorio(matriz);
		} else {
			// se possui lixo para onde está indo
			if (matriz[x][y] instanceof Lixo) {

				if (matriz[x][y]._tipo === 'Seco' && this.qntLS >= this._capacidadeLS ||
					matriz[x][y]._tipo === 'Organico' && this.qntLO >= this._capacidadeLO)
					return false;
				this._armazenaLixo(matriz[x][y], matriz);
			}
				
			// limpa
			try {
				matriz[this._posicaoX][this._posicaoY] = undefined;
			} catch(ex) {
				console.log('errou');
			}
			
			// atualiza posição e já limpa se tiver lixo
			this._posicaoX = x;
			this._posicaoY = y;
			matriz[this._posicaoX][this._posicaoY] = this;
		}

		return true;
	}

	/* pega a posicao sem errar em um indice fora da matriz */
	_pegaPosicao(matriz, x, y, mostraQuemSaiuDoLimite) {
		// Se x ou y estiver fora do limite Matriz
		if (x >= matriz.length || x < 0) return mostraQuemSaiuDoLimite ? x : false;
		if (y >= matriz[0].length || y < 0) return mostraQuemSaiuDoLimite ? y : false;

		return matriz[x][y];
	}

	_armazenaLixo(lixo, matriz) {
		if (lixo._tipo === 'Seco')
			if (this.qntLS < this._capacidadeLS) {
				this.qntLS++;
				if (this.qntLS === this._capacidadeLS)
					return this._procuraLixeira(matriz, 'Seco');

			} else
				return this._procuraLixeira(matriz, 'Seco');
		else
			if (this.qntLO < this._capacidadeLO) {
				this.qntLO++;
				if (this.qntLO === this._capacidadeLO)
					return this._procuraLixeira(matriz, 'Organico');
			} else
				return this._procuraLixeira(matriz, 'Organico');
		//Soh vai cair aqui se nao procurarLixeira e armazenar o lixo
		this._cicloSemLixo = 0;
	}
}

/*- Ele é um agente reativo que se movimenta no ambiente, uma célula em qualquer direção a cada ciclo.
- Sua trajetória é por linha ou por coluna conforme a percepção de sujeira.
- Possui uma percepção de duas células também em qualquer direção e sempre está à procura de sujeira para
eliminar.

- Se não encontrar sujeira, anda aleatoriamente.

- Para aumentar a eficiência do agente, se durante 3 ciclos consecutivos não encontrar sujeira, ele passa a se
mover em linha (a escolha da orientação esquerda ou direita deve ser aleatória).

- Ao encontrar sujeira novamente, volta a andar conforme a percepção de sujeira.

- Possui dois sacos de lixo, um para armazenar lixo orgânico e outro para armazenar lixo seco, cada saco
possui uma determinada capacidade (ele é também um parâmetro) que quando enche deve ser esvaziado em
uma das lixeiras do ambiente (lixo orgânico é descartado na lixeira de lixo orgânico e lixo seco é descartado
na lixeira de lixo seco).

- O agente sempre procura a lixeira mais próxima para descarregar o lixo.

- O agente possui uma pequena memória de controle, na qual ele guarda as coordenadas das lixeiras do
ambiente.

- Agentes não podem ocupar a mesma célula que lixeiras e outros agentes, deve desviar.

- O agente recolhe o lixo ao ir para célula em que o lixo está.*/