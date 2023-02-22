////   THEORY OF CANVAS API  ////

/*
  La "API de Canvas" proporciona un "medio" (UN CONTENEDOR DE GRAFICOS) para dibujar gráficos a través de JavaScript 
  y el elemento HTML: "<canvas>" (HTMLCanvasElement). Entre otras cosas, se puede usar para animación, gráficos de juegos, 
  visualización de datos, manipulación de fotografías y procesamiento de video en tiempo real.

  El elemento HTML "<canvas>" (HTMLCanvasElement) se utiliza para dibujar gráficos, sobre la marcha, a través 
  de secuencias de comandos (normalmente JavaScript).

  El elemento "<canvas>" (etiqueta HTML5 <canvas>) es solo un "contenedor de gráficos". Debe usar un script (instrucciones 
  Javascript) para poder dibujar realmente los gráficos. "Canvas" tiene varios métodos para dibujar "rutas", cuadros, 
  círculos, texto y agregar imágenes.

  El elemento HTML "<canvas>"" (HTMLCanvasElement) no tiene capacidades de dibujo propias (solo es un contenedor para 
  gráficos); debe usar un "script" para dibujar los gráficos.

  El "método getContext()" de un objeto "canvas" devuelve otro "objeto" (el objeto contexto del vanvas) que proporciona 
  métodos y propiedades para dibujar en el lienzo.

  Esta referencia cubrirá las propiedades y los métodos del objeto getContext("2d"), que se puede usar para dibujar texto, 
  líneas, cuadros, círculos y más, en el lienzo.

  "Canvas" puede responder a eventos de JavaScript, es decir puede responder a cualquier acción del usuario 
  (clics de teclas, clics del mouse, clics de botones, movimiento de los dedos).

  La "API de Canvas" se enfoca principalmente en "gráficos 2D". La "API de WebGL", que también utiliza 
  el elemento <canvas>, dibuja gráficos 2D y 3D acelerados por hardware.

  Nota: Las interfaces relacionadas con "WebGLRenderingContext" están referenciadas en "WebGL".
  Nota: puede tener varios elementos <canvas> (HTMLCanvasElement) en una misma página HTML.
  
  Ejemplo básico:  Este sencillo ejemplo dibuja un rectángulo verde en un canvas.

    HTML:  <canvas id="canvas"></canvas>

    JavaScript:  El metodo "document.getElementById()" obtiene una "referencia" al elemento HTML "<canvas>". 
                 A continuación, el metodo: "HTMLCanvasElement.getContext()" obtiene el "contexto" de ese elemento: 
                 la cosa sobre la que se representará el dibujo, getContext() crea un objeto HTML incorporado, con propiedades y métodos 
                 para dibujar.

                 El dibujo real se realiza utilizando la interfaz: "CanvasRenderingContext"". 
                 La propiedad: "fillStyle" hace que el rectángulo sea verde. 
                 El metodo "fillRect()" coloca su esquina superior izquierda en (10, 10) y le da un tamaño de 
                 150 unidades de ancho por 100 de alto.

                const canvas = document.getElementById("canvas");
                const ctx = canvas.getContext("2d");

                ctx.fillStyle = "green";
                ctx.fillRect(10, 10, 150, 100);

  Nota: OffscreenCanvas también está disponible en trabajadores web.

        "CanvasCaptureMediaStreamTrackes" una interfaz relacionada.



 Bibliotecas de tercerros para Canvas:

  La "API de Canvas" es extremadamente poderosa, pero no siempre fácil de usar. Las bibliotecas que se enumeran a
  continuación pueden hacer que la creación de proyectos basados en lienzo sea más rápida y sencilla.

    1.-  EaselJS: es una biblioteca de lienzos de código abierto que facilita la creación de juegos, arte generativo 
                  y otras experiencias altamente gráficas.

    2.-  Fabric.js: es una biblioteca de lienzo de código abierto con capacidades de análisis de SVG.

    3.- heatmap.js: es una biblioteca de código abierto para crear mapas de calor de datos basados en lienzos.

    4.-  JavaScript InfoVis Toolkit: crea visualizaciones de datos interactivas.

    5.-  Konva.js: es una biblioteca de lienzos 2D para aplicaciones móviles y de escritorio.

    6.-  p5.js: tiene un conjunto completo de funciones de dibujo en lienzo para artistas, diseñadores, educadores 
                y principiantes.

    7.-  Paper.js: es un marco de secuencias de comandos de gráficos vectoriales de código abierto que se ejecuta 
                   sobre HTML Canvas.

    8.-  Phaser: es un marco de código abierto rápido, gratuito y divertido para los juegos de navegador basados en Canvas 
                 y WebGL.

    9.-  Pts.js: es una biblioteca para la codificación y visualización creativa en lienzo y SVG.

    10.-  Rekapi: es una API de fotogramas clave de animación para Canvas.

    11.-  Scrawl-canvas: es una biblioteca JavaScript de código abierto para crear y manipular elementos de lienzo 2D.

    El marco "ZIM" proporciona comodidades, componentes y controles para codificar la creatividad en el lienzo; incluye 
    accesibilidad y cientos de coloridos tutoriales.

    "Sprig" es una biblioteca de desarrollo de juegos basada en mosaicos, de código abierto y fácil de usar para 
    principiantes que utiliza Canvas.
*/

