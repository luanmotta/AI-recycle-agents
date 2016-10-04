var 
	amb = new AmbientePequeno(), x, y, item, atualCiclo = -1;

amb.geraMatriz();

// ignore metodos de desenho
firstDraw(amb);

setInterval(function () {
    'use strict';

    atualCiclo++;

    for (x = 0; x < amb.x; x++) {
        for (y = 0; y < amb.y; y++) {
        	item = amb.matriz[x][y];
            // valida se o objeto existe, se eh Reciclador
        	if (item && item instanceof Reciclador) {
                // Se jah n foi chamado nesse ciclo ou se eh o primeiro ciclo
                if (item.ciclo < atualCiclo)
                    item._caminhar(amb.matriz);
                // atualiza ciclo do agente e cria essa variavel na primeira vez
                item.ciclo = atualCiclo;
        	}
        }
    }
    
    // ignore metodos de desenho
    draw(amb, atualCiclo);
}, 500);