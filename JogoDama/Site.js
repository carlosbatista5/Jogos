var pedraDaVez = '';
var obrigaMesmaPedra = Boolean(false);


function CarregarTela() {
    var dvTabul = $('#dvTabuleiro');
    var nomeLinha;

    for (i = 0; i < 8; i++) {

        nomeLinha = 'Linha_' + i;

        dvTabul.append($('<div>').addClass("row").attr('id', nomeLinha));
        AdicionarColuna(nomeLinha, i);

    };

    // TabuleiroTeste();

}

function AdicionarColuna(nomeLinha, linha) {

    var dvLinha = $('#' + nomeLinha);
    var nomeCasa;
    var nomeImg;
    var casaEscura;
    var colocarPedra;
    var nomeClasseJogador;
    var nomeSrcImagem;

    if (linha % 2 == 0) {
        casaEscura = false;
    }
    else {
        casaEscura = true;
    }

    colocarPedra = casaEscura;

    for (j = 0; j < 8; j++) {
        nomeCasa = 'CasaColuna_' + j + '_' + nomeLinha;


        if (linha >= 3 && linha < 5) {
            dvLinha.append($('<div>').addClass("column casa col-sm-1").attr('id', nomeCasa).attr('draggable', 'false').attr('ondrop', 'drop(event)').attr('ondragover', 'allowDrop(event)'));
        }
        else {
            if (casaEscura) {
                if (linha < 3) {
                    nomeImg = 'J1_' + linha + '_' + j;
                    nomeClasseJogador = 'J1';
                    nomeSrcImagem = 'Imagens\\BotaoPreto.png';

                }
                else {
                    nomeImg = 'J2_' + linha + '_' + j;
                    nomeClasseJogador = 'J2';
                    nomeSrcImagem = 'Imagens\\BotaoVermelho.png';

                }
                dvLinha.append($('<div>').addClass("column casa col-sm-1").attr('id', nomeCasa).attr('draggable', 'false').attr('ondrop', 'drop(event)').attr('ondragover', 'allowDrop(event)').append($('<img>').attr('class', 'botao img-responsive ' + nomeClasseJogador).attr('src', nomeSrcImagem).attr('id', nomeImg).attr('draggable', 'true').attr('ondragstart', 'drag(event)').attr('ondragend', 'dragEnd(event)').attr('linhaatual', linha).attr('colunaatual', j).attr('dama', Boolean(false)).attr('marcada', Boolean(false))));
            }
            else {
                dvLinha.append($('<div>').addClass("column casa col-sm-1").attr('id', nomeCasa).attr('draggable', 'false').attr('ondrop', 'drop(event)').attr('ondragover', 'allowDrop(event)'));
            }
        }


        if (!casaEscura) {
            //muda a cor da casa
            $('#' + nomeCasa).css("background-color", "white");

            casaEscura = true;
        }
        else {

            //muda a cor da casa
            $('#' + nomeCasa).css("background-color", "black");
            casaEscura = false;
        }



    };

    //	dvLinha.append($('<div>').addClass( "col-sm-2");

}


/************************************************************
***** Valida as jogadas das damas
 * **********************************************************
 * @param {any} evento
 * @param {any} casaDestino
 * @param {any} nomePedra
 ************************************************************/
function VerificarJogadaDama(evento, casaDestino, nomePedra) {
    var nomePedraSplit = nomePedra.split('_');
    var casaDestinoIdSplit = casaDestino.id.split('_');
    var linhaDestino;
    var pedra = $('#' + nomePedra);
    var linhaAtual = pedra.attr('linhaatual');
    var colunaAtual = pedra.attr('colunaatual');
    var colunaDestino;
    var direcaoMvmtoVertical;
    var colunaCasaPulada;
    var linhaCasaPulada;
    var nomeCasaPulada;
    var casaPulada;
    var linhaDestinoOK;
    var qtdeLinhasAvancadas;
    var imagemPedraPulada;
    var pedraRemovida = Boolean(false);


    //verifica se é casa branca
    if (casaDestino.style.backgroundColor == 'white') {
        return false;
    }

    //verifica se já existe uma pedra na casa destino	
    if (evento.currentTarget.childNodes.length > 0) {

        return false;
    }

    linhaDestino = casaDestinoIdSplit[3];
    colunaDestino = casaDestinoIdSplit[1];

    if (obrigaMesmaPedra === 'true' && pedraDaVez != nomePedra) {
        AnimarCasaPorColunaLinha(colunaAtual, linhaAtual);
        return false;
    }

    //if (pedraDaVez != '' || pedraDaVez != nomePedraSplit) {

    //    return false;
    //}

    if ($('#cbDesligarRegras').is(':checked')) {

        if (localStorage.JogadorAtual == nomePedraSplit[0]) {


            if (!VerificarCasaDestinoValida(linhaAtual, colunaAtual, linhaDestino, colunaDestino, nomePedraSplit[0])) {
                return false;
            } else {

                //verifica se é obrigado a jogar a mesma pedra
                if (Boolean(ObrigarJogadaDama(colunaDestino, linhaDestino, nomePedraSplit[0]))) {

                    //pedra da vez é a pedra que é obrigada a jogar de novo
                    pedraDaVez = nomePedra;
                    obrigaMesmaPedra = Boolean(true);
                }
                else {
                    // RemoverPedra(pedra);
                    RemoverPedrasMarcadas(nomePedraSplit[0]);
                    obrigaMesmaPedra = Boolean(false);
                    pedraDaVez = '';

                    AlteradorJogadorDaVez(nomePedraSplit[0]);

                }

                pedra.attr('linhaatual', linhaDestino);
                pedra.attr('colunaatual', colunaDestino);

                return true;
            }


            //nomeCasaPulada = "CasaColuna_" + colunaCasaPulada + "_Linha_" + linhaCasaPulada;

            ////console.log('nomeCasaPulada = ' + nomeCasaPulada);

            //casaPulada = $('#' + nomeCasaPulada);

            ////verica se existe pedra na casa pulada
            //if (casaPulada.find('img:first').length > 0) {

            //    imagemPedraPulada = casaPulada.find('img:first')["0"].currentSrc;


            //    //verifica se a pedra comida é da mesma cor ... se for não deixa
            //    if (imagemPedraPulada === pedra["0"].currentSrc) {
            //        return false;
            //    }
            //    else {

            //        RemoverPedra(casaPulada.find('img:first')["0"]);
            //        AnimarCasa(casaDestino, true);

            //        pedraRemovida = Boolean(true);
            //    }

            //}
            //else {

            //    return false;
            //}



            //atualizaa propriedade da pedra com a nova linha 

            return true;
        }
        else {

            $("#lnkAbrirPopup").trigger("click");
            return false;
        }
    }


    return true;
}