/*  1.-   HTML Canvas Drawing.

          Todos los "dibujos - graficos" en el canvas HTML, deben hacerse con JavaScript, se debe crear primero un objeto 
          "context" con el metodo "getContext()", que crea un "objeto" en el convas donde se puede utilizar los distintos 
          metodos que se proporcionan en la API.

          Para trabajar con colores en los elementos "canvas" tenemos varias posibilidades, pero de momento vamos a aprender
          a modificar el color con el que se rellena o se dibuja trazados. En canvas podemos elegir entre dibujar sólo el
          contorno de una forma o dibujarlo rellenos de color. Existen dos atributos del "contexto" del "canvas" que sirven
          para definir el color de relleno (ctx.fillStyle) y el color de trazado (ctx.strokeStyle) a la hora de dibujar
          rectángulos u otros caminos.

        1.1.-  Cambiar el color de relleno con la propiedad del contexto de canvas:  ctx.fillStyle

        Existe un "atributo del contexto del canvas" que almacena el color que se utilizará al rellenar elementos.
        Cambiar el color de relleno es tan sencillo como asignarle valores distintos, de colores en RGB, con lo que
        conseguiremos que la próxima vez que se rellene de color se haga con ese nuevo valor asignado.

          ctx.fillStyle = '#990000';

        Suponiendo que tenemos el objeto contexto de un canvas en la variable "ctx", con la anterior línea estamos
        solicitando al elemento canvas que la próxima vez que se rellene el color se haga en rojo oscuro.


        1.2.-  Cambiar el color de trazado con la propiedad del contexto de canvas:  ctx.strokeStyle

        Cuando dibujamos podemos elegir hacer sólo un "trazado del rectángulo", u otro tipo de camino y para ello se
        utilizará otro color que podemos definir con la propiedad del contexto: "strokeStyle". 
        
        El atributo "strokeStyle" funciona de la misma manera que "fillStyle", pero con la salvedad que servirá para
        indicar el color del trazado.

          ctx.strokeStyle = '#000099';

        Con esa línea estamos marcando que el color de trazado sea azul oscuro. Por lo cual, la próxima vez que se haga
        un trazado la línea será de ese color.

        Otras notaciones para definir colores en canvas:

          Color con nombre: "blue"
          Color con RGB hexadecimal, como se define en HTML: "#ff6600"
          Color con RGB en base decimal: "rgb(100, 25, 206)"
          Color RGBA (canal alpha o transparencia, como en CSS3): "rgba(255, 125, 0, 0.5)"
          Con RGB y porcentaje: "rgb(100%, 20%, 0)"


    2.-   HTML Canvas Coordinates.

          El lienzo HTML es una cuadrícula bidimensional, la esquina superior izquierda del lienzo tiene las coordenadas 
          (0,0), y la inferior derecha (canvas.width -1 , canvas.height - 1)


          2.1-  Dibujo de un rectangulo:  metodo del contexto del canvas:  ctx.fillRect(x0,y0,xf,yf)

          La función "fillRect()" perteneciente al "objeto contexto" de un elemento "canvas", sirve para dibujar rectángulos
          rellenos de color (definido anteriormente con la propiedad ed contexto "fillStyle"). 
          Recibe cuatro parámetros, con este esquema:

            fillRect(x,y,anchura,altura)

          Esto dibuja un rectángulo cuya esquina superior izquierda está en el punto (x,y) y cuyas dimensiones son:
          altura x anchura.

          El color de relleno no lo especificamos en la propia función, sino que es el color que se tenga configurado en
          ese momento como color de relleno, que se indica con la propiedad "fillStyle" del contexto del canvas, asignando
          por ejemplo el RGB de un color.
          

          2.2.-  Dibujo del contorno de un rectangulo:  metodo del contexto  ctx.strokeRect(x0,y0,xf,yf)

          La función "strokeRect(x0,y0,anchura,altura)" sirve para dibujar simplemente la silueta de un rectángulo,
          es decir, sólo su borde. El esquema de parámetros es el siguiente:

            strokeRect(x0,y0,anchura,altura)

          Dibuja el borde de un rectángulo comenzando en la posición (x0,y0) para su esquina superior izquierda y con las
          dimensiones de altura x anchura.

          De manera similar, para definir el color del borde del rectángulo, utilizamos la propiedad de contexto:
          "ctx.strokeStyle", a la que podemos asignar el valor RGB que deseemos para el borde de los cuadrados o aquello
          que vayamos a dibujar en el canvas.


          2.3.-  Borrado de un rectangulo en el canvas:  Función del contexto:  ctx.clearRect(x0,y0,anchura,altura)

          Esta función nos sirve para "borrar" áreas rectangulares de un canvas y hacerlas totalmente transparentes o
          sin contenido gráfico. Funciona de manera similar a los rectángulos:

            clearRect(x,y,anchura,altura)

          El color aquí no importa mucho, porque es simplemente el color del fondo del contenedor HTML donde hayamos
          colocado el canvas.


          2.4.-  Dibujo de una linea:  hay que utilizar los siguientes métodos:

          moveTo(x0,y0) - define el punto de inicio de la línea
          lineTo(xf,yf) - define el punto final de la línea
          stroke() - define "la tinta" en que se dibujara la linea.

          Ejemplo: defina un punto inicial en la posición (0,0) y un punto final en la posición (200,100). 
                   Luego usa el método stroke() para dibujar la línea:

                   const canvas = document.getElementById("myCanvas");
                   const ctx = canvas.getContext("2d");

                   ctx.moveTo(0, 0);
                   ctx.lineTo(200, 100);
                   ctx.stroke();

          En canvas existen diversas "funciones" (metodos del contexto de canvas) que nos pueden servir para dibujar 
          "siluetas" (caminos), que se tienen que utilizar de manera complementaria. El proceso pasa por situarse en un 
          punto del lienzo, luego definir cada uno de los puntos por los que pasa nuestro camino y luego pintar de color 
          dentro, o simplemente dibujar la línea que pasaría por todos esos puntos. 

        Resumen de algunas de los metodos del objeto contexto de canvas para hacer "caminos" en canvas:

        2.4.1.-  Función "beginPath()"
        Sirve para decirle al "contexto del canvas" que vamos a empezar a dibujar un "camino". 
        No tiene ningún parámetro y por si sola no hace ninguna acción visible en el canvas. 
        Una vez invocada la función podremos empezar a dibujar el camino añadiendo segmentos para completarlo con las
        diferentes funciones de caminos.

        2.4.2.-  Función "moveTo()"
        Sirve para mover el puntero imaginario donde comenzaremos a hacer el "camino". Esta función no dibuja nada en si, 
        pero nos permite "definir el primer punto de un camino". Llamar esta función es como si levantásemos el lápiz 
        del lienzo y lo trasladásemos, sin pintar, a otra posición.

        Recibe como parámetro los puntos: "x" e "y" donde ha de moverse el puntero para dibujo. 

        2.4.3.-  Función "lineTo(xf, yf)"
        Provoca que se dibuje una "línea recta", desde la posición actual del puntero de dibujo, hasta el punto (xf,yf) 
        que se indique como parámetro. El método "lineTo(xf, yf), por tanto es como si posáramos el lápiz sobre el lienzo 
        en la posición actual y arrastrásemos, dibujando una línea recta, hasta el punto donde se definió al invocar el 
        método.

        La posición actual del camino la podemos haber indicado previamente con un moveTo(), o donde hayamos terminado 
        una línea dibujada anteriormente. Si no se indicó antes una posición de nuestro puntero de dibujo, lineTo() 
        no dibuja ninguna línea, sino que se tendrá en cuenta las coordenadas enviadas como parámetro para posicionar 
        tan solo el puntero de dibujo allí. Dicho de otra manera, si no se dijo dónde empezar el dibujo, o no se ha 
        dibujado ningún otro segmento en el camino anteriormente, lineTo() será equivalente a moveTo().

        2.4.4.-  Función "fill()"
        Este método del "contexto del canvas" sirve para rellenar de color el área circunscrita por un camino. Para 
        rellenar de color un camino, el camino tendría que estar cerrado, por lo que, si no lo está, automáticamente 
        se cerrará con una línea recta hasta el primer punto del camino, es decir, donde comenzamos a dibujar. 
        Sin embargo, si durante los distintos segmentos del camino nos dejamos algún segmento abierto, no se pintará nada.

        Como decimos, si no llegamos a cerrar el camino, el método "ctx.fill()"" lo cerrará por nosotros, pero podríamos 
        utilizar explícitamente el método: "closePath()" para hacerlo nosotros.

        2.4.5.-  Función "closePath()"
        Sirve para cerrar un "camino" (unir el punto final del camino con el origen del camino), volviendo a su punto 
        inicial de dibujo. Recordemos que el camino tiene un "punto inicial" (definido por moveTo(x0, y0)) en el que nos 
        situamos para comenzar el dibujo, con moveTo(). Luego vamos dibujando segmentos en el camino por medio de líneas 
        que nos llevan a otros puntos del lienzo. Pues "ctx.closePath()"" sería como dibujar una línea recta desde el 
        punto donde se haya quedado el camino al punto inicial donde empezamos a construirlo.

        El método closePath() no recibe ningún parámetro.

        2.4.6.-  Función "stroke()"
        Con el método de contexto "ctx.stroke()" podemos "dibujar una línea" por todo el recorrido del camino que hayamos 
        creado por medio de sus distintos segmentos. Es similar al método "fill()"", explicado en el artículo anterior, 
        con la diferencia que "fill()"" rellenaba de color y "stroke()" tan solo dibuja la silueta. Además, en el caso de 
        "fill()" se necesitaba tener el camino cerrado, por lo que se cerraba automáticamente si no lo habíamos hecho y 
        "stroke()" realmente puede estar discontinuada, puesto que sólo es una línea lo que se dibuja y no un área.


    3.-  Dibuja un circulo:  para dibujar un círculo en el contexto de canvas, hay que usar los siguientes métodos:

          beginPath() - comienza un camino "path"
          arc(x,y,r,startangle,endangle) - crea un "arco/curva". Para crear un círculo con arc(): establezca el ángulo 
                                           inicial en 0 y el ángulo final en "2*Math.PI". Los parámetros "x" e "y" definen 
                                           las coordenadas "x" e "y" del centro del círculo- arco. El parámetro "r" define el 
                                           radio del círculo - arco.

          Ejemplo: defina un círculo con el método "arc(x,y,r,startangle,endangle)"". Luego usa el método stroke() para 
                   dibujar el círculo:

                   const canvas = document.getElementById("myCanvas");
                   const ctx = canvas.getContext("2d");

                   ctx.beginPath();
                   ctx.arc(95, 50, 40, 0, 2 * Math.PI);
                   ctx.stroke();


    4.-  HTML Canvas Gradients.

    Los "gradientes" se pueden usar para rellenar rectángulos, círculos, líneas, texto, etc. Las formas en el lienzo no 
    se limitan a colores sólidos.

    Hay dos tipos diferentes de "gradientes":

    1.-  Gradiente lineal:  createLinearGradient( x,y,x1,y1 ) - crea un degradado lineal.
    2.-  Gradiente radial:  createRadialGradient( x,y,r,x1,y1,r1 ) - crea un degradado radial/circular.

    Una vez que tenemos un objeto degradado, debemos agregar dos o más "paradas" de color.

    El método "addColorStop()" especifica las "paradas de color" y su posición a lo largo del degradado. 
    Las posiciones de gradiente pueden estar en cualquier lugar entre 0 y 1.

    Para usar el "degradado" de color, establezca la propiedad: "fillStyle" o "strokeStyle" en el "degradado" y, 
    a continuación, dibuje la forma (rectángulo, texto o una línea).

    Ejemplo:  Usando "createLinearGradient()": Crea un rectangulo con "degradado lineal" de color. 
                                               Rellena el rectángulo con el "degradado" de color

      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");

      // Create gradient linear
      const grd = ctx.createLinearGradient(0, 0, 200, 0);
      grd.addColorStop(0, "red");
      grd.addColorStop(1, "white");

      // Fill with gradient
      ctx.fillStyle = grd;
      ctx.fillRect(10, 10, 150, 80);


    Ejemplo: usando el "gradiente radial", createRadialGradient(), crea un degradado radial/circular. Rellena el rectángulo 
             con el.

      const canvas = document.getElementById("myCanvas");
      const ctx = c.getContext("2d");

      // Create gradient radial
      var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
      grd.addColorStop(0, "red");
      grd.addColorStop(1, "white");

      // Fill with gradient
      ctx.fillStyle = grd;
      ctx.fillRect(10, 10, 150, 80);


  5.-  HTML Canvas Text.

  Para dibujar texto en un elemento HTML "canvas", las propiedades y los métodos más importantes son:

    1.-  font - define las propiedades de la fuente para el texto.
    2.-  fillText( text,x,y) - dibuja texto "relleno" en el canvas, en la posicion (x,y), con "relleno"
    3.-  strokeText( text,x,y ) - dibuja texto en el canvas, en la posicion (x,y), con "relleno"

  1.-  Usando "texto de relleno": fillText( text,x,y)

       Ejemplo:  establezca la fuente en: " 30px "Arial" ", y escriba un texto completo en el canvas:

                 const canvas = document.getElementById("myCanvas");
                 const ctx = canvas.getContext("2d");

                 ctx.font = "30px Arial";  //  Establecer la fuente del texto
                 ctx.fillText("Hello World", 10, 50);


  2.-  Usando "texto de trazo":  strokeText( text,x,y)

      Ejemplo:  Establezca la fuente en 30px "Arial" y escriba un texto, sin relleno, en el canvas:

                 const canvas = document.getElementById("myCanvas");
                 const ctx = canvas.getContext("2d");

                 ctx.font = "30px Arial";
                 ctx.strokeText("Hello World", 10, 50);

  3.-  Agregar color y texto central.

      Ejemplo:  Establezca la fuente en: <<30px "Comic Sans MS">> y escriba un texto rojo relleno en el centro del canvas.

      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");

      ctx.font = "30px Comic Sans MS";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("Hello World", canvas.width/2, canvas.height/2);


  6.-  HTML Canvas Images: método "drawImage(objeto_imagen, x, y)" del objeto "contexto" del "canvas".

  Para dibujar una "imagen" en un "canvas", use el siguiente método:  drawImage(object_image,x,y).
  Enviamos tres parámetros, el primero es el "objeto Javascript de la imagen" que se desea incluir en el lienzo. 
  Los dos siguientes son las "coordenadas" donde situar la imagen, siendo (x,y) el punto donde se colocará la 
  esquina superior izquierda de la imagen.

  Ejemplo:

    window.onload = function() {
      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");

      const img = document.getElementById("scream");
      ctx.drawImage(img, 10, 10);
    };

  6.1.-  El "Objeto Javascript imagen".
  El objeto imagen es uno de los objetos básicos de Javascript, que afortunadamente funciona igual en todos los navegadores. 

  Este "objeto de imagen" lo podemos obtener de varias maneras, pero de momento vamos a aprender a generarlo dinámicamente 
  con una instrucción Javascript.

      const img = new Image();

  Con esto tenemos una variable(una constante) llamada "img" que referencia a un objeto imagen. Ese objeto imagen en 
  estos momentos está sin ningún atributo. Podríamos decir que está "sin inicializar". La tarea de inicialización 
  fundamental sería asignarle una "ruta" (patch) a un archivo gráfico.

      img.src = 'logo-grande.jpg';

  Esto hace que en el "objeto Image" se cargue la imagen que está en el archivo 'logo-grande.jpg' y como no hemos 
  especificado ningún directorio en la ruta, se supone que ese archivo está en la misma carpeta que el archivo HTML 
  donde esté ese código Javascript.

  Una vez tenemos el "objeto imagen" (referenciado y especificado el atributo "src"), podríamos pintarlo en un canvas por 
  medio de la función "drawImage(img, xf, yf).

      ctx.drawImage(img, 10, 10);

  Pero atención, porque este código tiene un detalle: la imagen no se dibujará en el canvas a no ser que esté previamente 
  cargada en el navegador.

  En la secuencia de instrucciones, tal como lo tenemos ahora:

      const img = new Image();
      img.src = 'logo-grande.jpg';

      ctx.drawImage(img, 10, 10);


  El navegador al especificar el archivo de la imagen, actualizando el atributo "src", tiene que descargarlo y eso lleva 
  un tiempo. Por tanto, si inmediatamente a indicar el archivo, intentamos dibujar la imagen, dará un problema. 
  Dicho de otra manera, sólo podemos dibujar la imagen cuando estamos seguros que el navegador ya la ha descargado. 
  Para asegurarnos de este punto, podemos usar el evento "onload de la imagen", para llamar a "drawImage()"" sólo cuando 
  la imagen ha terminado de cargarse.

      const img = new Image();
      img.src = 'canvas-html5.png';
      img.onload = function(){
        ctx.drawImage(img, 10, 10);
      }


  6.2.-  Maneras de acceder a "objetos Image" para mostrar en el "canvas".

          1.- Traerse una imagen que hay en la página: por medio del método "getElementById()", enviando como parámetro 
                                                      el identificador de la etiqueta IMG de la imagen deseada.

              //Creo un objeto Image con una imagen de la pagina 
              const img = document.getElementById("im1");
              //luego la dibujo en el canvas
              ctx.drawImage(img, 10, 10);

          2.- A través del "Array de images": También de una imagen que haya en la página, en una etiqueta IMG. Al array 
                                              accedemos con el "índice de la imagen" según orden de aparición en el código 
                                              HTML.

              //consigo una imagen desde el array de imágenes
              ctx.drawImage(document.images[1], 122, 20);

          3.- Creando un "objeto Image":  no vamos a repetir las explicaciones.

              //cracion de un objeto Image
              const img = new Image();

              img.src = "http://www.desarrolloweb.com/images/iconos/user_go.png";
              img.onload = function(){
                ctx.drawImage(imagen, 330, 195);
              }

          4.- Especificar la imagen en "formato data:url": que es una cadena de caracteres en "formato Base64" que 
                                                           permite especificar elementos como imágenes a partir de código, 
                                                           pero como si esos elementos los adquiriésemos remotamente.

              //a través de un "data: url"
              const img = new Image();

              img.src = 'data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==';
              ctx.drawImage(img, 300, 200);

          5.- Acceder a el diseño dibujado en otro canvas: para mostrar en un canvas el contenido de otro, como si fuera 
          una imagen.

              //consigo una imagen desde un canvas
              const imgCanvas = document.getElementById("canvas2");
              ctx.drawImage(imgCanvas, 100, 120);

              Nota.-  Este quinto y último método permite algunas aplicaciones interesantes, como mostrar un un canvas una 
                      miniatura de lo que hay en otro canvas.

  6.3.-  Escalado y recorte en imágenes en "canvas".

  El método es bien simple y consiste en invocar al método que dibuja las imágenes, "drawImage()", enviando distintos 
  juegos de parámetros. Anteriormente ya habíamos trabajado con este método, que como debemos saber, pertenece al objeto 
  contexto de un canvas. En el pasado lo llamamos simplemente enviándole la imagen y las coordenadas donde había que 
  colocarla. Ahora vamos a ver los otros dos modos de invocarlo, por medio de "parámetros adicionales". 
  
  El primero de los modos de invocación permite "escalar una imagen" y el segundo "recortarla y escalarla".

  1.-  Escalar una imagen. Redimensionamiento de una imagen en "canvas".

      drawImage(imagen, posX, posY, anchura, altura);

      Este método dibujará la imagen en la posición definida por las coordenadas (posX, posY) y con la anchura y altura 
      dadas en "anchura" y "altura"

      El navegador escalará la imagen para que tenga las dimensiones que indiquemos y luego la pintará en el "canvas".

      Las nuevas dimensiones de la imagen a dibujar pueden ser las que deseemos. Pueden incluso no ser proporcionales a 
      las dimesiones actuales, en ese caso el navegador estirará la imagen o la achatará para adaptarla a la anchura y 
      altura que hayamos indicado.

      Ejemplo:  
                const myCanvas = document.getElementById('canvas')
                const ctx = getContext('myCanvas');

                if(ctx){
                        //  Creo una imagen conun "objeto Image" de Javascript
                        const img = new Image();
                        //  indico la URL de la imagen
                        img.src = 'logo-desarrolloweb.gif';
                        //defino el evento onload del "objeto imagen"
                        img.onload = function(){
                           //incluyo la imagen en el canvas escala muy pequeña
                            ctx.drawImage(img, 0, 0, 50 , 24);
                           //un poco mayor
                            ctx.drawImage(img, 70, 10, 80 , 38);
                           //tamaño natural
                            ctx.drawImage(img, 160, 20);
                        }
                }

      Este ejemplo dibuja la misma imagen tres veces, dos de ellas está escalada a distintas dimensiones y la última está 
      a tamaño natural (sin redimensionar).


  2.-  Recortar y escalar una imagen:  drawImage(img, imgX, imgY, imgAncho, imgAlto, lienzoX, lienzoY, LienzoAncho, LienzoAlto)

  El último modo de invocar al método "drawImage()" es un poco más complejo, ya que le tenemos que indicar todos los datos 
  para poder "recortar y escalar" la imagen antes de dibujarla en el canvas. La llamada tendrá estos parámetros:

    drawImage(img, imgX, imgY, imgAncho, imgAlto, lienzoX, lienzoY, LienzoAncho, LienzoAlto)

  Entre los parámetros, "img" sigue siendo el "objeto imagen" Javascript que queremos pintar.

  Ejemplo: Recorte y escalado de una imagen. Este ejemplo se dibuja una imagen un par de veces. Primero recorta un área de 
           la imagen original y la escala. Luego dibuja la imagen original, sin recortar ni escalar, y la coloca al lado.

           const myCanvas = document.getElementById('canvas')
           const ctx = myCanvas.getContext('2d');

           if(ctx){
              //Creo una imagen "objeto Image" de Javascript
              const img = new Image();
              //indico la URL de la imagen
              img.src = 'sagrada-familia.jpg';
              //defino el evento onload del objeto imagen
              img.onload = function(){
                ctx.drawImage(img, 177, 11, 120 , 234, 10, 10, 90, 176);
                //tamaño natural
                ctx.drawImage(img, 160, 20);
              }
           }


  6.4.-  "Patterns" en canvas. Mosaico de imágenes en "canvas": ctx.createPattern(img, repeat)

  Los "patrones de repetición" (patterns) son muy utilizados en el diseño web. HTML los tiene y CSS por supuesto que también.
  El componente Canvas del HTML 5 también tiene su propia implementación de los "patterns", con los que podemos hacer 
  fácilmente un "mosaico" en el que se repita constantemente una imagen.

  1.-  Definicion de un "pattern" de imagen:  ctx.createPattern(img, repeat)

  Para definir un patrón utilizamos el método "ctx.createPattern()" que pertenece al "contexto del canvas". 
  Este método recibe un par de parámetros. El primero es la imagen (objeto imagen) que deseamos utilizar como patrón y 
  el segundo es el "tipo de repetición" que queremos implementar.

  La imagen que deseamos utilizar la podemos sacar de un "objeto Image" de Javascript y el "tipo de repetición" es similar 
  al que se utiliza cuando se define un fondo de imagen en CSS: "repeat" (para un mosaico que se repite tanto en la 
  horizontal como en la vertical, "repeat-x" (para repeticiones en la horizontal), "repeat-y" (para repetir la imagen en 
  la vertical) y "no-repeat", que no producirá ninguna repetición).

  Ese patrón (pattern) simplemente estará declarado como "objeto en Javascript" y listo para usar en un canvas, pero para 
  ello debemos configurar el "estilo de relleno" y luego rellenar de color un área.

  const myPattern = ctx.createPattern(objeto_imagen, 'repeat');

  Con la línea anterior tendríamos creada una variable "myPattern" que contiene un "patrón de imagen" listo para ser 
  utilizado.

  2.-  Configurar un "pattern" como estilo de relleno de color.

  La propiedad "fillStyle" del contexto del canvas, permite, aparte de especificar el color de relleno, indicar un patrón 
  para utilizar para rellenar un área. Con esto conseguiremos "pintar un área con un patrón o mosaico de imagen", en lugar 
  de un color plano.

      const myPattern = ctx.createPattern(img, repeat)
      ctx.fillStyle = myPattern;

      ctx.fillRect(0,0, myCanvas.width - 1, myCanvas.height - 1)

    Con esto conseguimos que, la próxima vez que se rellene de color un área, se haga con un mosaico de imagen o pattern, 
    en lugar de un color plano.

  3.-  Rellenar de color un área
  Ahora podemos rellenar de color cualquier área, que se rellenará con el patrón definido anteriormente. Es tan sencillo 
  como utilizar un método que nos permita aplicar color, como fillRect(), visto también anteriormente.

  ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);

  Con esta línea rellenaríamos de color todo el área disponible en el elemento canvas, es decir, un rectángulo que va desde 
  la coordenada (0,0) hasta toda la anchura y la altura del canvas. Como previamente se aplicó el patrón a la propiedad 
  "fillStyle", en vez de rellenar con un color se rellenará con un mosaico de imagen.


7.-  HTML Canvas Reference.

Colores, estilos y sombras
Property	                              Description
fillStyle	                              Sets or returns the color, gradient, or pattern used to fill the drawing
strokeStyle	                            Sets or returns the color, gradient, or pattern used for strokes
shadowColor	                            Sets or returns the color to use for shadows
shadowBlur	                            Sets or returns the blur level for shadows
shadowOffsetX	                          Sets or returns the horizontal distance of the shadow from the shape
shadowOffsetY	                          Sets or returns the vertical distance of the shadow from the shape

Method	                                Description
createLinearGradient()	                Creates a linear gradient (to use on canvas content)
createPattern()	                        Repeats a specified element in the specified direction
createRadialGradient()	                Creates a radial/circular gradient (to use on canvas content)
addColorStop()	                        Specifies the colors and stop positions in a gradient object


Estilos de línea
Property	                              Description
lineCap	                                Sets or returns the style of the end caps for a line
lineJoin	                              Sets or returns the type of corner created, when two lines meet
lineWidth	                              Sets or returns the current line width
miterLimit	                            Sets or returns the maximum miter length


Rectángulos
Method	                                Description
rect()	                                Creates a rectangle
fillRect()	                            Draws a "filled" rectangle
strokeRect()	                          Draws a rectangle (no fill)
clearRect()	                            Clears the specified pixels within a given rectangle


Caminos (path)
Method	                                Description
fill()	                                Fills the current drawing (path)
stroke()	                              Actually draws the path you have defined
beginPath()	                            Begins a path, or resets the current path
moveTo()	                              Moves the path to the specified point in the canvas, without creating a line
closePath()	                            Creates a path from the current point back to the starting point
lineTo()	                              Adds a new point and creates a line to that point from the last specified point in the canvas
clip()	                                Clips a region of any shape and size from the original canvas
quadraticCurveTo()	                    Creates a quadratic Bézier curve
bezierCurveTo()	                        Creates a cubic Bézier curve
arc()	                                  Creates an arc/curve (used to create circles, or parts of circles)
arcTo()	                                Creates an arc/curve between two tangents
isPointInPath()	                        Returns true if the specified point is in the current path, otherwise false


Transformaciones
Method	                                Description
scale()	                                Scales the current drawing bigger or smaller
rotate()	                              Rotates the current drawing
translate()	                            Remaps the (0,0) position on the canvas
transform()	                            Replaces the current transformation matrix for the drawing
setTransform()	                        Resets the current transform to the identity matrix. Then runs transform()


Texto
Property	                              Description
font	                                  Sets or returns the current font properties for text content
textAlign	                              Sets or returns the current alignment for text content
textBaseline	                          Sets or returns the current text baseline used when drawing text

Method	                                Description
fillText()	                            Draws "filled" text on the canvas
strokeText()	                          Draws text on the canvas (no fill)
measureText()	                          Returns an object that contains the width of the specified text


dibujo de imagen
Method	                                Description
drawImage()	                            Draws an image, canvas, or video onto the canvas


Manipulación de píxeles
Property	                              Description
width	                                  Returns the width of an ImageData object
height	                                Returns the height of an ImageData object
data	                                  Returns an object that contains image data of a specified ImageData object

Method	                                Description
createImageData()	                      Creates a new, blank ImageData object
getImageData()	                        Returns an ImageData object that copies the pixel data for the specified rectangle on a canvas
putImageData()	                        Puts the image data (from a specified ImageData object) back onto the canvas


composición
Property	                              Description
globalAlpha	                            Sets or returns the current alpha or transparency value of the drawing
globalCompositeOperation	              Sets or returns how a new image are drawn onto an existing image


Otro
Method	                                Description
save()	                                Saves the state of the current context
restore()	                              Returns previously saved path state and attributes
createEvent()	 
getContext()	 
toDataURL()	 
*/

