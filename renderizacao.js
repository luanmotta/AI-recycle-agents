var 
    CANVAS_WIDTH = 600,
    CANVAS_HEIGHT = 300,
    c = document.getElementById("visual"),
    canvas = c.getContext("2d"),
    p = 10,// padding
    itemSize,// define o tamanho dos objetos no ambiente Lixo, Reciclador e etc..
    x,// guarda posicao ao percorrer matriz pela linha (eixo x)
    y,// guarda posicao ao percorrer matriz pela coluna (eixo y)
    posY,// guarda posicao Y do atual objeto ao percorrer matriz
    posX,// guarda posicao X do atual objeto ao percorrer matriz
    rowWidth,// largura da linha
    rowHeight,// altura da linha
    item;// atual objeto ao percorrer matriz

// define tamanho do canvas
c.width  = CANVAS_WIDTH + (p*2) + 1;
c.height = CANVAS_HEIGHT + (p*2) + 1;
c.style.backgroundColor = 'white';

// guarda valores importantes para desenhar na grid
function firstDraw(amb) {
    rowWidth  = CANVAS_WIDTH / amb.x,
    rowHeight = CANVAS_HEIGHT / amb.y;
    itemSize  = rowWidth / 4;

    for (x = 0; x <= amb.x; x++) {
        canvas.moveTo(rowWidth * x + p, p);
        canvas.lineTo(rowWidth * x + p, CANVAS_HEIGHT + p);
    }

    for (x = 0; x <= CANVAS_HEIGHT; x++) {
        canvas.moveTo(p, rowHeight * x + p);
        canvas.lineTo(CANVAS_WIDTH + p, rowHeight * x + p);
    }

    canvas.strokeStyle = "black";
    canvas.stroke();
}

// faz todo desenho
function draw(amb, atualCiclo) {
    if (amb.matriz)
        for (x = 0; x < amb.x; x++) {
            for (y = 0; y < amb.y; y++) {
                posX = (rowWidth * x + p) + rowWidth / 3;
                posY = (rowHeight * y + p) + rowHeight / 3;

                // limpa
                canvas.clearRect(posX, posY, itemSize, itemSize);

                // guarda atual objeto se tiver
                item = amb.matriz[x][y];

                if (item) {
                    // escolhe cor
                    if (item instanceof Lixo && item._tipo === 'Seco') {
                        canvas.fillStyle = "green";
                        canvas.fillRect(posX, posY, itemSize, itemSize);
                    } else if (item instanceof Lixo && item._tipo === 'Organico') {
                        canvas.fillStyle = "red";
                        canvas.fillRect(posX, posY, itemSize, itemSize);
                    } else if (item instanceof Reciclador) {
                        canvas.fillStyle = "black";
                        canvas.fillText(item._id, posX + 1, posY + 8);
                    }
                    
                    // desenha imagem
                    if (item instanceof Lixeira && item._tipo === 'Organico') {
                        canvas.drawImage(document.getElementById('organico'), posX, posY, itemSize, itemSize);
                    } else if (item instanceof Lixeira && item._tipo === 'Seco') {
                        canvas.drawImage(document.getElementById('seco'), posX, posY, itemSize, itemSize);
                    }
                }
            }
        }

    // aumenta o contador de ciclos para o usuario
    document.getElementById("ciclo").innerHTML = atualCiclo;
}

Array.prototype.remove = function(value) {
    var i = this.indexOf(value);
    if (i !== -1)
        this.splice(i, 1);
    return this;
}