function VerificarCasaDestinoValida(linhaAtual, colunaAtual, linhaDestino, colunaDestino, jogador, isDama) {

    let qtdeLinhasAvancadas;
    let qtdeColunasAvancadas;
    let contadorColuna;
    let contadorLinha;
    let linhaValidar;
    let colunaValidar;
    let direcaoAvancoX;
    let direcaoAvancoY;
    let casa;
    let existePedraNaCasaAnterior;
    let arrayCasasMarcadas = [];
    let colLinhaCasaMarcasa = {};
    let result = Boolean(false);

    existePedraNaCasaAnterior = false;

    //da coluna A para H
    if (colunaAtual > colunaDestino) {
        direcaoAvancoX = "COLUNA_DE_A_PARA_H";
        qtdeColunasAvancadas = colunaAtual - colunaDestino;
    }
    else {
        direcaoAvancoX = "COLUNA_DE_H_PARA_A";
        qtdeColunasAvancadas = colunaDestino - colunaAtual;
    }

    if (linhaAtual > linhaDestino) {
        direcaoAvancoY = "LINHA_DE_8_PARA_1";
        qtdeLinhasAvancadas = linhaAtual - linhaDestino;

    } else {
        direcaoAvancoY = "LINHA_DE_1_PARA_8";
        qtdeLinhasAvancadas = linhaDestino - linhaAtual;
    }

    if (qtdeLinhasAvancadas != qtdeColunasAvancadas) {

        return false;
    }


    contadorColuna = colunaAtual;
    contadorLinha = linhaAtual;

    while (contadorColuna != colunaDestino && contadorLinha != linhaDestino) {

        if (direcaoAvancoX == "COLUNA_DE_A_PARA_H") {

            contadorColuna--;
        } else {
            contadorColuna++;
        }

        if (direcaoAvancoY == "LINHA_DE_1_PARA_8") {
            contadorLinha++;
        }
        else {
            contadorLinha--;
        }

        casa = $('#CasaColuna_' + contadorColuna + '_Linha_' + contadorLinha);

        if (contadorColuna != colunaDestino && contadorLinha != linhaDestino) {

            AnimarCasa(casa[0], true);

            //verifica se existe uma pedra do mesmo jogador
            if (VerificarSeExistePedra(contadorColuna, contadorLinha, true, jogador)) {
                return false;
            }

            //verifica se existe pedra do adversario
            if (VerificarSeExistePedra(contadorColuna, contadorLinha, false, jogador)) {

                //se existe pedra marca ela 
                if (!existePedraNaCasaAnterior) {
                    existePedraNaCasaAnterior = true;
                    MarcarPedra(contadorColuna, contadorLinha, false, jogador, true);

                    colLinhaCasaMarcasa = { 'coluna': contadorColuna, 'linha': contadorLinha };
                    arrayCasasMarcadas.push(colLinhaCasaMarcasa);
                }
                else {

                    for (var i = 0; i < arrayCasasMarcadas.length; i++) {

                        MarcarPedra(arrayCasasMarcadas[i].coluna, arrayCasasMarcadas[i].linha, false, jogador, false);
                    }

                    return false;
                }

            } else {

                //nao é dama e nao tem pedra do adversario 
                if (isDama === 'false') {
                    return false;
                }

                existePedraNaCasaAnterior = false;
            }

        }
    }


    return true;
}

/********************************************************************
**** Verifica se tem pedra para ser comida e o jogador nao viu *****
*********************************************************************/
function ObrigarJogadaDama(colunaAtualPedra, linhaAtualPedra, jogador) {

    let nomePedra;
    let casaVizinha;
    let linhaCasaVizinha;
    let colunaCasaVizinha;
    let existePedraNaCasaVizinha = Boolean(false);
    let existePedraNaCasaDestino = Boolean(false);
    let jogadorAdiversario;
    let casaDestino;
    let existeCasaVizinha = Boolean(true);
    let existeCasaDestino = Boolean(false);
    let linhaCasaDestino;
    let colunaCasaDestino;
    let direcao;
    let existeJogadaDisponivel = Boolean(false);
    let existePedraNaCasaAnterior = Boolean(false);


    for (var i = 0; i < 4; i++) {

        existePedraNaCasaAnterior = Boolean(false);
        debugger;
        switch (i) {

            case 0: direcao = "DE_A_PARA_H_DE_1_8";
                break;
            case 1: direcao = "DE_A_PARA_H_DE_8_1";
                break;
            case 2: direcao = "DE_H_PARA_A_DE_1_8";
                break;
            case 3: direcao = "DE_H_PARA_A_DE_8_1";
                break;

        }

        existeCasaVizinha = true;

        linhaCasaVizinha = linhaAtualPedra;
        colunaCasaVizinha = colunaAtualPedra;

        while (existeCasaVizinha) {

            switch (direcao) {

                case "DE_A_PARA_H_DE_1_8":
                    linhaCasaVizinha++;
                    colunaCasaVizinha--;
                    break;
                case "DE_A_PARA_H_DE_8_1":
                    linhaCasaVizinha--;
                    colunaCasaVizinha++;
                    break;
                case "DE_H_PARA_A_DE_1_8":
                    linhaCasaVizinha++;
                    colunaCasaVizinha++;
                    break;
                case "DE_H_PARA_A_DE_8_1":
                    linhaCasaVizinha--;
                    colunaCasaVizinha--;
                    break;
            }//fim switch direcao



            existeCasaVizinha = VerificarSeExisteCasa(colunaCasaVizinha, linhaCasaVizinha);

            if (existeCasaVizinha) {


                //verifica se existe pedra do mesmo jogador
                if (Boolean(VerificarSeExistePedra(colunaCasaVizinha, linhaCasaVizinha, true, jogador))) {
                    break;
                }

                //verifica se existe pedra marcada para ser comida
                if (Boolean(VerificarSeExistePedra(colunaCasaVizinha, linhaCasaVizinha, false, jogador, true))) {
                    break;
                }


                //verifica se existe pedra do outro jogador
                if (Boolean(VerificarSeExistePedra(colunaCasaVizinha, linhaCasaVizinha, false, jogador))) {
                    if (existePedraNaCasaAnterior == true) {
                        break;
                    }
                    existePedraNaCasaAnterior = true;
                }
                else {
                    if (existePedraNaCasaAnterior == true) {
                        //já existe uma jogada que pode ser feita com a dama
                        existeJogadaDisponivel = true;

                        casaVizinha = $('#CasaColuna_' + colunaCasaVizinha + '_Linha_' + linhaCasaVizinha);
                        AnimarCasa(casaVizinha, false);


                    }

                    existePedraNaCasaAnterior = false;
                }


            }//fim if se existe casa vizinha



        }//fim switch existeCasa

        //***return existeJogadaDisponivel;
    }//fim do for - das quatro direcoes

    return existeJogadaDisponivel;
};

