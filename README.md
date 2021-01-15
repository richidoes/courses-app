# Courses-app

Aplicación móvil que simula una aplicacion de aprendizaje, ¡disfruta
de animaciones al registrarte, mirar la configuracion, mirar las
notificaciones y más!

Podremos encontrar secciones como :

Inicio/Home donde podremos registrarnos/cerrar
sesión tocando el avatar y ver nuestras notificaciones tocando la
campana, asi como abrir las tarjetas.

Cursos/Courses con tarjetas con el progreso actual de tus cursos.
Proyectos/projects con tarjetas adaptables y una animacion arrastar y soltar.

------------------- INSTRUCCIONES DE USO -------------------------------

Si desea ejecutar el proyecto tenga en cuenta lo siguiente:

-Asegurese de tener instalado: Node.js, expo y expo cli, un emulador de movil tales como xcode(ios) o android studio(android).
-use el terminal y acceda al directorio donde coloco el proyecto, una vez dentro ejecute el comando: $ npm install

-Asegurese de tener un proyecto de firebase creado, ya que necesitara agregar los datos de su propia base de datos.
-Ahora entre al la siguiente ruta: _courses-app/components/_ y dentro cree un fichero con el nombre _Firebase.js_
-Dentro de _Firebase.js_ coloque la informacion de configuracion de su proyecto de Firebase.
-Tambien es necesario hacer las importaciones y exportaciones mostradas en el ejemplo:

---

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
apiKey: "suApiKey",
authDomain: "SuDominio",
databaseURL: "dbURL",
projectId: "SuIdDeProyecto",
storageBucket: "",
messagingSenderId: "",
appId: "",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { firebase, auth, db };

---

-Una vez que alla concluido con los pasos anteriores , solo queda iniciar su emulador movil,
usar la terminal y entrar en el directorio de su proyecto
-Ahora ejecute el comando: $ expo start
-Esto abrira un servidor/localhost en su navegador.
-seleccione la pestaña que diga: iniciar app en emulador ios/android segun sea su emulador.
-Listo ya podra hacer uso de la app.
