# Ajedrez Web

Este proyecto fue creado para manejar mi deminio de JavaScript vanilla, CSS y HTML:

1. Empece haciendo una interfaz sencilla con la cual poder jugar: un botón y el canvas donde estaría el tablero y las fichas

2. Hice una clase principal (piece) de la cual heredaran todas las demás piezas

3. Cree un arreglo con los nombres de las piezas para definir el orden de dibujo de estas

4. Para cada una de las clases que heredaban de piece les añadi un función con la cual calcular sus movimientos

5. Capture el evento click del canvas para que cuando las coordenadas coincidan con alguna de las piezas que estén jugando se dibujen sus movimientos

6. Y para terminar después de realizar el movimiento se cambiara el turno y se validara si la partida queda en jaque mate, tablas o sigue