/************************************************************
*** Verifica se pode colocar a pedra no destino *************
************************************************************/
function VerificarJogada(evento, casaDestino, nomePedra) {

    var nomePedraSplit = nomePedra.split('_');
    var casaDestinoIdSplit = casaDestino.id.split('_');
    var linhaDestino;
    var pedra = $('#' + nomePedra);
    var linhaAtual = pedra.attr('linhaatual');
    var colunaAtual = pedra.attr('colunaatual');
    var colunaDestino;
    var direcaoMvmtoVertical;
    var colunaCasaPulada;
    var linhaCasaPulada;
    var nomeCasaPulada;
    var casaPulada;
    var linhaDestinoOK;
    var qtdeLinhasAvancadas;
    var imagemPedraPulada;
    var pedraRemovida = Boolean(false);

    //verifica se é casa branca
    if (casaDestino.style.backgroundColor == 'white') {
        return false;
    }

    //verifica se já existe uma pedra na casa destino	
    if (evento.currentTarget.childNodes.length > 0) {

        return false;
    }

    linhaDestino = casaDestinoIdSplit[3];
    colunaDestino = casaDestinoIdSplit[1];

    //pedraDaVez = nomePedra;


    //*************************************************************
    //*************************************************************


    

    if ($('#cbDesligarRegras').is(':checked')) {

        if (localStorage.JogadorAtual != nomePedraSplit[0]) {
            AbrirPopup();
            return false;
        }

        if (colunaAtual === colunaDestino) {
            return false;
        }


        if (obrigaMesmaPedra === true && pedraDaVez != nomePedra) {
            return false;
        }

        //verifcacao do jogar J1
        if (nomePedraSplit[0] == 'J1') {
            linhaDestinoOK = Boolean((linhaDestino > linhaAtual));

            //verifica qtde de linhas avancadas
            qtdeLinhasAvancadas = parseInt(linhaDestino) - parseInt(linhaAtual);

            if (colunaAtual < colunaDestino) {

                direcaoMvmtoVertical = 'Esquerda';
            }
            else {
                direcaoMvmtoVertical = 'Direita';
            }
        }
        else {

            linhaDestinoOK = Boolean((linhaDestino < linhaAtual));

            //verifica qtde de linhas avancadas
            qtdeLinhasAvancadas = parseInt(linhaAtual) - parseInt(linhaDestino);

            if (colunaAtual > colunaDestino) {

                direcaoMvmtoVertical = 'Esquerda';

            }
            else {
                direcaoMvmtoVertical = 'Direita';
            }

        }


        //if (!linhaDestinoOK) {
        //    if (!Boolean(VerificarPedrasVizinhas(linhaAtual, colunaAtual, nomePedraSplit[0]))) {
        //        return false;
        //    }
        //}

        //pulou duas casas 
        //if (qtdeLinhasAvancadas == 2 || qtdeLinhasAvancadas == -2) {


        //verifica se é o jogador 1
        //if (nomePedraSplit[0] == 'J1') {
        //    //verifica para que lado a pedra foi movimentada
        //    if (direcaoMvmtoVertical == 'Direita') {

        //        colunaCasaPulada = parseInt(colunaDestino) + 1;

        //        if (qtdeLinhasAvancadas == 2) {
        //            linhaCasaPulada = parseInt(linhaDestino) - 1;
        //        } else {
        //            linhaCasaPulada = parseInt(linhaDestino) + 1;
        //        }
        //    }
        //    else {

        //        colunaCasaPulada = parseInt(colunaDestino) - 1;

        //        if (qtdeLinhasAvancadas == 2) {
        //            linhaCasaPulada = parseInt(linhaDestino) - 1;
        //        } else {
        //            linhaCasaPulada = parseInt(linhaDestino) + 1;
        //        }
        //    }
        //}
        //else {

        //    //verifica para que lado a pedra foi movimentada
        //    if (direcaoMvmtoVertical == 'Direita') {

        //        colunaCasaPulada = parseInt(colunaDestino) - 1;

        //        if (qtdeLinhasAvancadas == 2) {
        //            linhaCasaPulada = parseInt(linhaDestino) + 1;
        //        }
        //        else {
        //            linhaCasaPulada = parseInt(linhaDestino) - 1;
        //        }
        //    }
        //    else {

        //        colunaCasaPulada = parseInt(colunaDestino) + 1;

        //        if (qtdeLinhasAvancadas == 2) {
        //            linhaCasaPulada = parseInt(linhaDestino) + 1;
        //        } else {
        //            linhaCasaPulada = parseInt(linhaDestino) - 1;
        //        }
        //    }
        //}


        if (!VerificarCasaDestinoValida(linhaAtual, colunaAtual, linhaDestino, colunaDestino, nomePedraSplit[0], 'false')) {
            return false;
        } else {


            if (qtdeLinhasAvancadas == 1 || qtdeLinhasAvancadas == -1) {

                if (!linhaDestinoOK) {
                    return false;
                }

                if (Boolean(ObrigarJogada(nomePedraSplit[0], ''))) {
                    return false;
                }
            }
            else {

                if (ObrigarJogadaPorLinhaColuna(nomePedraSplit[0], linhaDestino, colunaDestino)) {

                    obrigaMesmaPedra = Boolean(true);
                    pedraDaVez = nomePedra;
                }
                else {
                    RemoverPedrasMarcadas(nomePedraSplit[0]);
                    obrigaMesmaPedra = Boolean(false);
                    pedraDaVez = '';
                }
            }

        }



        //nomeCasaPulada = "CasaColuna_" + colunaCasaPulada + "_Linha_" + linhaCasaPulada;


        //casaPulada = $('#' + nomeCasaPulada);

        ////verica se existe pedra na casa pulada
        //if (casaPulada.find('img:first').length > 0) {

        //    imagemPedraPulada = casaPulada.find('img:first')["0"].currentSrc;

        //    //verifica se a pedra comida é da mesma cor ... se for não deixa
        //    if (imagemPedraPulada === pedra["0"].currentSrc) {
        //        return false;
        //    }
        //    else {

        //        //RemoverPedra(casaPulada.find('img:first')["0"]);
        //        MarcarPedra(colunaCasaPulada, linhaCasaPulada, false, nomePedraSplit[0], true);
        //        AnimarCasa(casaDestino, true);

        //        AnimarCasaPorColunaLinha(colunaCasaPulada, linhaCasaPulada, false);

        //        //  pedraRemovida = Boolean(true);

        //if (ObrigarJogadaPorLinhaColuna(nomePedraSplit[0], linhaDestino, colunaDestino)) {

        //    obrigaMesmaPedra = Boolean(true);
        //    pedraDaVez = nomePedra;
        //}
        //else {
        //    RemoverPedrasMarcadas(nomePedraSplit[0]);
        //    obrigaMesmaPedra = Boolean(false);
        //    pedraDaVez = '';
        //}


        //    }
        //}
        //else {

        //    return false;
        //}

        //}
        //else
        //    if (qtdeLinhasAvancadas > 2) {
        //        return false;
        //    }


        if (colunaAtual == colunaDestino) {
            return false;
        }

        if (!obrigaMesmaPedra) {

            AlteradorJogadorDaVez(nomePedraSplit[0]);

            AnimarCasa(casaDestino, true);

            localStorage.RepeteJogador = false;
        }

    }//IF DESLIGAR REGRAS  

    //atualizaa propriedade da pedra com a nova linha 
    pedra.attr('linhaatual', linhaDestino);
    pedra.attr('colunaatual', colunaDestino);

    TransformarEmDama(pedra, linhaDestino, nomePedraSplit);

    return true;

}