/*  Nota sobre las lineas en canvas

    Dibujo de una linea:  hay que utilizar los siguientes métodos del contexto de canvas:

          ctx.moveTo(x0,y0) - define el punto de inicio de la línea
          ctx.lineTo(xf,yf) - define el punto final de la línea
          //  ctx.strokeStyle = "red"
          //  ctx.lineWidth = "4"
          stroke() - define "la tinta" en que se dibujara la linea (la dibuja)


1.-  Configuraciones de dibujo de líneas en Canvas.

    Las líneas en canvas por defecto siempre tienen el grosor de "un píxel", pero esto es algo que se puede configurar 
    dinámicamente antes de hacer el dibujo.

    1.-  Propiedad  ctx.lineWidth = "..." del contexto de canvas.

    Esta propiedad admite un valor numérico que puede ser entero o incluso un número real, con decimales. 
    El grosor de la línea será el "número de píxeles" que se coloque (el valor numerico) en la propiedad "lineWidth".

    La "grosura de una línea" se coloca "con respecto al centro del camino". Es decir, imaginemos un camino circular. 
    Si contorneamos ese camino con una línea de 10 píxeles, la línea que se colocaría no estaría ni toda por dentro ni toda 
    por fuera del camino, sino por el centro. En la práctica quedarían 5 píxeles (la mitad del grosor) por fuera del camino 
    y 5 por dentro.

    En el caso que una línea no ocupe todo el espacio de un píxel completo se crea una especie de "difuminado del color" 
    de la línea que estemos dibujando. Por ejemplo, pensemos en una línea de 1 píxel de grosor. Como se dibuja en el centro 
    del camino, en este caso queda medio pixel por fuera del camino y medio por dentro, por lo que en realidad se verá una 
    línea de dos píxeles de grosor, pero difuminada por los dos lados.


    2.-  Extremos de las líneas en canvas. ctx.lineCap = "butt, round o square" => Configuracion de los bordes de las lineas en canvas.

    Tipos de extremos y la propiedad: ctx.lineCap = "butt, round o square"

    La "propiedad lineCap del contexto de canvas", nos sirve para asignar los "tipos de extremos" que queremos en las líneas. 
    Admite tres valores distintos:

        butt  (es el predeterminado) => la línea "comienza" y "termina" justamente en el lugar donde comienza el camino 
                                        definido antes de dibujar la línea

        round   =>   hace que los extremos de la línea estén redondeados
        square  =>   hace que los extremos de la línea estén cuadrados pero sobrepasa los extremos del camino


    3.-  Propiedad "lineJoin" del contexto de canvas, uniones entre líneas.  Uniones entre segmentos de líneas en canvas con 
         "lineJoin"

    Cuando una línea consta de varios "segmentos", las junturas o uniones entre los distintos segmentos se pueden configurar 
    de diferentes maneras con la propiedad "lineJoin".


    La "propiedad lineJoin" pertenece al contexto del canvas y sirve para "definir la forma con la que se unirán las líneas 
    que hacen de segmentos de un camino". Es decir, cuando tenemos un camino que está formado por diferentes líneas, 
    éstas se podrán unir con tres tipos de configuraciones distintas.

      miter  =>  (predeterminado) las uniones de las lineas forman esquinas perfectas, en el ángulo que lleve el camino.
      round  =>  las uniones entre segmentos del camino se realicen con esquinas redondeadas
      bevel  =>  las uniones no sean angulosas, pero tampoco redondeadas (con biselado)


*/