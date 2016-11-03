# ULBRA-IA-Agentes-Recicladores

Dada uma tarefa da disciplina de Inteligência Artificial I onde envolvia Agentes Reativos, eis a solução desenvolvida por mim.

# Problemática:
- Simular agentes recicladores de lixo autônomos.
- Para isso, vocês deverão construir um ambiente parametrizado, definido por uma matriz n x n (tal como 30 x 30)
para ser o ambiente dos agentes (essa matriz deverá possuir até três tamanhos para escolha do usuário).
- Um ambiente de agente é apresentado na matriz abaixo.
- Os acontecimentos no ambiente serão medidos por ciclos.
- Um ciclo corresponde a uma atualização completa de todos os agentes do ambiente uma vez (abordagem
sequencial) ou a um tempo t a ser definido pelo aluno (abordagem paralela).

# Agente Reciclador de Lixo (A):
- Ele é um agente reativo que se movimenta no ambiente, uma célula em qualquer direção a cada ciclo.
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
Inteligência Artificial
- O agente possui uma pequena memória de controle, na qual ele guarda as coordenadas das lixeiras do ambiente.
- Agentes não podem ocupar a mesma célula que lixeiras e outros agentes, deve desviar.
- O agente recolhe o lixo ao ir para célula em que o lixo está.

# Lixeira de Lixo Orgânico (Lo) e Lixeira de Lixo Seco (Ls):
- São agentes estáticos que o agente reciclador de lixo conhece a posição no ambiente.
- Possuem uma capacidade máxima (a ser definida), que quando atingida deixa de receber sujeira.
- Cada agente só saberá que a lixeira está cheia ao visitá-la e não conseguir descarregar o seu lixo. 
A partir desse momento, cada agente que souber que essa lixeira está cheia, passará a desconsiderá-la.

# Lixo Orgânico (O) e Lixo Seco (S):
- Estão espalhadas no ambiente e deve ser recolhidos pelos agentes (aleatoriamente).
- Cada célula contém apenas um lixo, sendo ele orgânico ou seco.