function AlteradorJogadorDaVez(jogadorAtual) {

    if (jogadorAtual == 'J1') {
        localStorage.JogadorAtual = 'J2';
    } else {
        localStorage.JogadorAtual = 'J1';
    }


    if (localStorage.JogadorAtual == 'J1') {
        $('#imgUltimoJogador').attr('src', 'Imagens\\BotaoPreto.png');
    }
    else {
        $('#imgUltimoJogador').attr('src', 'Imagens\\BotaoVermelho.png');

    }

}

function VerificarSeExisteCasa(coluna, linha) {

    let casa = $('#CasaColuna_' + coluna + '_Linha_' + linha).length;

    if (!casa) {
        return false;
    }
    else {
        return true;
    }

}

/*********************************************************************
 * ****** Verifica se existe pedra na casa  *************************
 * @param {any} coluna                      ********************
 * @param {any} linha                       ********************
 * @param {any} considerarCor               ********************
 * @param {any} jogador                     ********************
 *********************************************************************
***********************************************************************/
function VerificarSeExistePedra(coluna, linha, considerarCor, jogador, considerarPedraMarcada) {

    let casa = $('#CasaColuna_' + coluna + '_Linha_' + linha);
    let pedra;
    let nomePedraSplit;

    if (casa.find('img:first').length > 0) {

        pedra = casa.find('img:first');

        if (Boolean(considerarCor)) {

            //console.log(pedra);
            nomePedraSplit = pedra.attr('id').split('_');

            if (nomePedraSplit[0] == jogador) {

                return true;
            }
            else {
                return false;
            }
        }

        //considerar pedra marcada
        if (Boolean(considerarPedraMarcada)) {

            // console.log(pedra);
            nomePedraSplit = pedra.attr('id').split('_');

            if (pedra.attr('marcada') == 'true') {
                return true;
            }
            else {
                return false;
            }
        }

        return true;
    }
    else {
        return false;
    }

}



/************************************************************************************
 * **********************************************************************************
****** Marca a propriedade marcada da pedra 
 * @param {any} coluna
 * @param {any} linha
 * @param {any} considerarCor
 * @param {any} jogador
 * @param {any} isPedraComida*** boolean -- se for pra marcar passa true
 *************************************************************************************/
function MarcarPedra(coluna, linha, considerarCor, jogador, isPedraComida) {

    let casa = $('#CasaColuna_' + coluna + '_Linha_' + linha);
    let pedra;
    let nomePedraSplit;

    if (casa.find('img:first').length > 0) {

        pedra = casa.find('img:first');

        if (Boolean(considerarCor)) {

            nomePedraSplit = pedra.attr('id').split('_');

            if (nomePedraSplit[0] == jogador) {

                pedra.attr('marcada', Boolean(isPedraComida));
            }
        } else {

            pedra.attr('marcada', Boolean(isPedraComida));
        }

        return true;
    }
    else {
        return false;
    }

}


function ObrigarJogadaPorLinhaColuna(jogador, linhaDestino, colunaDestino) {

    let linhaAtualPedra;
    let colunaAtualPedra;
    let casaVizinha;
    let linhaCasaVizinha;
    let colunaCasaVizinha;
    let existePedraNaCasaVizinha = Boolean(false);
    let existePedraNaCasaDestino = Boolean(false);
    let jogadorAdiversario;
    let existeJogadaObrigatoria = Boolean(false);
    let casaDestino;
    let existeCasaVizinha = Boolean(false);
    let existeCasaDestino = Boolean(false);
    let linhaCasaDestino;
    let colunaCasaDestino;

    linhaAtualPedra = linhaDestino;
    colunaAtualPedra = colunaDestino;

    //verifica a última casa da primeira linha
    for (var i = 0; i <= 3; i++) {

        //verifica casa acima lado direito
        if (i == 0) {
            linhaCasaVizinha = parseInt(linhaAtualPedra) + 1;
            colunaCasaVizinha = parseInt(colunaAtualPedra) - 1;
            linhaCasaDestino = parseInt(linhaCasaVizinha) + 1;
            colunaCasaDestino = parseInt(colunaCasaVizinha) - 1;

        }//Verifca casa acima lado esquerdo
        else if (i == 1) {
            linhaCasaVizinha = parseInt(linhaAtualPedra) + 1;
            colunaCasaVizinha = parseInt(colunaAtualPedra) + 1;
            linhaCasaDestino = parseInt(linhaCasaVizinha) + 1;
            colunaCasaDestino = parseInt(colunaCasaVizinha) + 1;

        }
        else if (i == 2) {

            linhaCasaVizinha = parseInt(linhaAtualPedra) - 1;
            colunaCasaVizinha = parseInt(colunaAtualPedra) + 1;
            linhaCasaDestino = parseInt(linhaCasaVizinha) - 1;
            colunaCasaDestino = parseInt(colunaCasaVizinha) + 1;

        }
        else if (i == 3) {
            linhaCasaVizinha = parseInt(linhaAtualPedra) - 1;
            colunaCasaVizinha = parseInt(colunaAtualPedra) - 1;
            linhaCasaDestino = parseInt(linhaCasaVizinha) - 1;
            colunaCasaDestino = parseInt(colunaCasaVizinha) - 1;
        }

        existeCasaVizinha = Boolean(VerificarSeExisteCasa(linhaCasaVizinha, colunaCasaVizinha));
        existeCasaDestino = Boolean(VerificarSeExisteCasa(linhaCasaDestino, colunaCasaDestino));

        if (Boolean(existeCasaVizinha) && Boolean(existeCasaDestino)) {

            if (jogador == 'J1') {
                jogadorAdiversario = 'J2';
            }
            else {
                jogadorAdiversario = 'J1';
            }

            //verifica se existe uma predra do mesmo jogador
            existePedraNaCasaVizinha = VerificarSeExistePedra(colunaCasaVizinha, linhaCasaVizinha, true, jogador);

            if (!existePedraNaCasaVizinha) {

                //verifica se existe uma predra do outro jogador
                existePedraNaCasaVizinha = VerificarSeExistePedra(colunaCasaVizinha, linhaCasaVizinha, true, jogadorAdiversario);

                if (existePedraNaCasaVizinha) {

                    //verifica se a casa onde a pedra vai ser colocada já possui pedra
                    if (!Boolean(VerificarSeExistePedra(colunaCasaDestino, linhaCasaDestino, false, jogador))) {

                        let casa = $('#CasaColuna_' + colunaCasaDestino + '_Linha_' + linhaCasaDestino);

                        //  console.log('casa = ------ ' + casa);
                        // console.log(casa);

                        AnimarCasa(casa[0], false);

                        existeJogadaObrigatoria = Boolean(true);
                    }
                }
            };
        }
    }

    return existeJogadaObrigatoria;

}

/********************************************************************
**** Verifica se tem pedra para ser comida e o jogador nao viu *****
*********************************************************************/
function ObrigarJogada(jogador) {

    //let nomePedra;
    let linhaAtualPedra;
    let colunaAtualPedra;
    let casaVizinha;
    let linhaCasaVizinha;
    let colunaCasaVizinha;
    let existePedraNaCasaVizinha = Boolean(false);
    let existePedraNaCasaDestino = Boolean(false);
    let jogadorAdiversario;
    let existeJogadaObrigatoria = Boolean(false);
    let casaDestino;
    let existeCasaVizinha = Boolean(false);
    let existeCasaDestino = Boolean(false);
    let linhaCasaDestino;
    let colunaCasaDestino;
    let expressaoPesquisa;


    $("#dvTabuleiro img").each(function (index, element) {

        //nomePedra = element.id;

        if ($(this).is("." + jogador)) {


            linhaAtualPedra = $(this).attr('linhaatual');
            colunaAtualPedra = $(this).attr('colunaatual');

            //verifica a última casa da primeira linha
            for (var i = 0; i <= 3; i++) {

                //verifica casa acima lado direito
                if (i == 0) {
                    linhaCasaVizinha = parseInt(linhaAtualPedra) + 1;
                    colunaCasaVizinha = parseInt(colunaAtualPedra) - 1;
                    linhaCasaDestino = parseInt(linhaCasaVizinha) + 1;
                    colunaCasaDestino = parseInt(colunaCasaVizinha) - 1;

                }//Verifca casa acima lado esquerdo
                else if (i == 1) {
                    linhaCasaVizinha = parseInt(linhaAtualPedra) + 1;
                    colunaCasaVizinha = parseInt(colunaAtualPedra) + 1;
                    linhaCasaDestino = parseInt(linhaCasaVizinha) + 1;
                    colunaCasaDestino = parseInt(colunaCasaVizinha) + 1;

                }
                else if (i == 2) {

                    linhaCasaVizinha = parseInt(linhaAtualPedra) - 1;
                    colunaCasaVizinha = parseInt(colunaAtualPedra) + 1;
                    linhaCasaDestino = parseInt(linhaCasaVizinha) - 1;
                    colunaCasaDestino = parseInt(colunaCasaVizinha) + 1;

                }
                else if (i == 3) {
                    linhaCasaVizinha = parseInt(linhaAtualPedra) - 1;
                    colunaCasaVizinha = parseInt(colunaAtualPedra) - 1;
                    linhaCasaDestino = parseInt(linhaCasaVizinha) - 1;
                    colunaCasaDestino = parseInt(colunaCasaVizinha) - 1;
                }

                existeCasaVizinha = Boolean(VerificarSeExisteCasa(linhaCasaVizinha, colunaCasaVizinha));
                existeCasaDestino = Boolean(VerificarSeExisteCasa(linhaCasaDestino, colunaCasaDestino));

                if (Boolean(existeCasaVizinha) && Boolean(existeCasaDestino)) {

                    if (jogador == 'J1') {
                        jogadorAdiversario = 'J2';
                    }
                    else {
                        jogadorAdiversario = 'J1';
                    }

                    //verifica se existe uma predra do mesmo jogador
                    existePedraNaCasaVizinha = VerificarSeExistePedra(colunaCasaVizinha, linhaCasaVizinha, true, jogador);

                    if (!existePedraNaCasaVizinha) {

                        //verifica se existe uma predra do outro jogador
                        existePedraNaCasaVizinha = VerificarSeExistePedra(colunaCasaVizinha, linhaCasaVizinha, true, jogadorAdiversario);

                        if (existePedraNaCasaVizinha) {

                            //verifica se a casa onde a pedra vai ser colocada já possui pedra
                            if (!Boolean(VerificarSeExistePedra(colunaCasaDestino, linhaCasaDestino, false, jogador))) {

                                let casa = $('#CasaColuna_' + colunaCasaDestino + '_Linha_' + linhaCasaDestino);

                                //  console.log('casa = ------ ' + casa);
                                // console.log(casa);

                                AnimarCasa(casa[0], false);

                                existeJogadaObrigatoria = true;
                            }
                        }
                    };
                }
            }
        }
    });

    return existeJogadaObrigatoria;
};

/*************************************************************************
*** Transforma a pedra normal em dama ************************************
 * ***********************************************************************
 * @param {any} pedra
 * @param {any} linhaDestino
 * @param {any} nomePedraSplit
 ************************************************************************/
function TransformarEmDama(pedra, linhaDestino, nomePedraSplit) {

    //console.log('(nomePedraSplit[0] = ' + nomePedraSplit[0]);
    //console.log('(linhaDestino = ' + linhaDestino[0]);


    if (nomePedraSplit[0] == 'J1' && linhaDestino == 7) {
        pedra.attr('dama', Boolean(true));
        pedra.attr('src', 'Imagens\\DamaPreta.png');
    }
    else
        if (nomePedraSplit[0] == 'J2' && linhaDestino == 0) {
            pedra.attr('dama', Boolean(true));
            pedra.attr('src', 'Imagens\\DamaVermelha.png');
        }
}


function RemoverPedrasMarcadas(jogador) {
    let marcada = Boolean(false);
    let nomePedra;
    let linhaAtualPedra;
    let colunaAtualPedra;

    debugger;

    if (jogador == 'J1') {
        jogador = 'J2';
    } else {
        jogador = 'J1';
    }

    $("#dvTabuleiro img").each(function (index, element) {

        nomePedra = element.id;

        if ($(this).is("." + jogador)) {

            linhaAtualPedra = $(this).attr('linhaatual');
            colunaAtualPedra = $(this).attr('colunaatual');
            marcada = $(this).attr('marcada');

            console.log(marcada);

            if (marcada == 'true') {

                let casa = $('#CasaColuna_' + colunaAtualPedra + '_Linha_' + linhaAtualPedra);


                RemoverPedra(casa.find('img:first')["0"]);

                AnimarCasa(casa, false);
            }
        }
    });

}


function RemoverPedra(pedra) {

    //$('#' + pedra.id).animate({
    //    width: "5px",
    //});
    //$('#' + pedra.id).remove();
    localStorage.RepeteJogador = true;
    $('#' + pedra.id).fadeOut(500, function () { $(this).remove(); });


}

function AnimarCasa(casaDestino, validarJogada) {

    //console.log('casaDestino = ******' + casaDestino);
    //console.log(casaDestino);

    if (Boolean(validarJogada)) {

        $('#' + casaDestino.id).animate({ opacity: '0.5' }, "slow");
        $('#' + casaDestino.id).animate({ opacity: '1' }, "slow");
        $('#' + casaDestino.id).animate({ opacity: '0.5' }, "slow");
        $('#' + casaDestino.id).animate({ opacity: '1' }, "slow");
    } else {
        $('#' + casaDestino.id).animate({ opacity: '0.5', backgroundColor: 'blue' }, "slow");
        $('#' + casaDestino.id).animate({ opacity: '1' }, "slow");
        $('#' + casaDestino.id).animate({ opacity: '0.5' }, "slow");
        $('#' + casaDestino.id).animate({ opacity: '1' }, "slow");
        $('#' + casaDestino.id).animate({ opacity: '1', backgroundColor: 'black' }, "slow");

    }


}

/************************************************************************
 * Anima casa recebendo coluna e linha
 * @param {any} coluna
 * @param {any} linha
 * @param {any} validarJogada
 ************************************************************************/
function AnimarCasaPorColunaLinha(coluna, linha, validarJogada) {

    let casa = $('#CasaColuna_' + coluna + '_Linha_' + linha);
    //console.log('casaDestino = ******' + casaDestino);
    //console.log(casaDestino);

    if (Boolean(validarJogada)) {

        $('#' + casa[0].id).animate({ opacity: '0.5' }, "slow");
        $('#' + casa[0].id).animate({ opacity: '1' }, "slow");
        $('#' + casa[0].id).animate({ opacity: '0.5' }, "slow");
        $('#' + casa[0].id).animate({ opacity: '1' }, "slow");
    } else {
        $('#' + casa[0].id).animate({ opacity: '0.5', backgroundColor: 'blue' }, "slow");
        $('#' + casa[0].id).animate({ opacity: '1' }, "slow");
        $('#' + casa[0].id).animate({ opacity: '0.5' }, "slow");
        $('#' + casa[0].id).animate({ opacity: '1' }, "slow");
        $('#' + casa[0].id).animate({ opacity: '1', backgroundColor: 'black' }, "slow");
    }

}

function VerficarOnMouseEnter(casaMouseEnter) {
    //console.log(localStorage.PedraSelecionada);
    //console.log(localStorage.checarMouseEnter);
    if (localStorage.checarMouseEnter == 'true') {
        //alert(casaMouseEnter);	
        //console.log('passou aqui');
    }

}


function SelecionarPedra(pedraSelecionada) {

    localStorage.PedraSelecionada = pedraSelecionada.id;

    // console.log(localStorage.PedraSelecionada);
}


function VerificarPedrasVizinhas(linhaAtualPedra, colunaAtualPedra, jogador) {

    let nomePedra;
    //let linhaAtualPedra;
    //let colunaAtualPedra;
    let casaVizinha;
    let linhaCasaVizinha;
    let colunaCasaVizinha;
    let existePedraNaCasaVizinha = Boolean(false);
    let existePedraNaCasaDestino = Boolean(false);
    let jogadorAdiversario;
    let existeJogada = Boolean(false);
    let casaDestino;
    let existeCasaVizinha = Boolean(false);
    let existeCasaDestino = Boolean(false);
    let linhaCasaDestino;
    let colunaCasaDestino;

    //verifica a última casa da primeira linha
    for (var i = 0; i <= 3; i++) {

        //verifica casa acima lado direito
        if (i == 0) {
            linhaCasaVizinha = parseInt(linhaAtualPedra) + 1;
            colunaCasaVizinha = parseInt(colunaAtualPedra) - 1;
            linhaCasaDestino = parseInt(linhaCasaVizinha) + 1;
            colunaCasaDestino = parseInt(colunaCasaVizinha) - 1;

        }//Verifca casa acima lado esquerdo
        else if (i == 1) {
            linhaCasaVizinha = parseInt(linhaAtualPedra) + 1;
            colunaCasaVizinha = parseInt(colunaAtualPedra) + 1;
            linhaCasaDestino = parseInt(linhaCasaVizinha) + 1;
            colunaCasaDestino = parseInt(colunaCasaVizinha) + 1;

        }
        else if (i == 2) {

            linhaCasaVizinha = parseInt(linhaAtualPedra) - 1;
            colunaCasaVizinha = parseInt(colunaAtualPedra) + 1;
            linhaCasaDestino = parseInt(linhaCasaVizinha) - 1;
            colunaCasaDestino = parseInt(colunaCasaVizinha) + 1;

        }
        else if (i == 3) {
            linhaCasaVizinha = parseInt(linhaAtualPedra) - 1;
            colunaCasaVizinha = parseInt(colunaAtualPedra) - 1;
            linhaCasaDestino = parseInt(linhaCasaVizinha) - 1;
            colunaCasaDestino = parseInt(colunaCasaVizinha) - 1;
        }

        existeCasaVizinha = Boolean(VerificarSeExisteCasa(linhaCasaVizinha, colunaCasaVizinha));
        existeCasaDestino = Boolean(VerificarSeExisteCasa(linhaCasaDestino, colunaCasaDestino));

        if (Boolean(existeCasaVizinha) && Boolean(existeCasaDestino)) {

            if (jogador == 'J1') {
                jogadorAdiversario = 'J2';
            }
            else {
                jogadorAdiversario = 'J1';
            }

            //verifica se existe uma predra do mesmo jogador
            existePedraNaCasaVizinha = VerificarSeExistePedra(colunaCasaVizinha, linhaCasaVizinha, true, jogador);

            if (!existePedraNaCasaVizinha) {

                //verifica se existe uma predra do outro jogador
                existePedraNaCasaVizinha = VerificarSeExistePedra(colunaCasaVizinha, linhaCasaVizinha, true, jogadorAdiversario);

                if (existePedraNaCasaVizinha) {

                    //verifica se a casa onde a pedra vai ser colocada já possui pedra
                    if (!Boolean(VerificarSeExistePedra(colunaCasaDestino, linhaCasaDestino, false, jogador))) {

                        let casa = $('#CasaColuna_' + colunaCasaDestino + '_Linha_' + linhaCasaDestino);

                        return true;
                    }
                }
            }
        }
    }

    return false;
}

function AbrirPopup() {

    $("#lnkAbrirPopup").trigger("click");
    // $("div.wrap").slideUp(300).delay(800).fadeIn(400);

    $('#lnkAbrirPopup').delay(1500).queue(function () {
        $(this).trigger('click');
    });

}


function TabuleiroTeste() {
    var dvTabul = $('#dvTabuleiro');
    let tabuleiro = "<div class='row' id= 'Linha_0' > <div class='column casa col-sm-1' id='CasaColuna_0_Linha_0' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div> <div class='column casa col-sm-1' id='CasaColuna_1_Linha_0' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'><img class='botao img-responsive J1' src='Imagens\\BotaoPreto.png' id='J1_0_1' draggable='true' ondragstart='drag(event)' ondragend='dragEnd(event)' linhaatual='0' colunaatual='1'></div><div class='column casa col-sm-1' id='CasaColuna_2_Linha_0' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_3_Linha_0' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'><img class='botao img-responsive J1' src='Imagens\\BotaoPreto.png' id='J1_0_3' draggable='true' ondragstart='drag(event)' ondragend='dragEnd(event)' linhaatual='0' colunaatual='3'></div><div class='column casa col-sm-1' id='CasaColuna_4_Linha_0' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_5_Linha_0' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'><img class='botao img-responsive J1' src='Imagens\\BotaoPreto.png' id='J1_0_5' draggable='true' ondragstart='drag(event)' ondragend='dragEnd(event)' linhaatual='0' colunaatual='5'></div><div class='column casa col-sm-1' id='CasaColuna_6_Linha_0' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_7_Linha_0' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'><img class='botao img-responsive J1' src='Imagens\\BotaoPreto.png' id='J1_0_7' draggable='true' ondragstart='drag(event)' ondragend='dragEnd(event)' linhaatual='0' colunaatual='7'></div></div><div class='row' id='Linha_1'><div class='column casa col-sm-1' id='CasaColuna_0_Linha_1' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'><img class='botao img-responsive J1' src='Imagens\\BotaoPreto.png' id='J1_1_0' draggable='true' ondragstart='drag(event)' ondragend='dragEnd(event)' linhaatual='1' colunaatual='0'></div><div class='column casa col-sm-1' id='CasaColuna_1_Linha_1' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_2_Linha_1' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'><img class='botao img-responsive J1' src='Imagens\\BotaoPreto.png' id='J1_1_2' draggable='true' ondragstart='drag(event)' ondragend='dragEnd(event)' linhaatual='1' colunaatual='2'></div><div class='column casa col-sm-1' id='CasaColuna_3_Linha_1' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_4_Linha_1' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'></div><div class='column casa col-sm-1' id='CasaColuna_5_Linha_1' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_6_Linha_1' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'><img class='botao img-responsive J1' src='Imagens\\BotaoPreto.png' id='J1_1_6' draggable='true' ondragstart='drag(event)' ondragend='dragEnd(event)' linhaatual='1' colunaatual='6'></div><div class='column casa col-sm-1' id='CasaColuna_7_Linha_1' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div></div><div class='row' id='Linha_2'><div class='column casa col-sm-1' id='CasaColuna_0_Linha_2' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_1_Linha_2' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'></div><div class='column casa col-sm-1' id='CasaColuna_2_Linha_2' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_3_Linha_2' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0); opacity: 1;'></div><div class='column casa col-sm-1' id='CasaColuna_4_Linha_2' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_5_Linha_2' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0); opacity: 1;'></div><div class='column casa col-sm-1' id='CasaColuna_6_Linha_2' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_7_Linha_2' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'></div></div><div class='row' id='Linha_3'><div class='column casa col-sm-1' id='CasaColuna_0_Linha_3' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'></div><div class='column casa col-sm-1' id='CasaColuna_1_Linha_3' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_2_Linha_3' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0); opacity: 1;'></div><div class='column casa col-sm-1' id='CasaColuna_3_Linha_3' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_4_Linha_3' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0); opacity: 1;'></div><div class='column casa col-sm-1' id='CasaColuna_5_Linha_3' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_6_Linha_3' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0); opacity: 1;'></div><div class='column casa col-sm-1' id='CasaColuna_7_Linha_3' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div></div><div class='row' id='Linha_4'><div class='column casa col-sm-1' id='CasaColuna_0_Linha_4' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_1_Linha_4' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'></div><div class='column casa col-sm-1' id='CasaColuna_2_Linha_4' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_3_Linha_4' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0); opacity: 1;'></div><div class='column casa col-sm-1' id='CasaColuna_4_Linha_4' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_5_Linha_4' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0); opacity: 1;'><img class='botao img-responsive J1' src='Imagens\\BotaoPreto.png' id='J1_1_4' draggable='true' ondragstart='drag(event)' ondragend='dragEnd(event)' linhaatual='4' colunaatual='5'></div><div class='column casa col-sm-1' id='CasaColuna_6_Linha_4' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_7_Linha_4' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0); opacity: 1;'></div></div><div class='row' id='Linha_5'><div class='column casa col-sm-1' id='CasaColuna_0_Linha_5' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'><img class='botao img-responsive J2' src='Imagens\\BotaoVermelho.png' id='J2_5_0' draggable='true' ondragstart='drag(event)' ondragend='dragEnd(event)' linhaatual='5' colunaatual='0'></div><div class='column casa col-sm-1' id='CasaColuna_1_Linha_5' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_2_Linha_5' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'><img class='botao img-responsive J2' src='Imagens\\BotaoVermelho.png' id='J2_5_2' draggable='true' ondragstart='drag(event)' ondragend='dragEnd(event)' linhaatual='5' colunaatual='2'></div><div class='column casa col-sm-1' id='CasaColuna_3_Linha_5' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_4_Linha_5' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0); opacity: 1;'></div><div class='column casa col-sm-1' id='CasaColuna_5_Linha_5' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_6_Linha_5' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'></div><div class='column casa col-sm-1' id='CasaColuna_7_Linha_5' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div></div><div class='row' id='Linha_6'><div class='column casa col-sm-1' id='CasaColuna_0_Linha_6' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_1_Linha_6' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'><img class='botao img-responsive J2' src='Imagens\\BotaoVermelho.png' id='J2_6_1' draggable='true' ondragstart='drag(event)' ondragend='dragEnd(event)' linhaatual='6' colunaatual='1'></div><div class='column casa col-sm-1' id='CasaColuna_2_Linha_6' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_3_Linha_6' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'><img class='botao img-responsive J2' src='Imagens\\BotaoVermelho.png' id='J2_6_3' draggable='true' ondragstart='drag(event)' ondragend='dragEnd(event)' linhaatual='6' colunaatual='3'></div><div class='column casa col-sm-1' id='CasaColuna_4_Linha_6' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_5_Linha_6' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0); opacity: 1;'></div><div class='column casa col-sm-1' id='CasaColuna_6_Linha_6' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_7_Linha_6' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'><img class='botao img-responsive J2' src='Imagens\\BotaoVermelho.png' id='J2_6_7' draggable='true' ondragstart='drag(event)' ondragend='dragEnd(event)' linhaatual='6' colunaatual='7'></div></div><div class='row' id='Linha_7'><div class='column casa col-sm-1' id='CasaColuna_0_Linha_7' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'><img class='botao img-responsive J2' src='Imagens\\BotaoVermelho.png' id='J2_7_0' draggable='true' ondragstart='drag(event)' ondragend='dragEnd(event)' linhaatual='7' colunaatual='0'></div><div class='column casa col-sm-1' id='CasaColuna_1_Linha_7' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_2_Linha_7' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'><img class='botao img-responsive J2' src='Imagens\\BotaoVermelho.png' id='J2_7_2' draggable='true' ondragstart='drag(event)' ondragend='dragEnd(event)' linhaatual='7' colunaatual='2'></div><div class='column casa col-sm-1' id='CasaColuna_3_Linha_7' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_4_Linha_7' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0);'><img class='botao img-responsive J2' src='Imagens\\BotaoVermelho.png' id='J2_7_4' draggable='true' ondragstart='drag(event)' ondragend='dragEnd(event)' linhaatual='7' colunaatual='4'></div><div class='column casa col-sm-1' id='CasaColuna_5_Linha_7' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div><div class='column casa col-sm-1' id='CasaColuna_6_Linha_7' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(0, 0, 0); opacity: 1;'><img class='botao img-responsive J1' src='Imagens\\DamaPreta.png' id='J1_2_1' draggable='true' ondragstart='drag(event)' ondragend='dragEnd(event)' linhaatual='7' colunaatual='6'></div><div class='column casa col-sm-1' id='CasaColuna_7_Linha_7' draggable='false' ondrop='drop(event)' ondragover='allowDrop(event)' style='background-color: rgb(255, 255, 255);'></div></div></div>";

    dvTabul.html(tabuleiro);

}