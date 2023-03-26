# Práctica 7 - Destravate

- Grupo G
  - Alejandro García Bautista
  - Lucas Pérez Rosario
  - Miguel Dorta Rodríguez
- Domingo 26 de marzo de 2023
- Desarrollo de Sistemas Informáticos
- Grado en Ingeniería Informática
- Universidad de La Laguna

# Introducción

En esta primera práctica en grupo se nos ha pedido que realicemos el ejercicio que se ha llamado Destravate.

Destravate es un aplicación por consola en la que podremos crearnos un usuario para poder registrar nuestras distintas rutas realizadas ya sea una:

- Caminata
- Ruta en bicicleta

El programa cuenta con una base de datos en formato JSON en la que se guardara de manera local toda la información que vayamos creando en el programa. En el siguiente apartado del informe se detallaran las distintas clases, interfaces y ficheros que podemos encontrar en el directorio de trabajo y en los dos últimos apartados se detallaran las distintas dificultades encontradas asi como una conclusión en la que se dará in cierre a todo el trabajo asi como se explicara como se ha organizado todo el trabajo.

# Contenido

A continuación dejamos una explicación del porque y de la conexión de cada clase/interfaz/fichero que se encuentra en el directorio de trabajo:

- Route (**carpeta**)
  - Route (**clase**): clase para representar una ruta
  - Coordinates (**clase**): clase que se usará para representar uno de los atributos de una ruta.
- User (**carpeta**)
  - User (**clase**): clase que nos permite representar a un usuario de nuestro programa
  - UserData (**interfaz**): esta interfaz representa la información que se leerá de un usuario desde la base de datos
  - Route History (**clase**): clase que servirá para representar las rutas y sus datos más relevantes.
  - Route History Data (**interfaz**): interfaz que representa la información que se leerá de un histórico de rutas desde la base de datos.
- Group (**carpeta**)
  - Group (**clase**): clase que nos permite representar a un grupo de usuarios en nuestro programa
  - Group Data (**interfaz**): esta interfaz representa la información que se leerá de un grupo desde la base de datos
  - Route History Group (**clase**): clase que servirá para representar las rutas y sus datos más relevantes y además muestra los participantes de la ruta. Extiende Route History
  - Route History Group Data (**interfaz**): interfaz que representa la información que se leerá de un histórico de rutas del grupo desde la base de datos.
- Challenge (**carpeta**)
  - Challenge (**clase**): clase para representar retos dentro del programa
  - Challenge Data(**interfaz**): esta interfaz representa la información que se leerá de un reto desde la base de datos
- Interfaz de línea de comandos, CLI (carpeta): esta carpeta tendrá aquellos ficheros que se usarán para los _Prompters_ y además tendrá una carpeta _managers_ con los ficheros para la gestión de la información del sistema.
  - Managers (**carpeta**)
  - Admin Managers (**clase**)
  - Group Managers (**clase**)
  - Main Managers (**clase**)
  - Print Managers (**clase**)
  - Session Managers (**clase**)
  - Friends Managers (**clase**)
- DataBase (**carpeta**): tendrá una clase, un tipo personalizado, un enumerado y una interfaz, todo esto servirá para implementar la base de datos del sistema de manera correcta.
- Utils (**carpeta**): tendrá ficheros que nos darán cierta facilidad para poder realizar el programa, varias clases usarán estas herramientas.
- Activity Type (**fichero**): contiene un enumerado y una función para mostrar el tipo de actividad que se realizará, correr o bicicleta.

- Const (**fichero**): este fichero tendrá una constante que simplemente será el nombre del sistema _Destravate_

# Desarrollo

## _Rutas_

La clase **Route** representa una ruta dentro de la información del sistema. Una ruta tiene ciertos datos asociados, estos son:

- ID único de la ruta.
- Nombre de la ruta.
- Geolocalización del inicio (coordenadas).
- Geolocalización del final de la ruta (coordenadas).
- Longitud de la ruta en kilómetros.
- Desnivel medio de la ruta.
- Usuarios que han realizado la ruta (IDs).
- Tipo de actividad: Indicador si la ruta se puede realizar en bicicleta o corriendo.
- Calificación media de la ruta.

Para cumplir con esto, los atributos de la clase route serán los siguientes:

```ts
  public id: string
  public name: string
  public start: Coordinates
  public end: Coordinates
  public distanceKm: number
  public averageSlope: number
  public userIds: string[]
  public activity: ActivityType
  public averageScore: number
```

Donde lo más important a tener en cuenta serán las coordenadas (**coordinates**) y el tipo de actividad (**ActivityType**) y lo explicaremos a continuación.

En el constructor se harán ciertas comprobaciones para asegurar que los datos que se dan a los atributos son correctos según unos parámetros.

Esta clase solo tendrá un método,
**printTable**. Este método servirá para imprimir la información relativa a las rutas, mostrando por pantalla todos los de una lista que se pasa en los parámetros de la función.

## _Coordenadas_

**Coordinate** es la clase que usa en las rutas para representar la _geolocalización del inicio_ y la _geolocalización del final de la ruta_.

Esta clase tiene como atributos _latitude_ (latitud), _longitude_ (longitud) y _mosl_ (metros sobre el nivel del mar) para identificar correctamente las coordenadas necesarias en cada caso.

La clase tendrá dos métodos que serán los siguientes:

- **parse()**: La función crea un nuevo objeto Coordenadas a partir de las coordenadas contenidas en la cadena proporcionada que tendrá un formato diferente al de latitud, longitud y mosl.

- **toString()**: Devuelve una representación de cadena del objeto Coordenadas dado.

## _Activity Type_

Activity será un enumerado con el que podremos representar de una mejor manera los tipos de actividades que serán Correr o Bicicleta.

```ts
export enum ActivityType {
  RUNNING, //Representará la actividad Correr
  BICYCLE, //Representará la actividad Bicicleta
}
```

Este enumerado se usará en la mayoría de las clases principales del programa.

## _Usuarios_

La clase **User** representa un usuario dentro del sistema de información que estamos desarrollando

Un usuario tiene ciertos datos asociados, estos son:

- ID único del usuario (puede ser un username creado por el usuario en el registro o un valor generado automáticamente por el sistema).

- Nombre del usuario.
- Actividades que realiza: Correr o bicicleta.
- Amigos en la aplicación: Colección de IDs de usuarios con los que interacciona.
- Grupos de amigos: Diferentes colecciones de IDs de usuarios con los que suele realizar rutas.
- Estadísticas de entrenamiento: Cantidad de km y desnivel total acumulados en la semana, mes y año.
- Rutas favoritas: IDs de las rutas que el usuario ha realizado con mayor frecuencia.
- Retos activos: IDs de los retos que el usuario está realizando actualmente.
- Histórico de rutas: Los usuarios deben almacenar el historial de rutas realizadas desde que se registraron en el sistema. La información almacenada en esta estructura de datos deberá contener la información de la fecha y el ID de la ruta realizada. Nótese que un usuario puede realizar más de una ruta al día y está decisión puede afectar al tipo de estructura en el que se almacena la información.

Para cumplir con esto, los atributos de la clase user serán los siguientes:

```ts
  public id: string;
  public name: string;
  public friends: string[];
  public groupFriends: string[]
  public favoriteRoutes: string[];
  public activeChallenges: string[];
  public routeHistory: RouteHistory[];
  public activity: ActivityType;
  public passwordHash: string;
  public isAdmin: boolean;
```

Esta clase tendrá varios métodos y se explicarán a continuación.

Para los usuarios hará falta dar información sobre las estadísticas, es por eso que tiene los siguientes métodos:

- **weeklyKmStatistics**: devuelve la suma de kms de las rutas realizadas por el usuario en los últimos 7 días.
- **weeklySlopeStatistics**: devuelve la suma de desnivel en las rutas realizadas por el usuario en los últimos 7 días.
- **monthlyKmStatistics**: devuelve la suma de kms de las rutas realizadas por el usuario en los últimos 30 días.
- **monthlySlopeStatistics**: devuelve la suma de desnivel en las rutas realizadas por el usuario en los últimos 30 días
- **yearlyKmStatistics**: devuelve la suma de kms de las rutas realizadas por el usuario en los últimos 365 días.
- **yearlySlopeStatistics**: devuelve la suma de desnivel en las rutas realizadas por el usuario en los últimos 365 días.

Además tendrá el método **printTable**: este método servirá para imprimir la información relativa a los usuarios, mostrando por pantalla todos los usuarios de una lista que se pasa en los parámetros de la función.

Estará también el método **printTableLessInfo()** que no muestra la información sensible sobre el usuario.

## _User Data_

Esta interfaz servirá para especificar qué datos sobre el **user** son los que se leerán de la base de datos.

```ts
  id: string;
  name: string;
  friends: string[];
  groupFriends: string[]
  favoriteRoutes: string[];
  activeChallenges: string[];
  routeHistory: RouteHistoryData[];
  activity: ActivityType;
  passwordHash: string;
  isAdmin: boolean;
```

## _Route History_

Esta clase implementará la interfaz que se explica en el siguiente apartado.
La clase representa un histórico de rutas.
Tendrá un método **parse** que crea un devuelve un objeto **RouteHistory** a partir de un objeto que cumple la interfaz **Route History Data**.

## _Route History Data_

Interfaz hecha para conocer los datos de una ruta que se leerá de la db.

```ts
routeId: string;
date: string;
kms: number;
averageSlope: number;
```

## _Grupos_

La clase **Group** representa un grupo dentro del sistema de información que estamos desarrollando

Un grupo tiene ciertos datos asociados, estos son:

- ID único del grupo.
- Nombre del grupo.

- Participantes: IDs de los miembros del grupo.
- Estadísticas de entrenamiento grupal: Cantidad de km y desnivel total acumulados de manera grupal en la semana, mes y año
- Clasificación de los usuarios: Ranking de los usuarios que más entrenamientos han realizado históricamente dentro del grupo, es decir, ordenar los usuarios por la cantidad de km totales o desnivel total que han acumulado.
- Rutas favoritas del grupo: Rutas que los usuarios del grupo han realizado con mayor frecuencia en sus salidas conjuntas.
- Histórico de rutas realizadas por el grupo: Información similar que almacenan los usuarios pero en este caso referente a los grupos. Nótese que un usuario puede realizar rutas con un grupo y/o de manera individual el mismo día. Es decir, a modo de simplificación, asumimos que todos los usuarios de un grupo realizan la actividad cuando se planifica. Aunque, también pueden realizar otras actividades de manera individual.

Para cumplir con esto, los atributos de la clase group serán los siguientes:

```ts
  public id: string;
  public name: string;
  public participants: string[];
  public favoriteRoutes: string[];
  public routeHistory: RouteHistoryGroup[];
  public createdBy: string;
  public activity: ActivityType;
```

En cuanto a los métodos, serán similares a los de la clase **User** es decir, serán métodos que servirán para calcular la suma de estadísticas de los grupos y además se añaden 3 nuevos métodos que servirán para devolver el top 3 de: usuarios del grupo ordenados por mayor número de kms, usuarios del grupo ordenados por pendiente más acumulada y usuarios del grupo ordenados por el campo proporcionado (descendente).

Por último, también estarán los métodos print para mostrar tanto la tabla de usuario con la información completa como la tabla con la información sensible oculta.

## _Group Data_:

Esta interfaz servirá para especificar qué datos sobre el **group** son los que se leerán de la base de datos

```ts
  id: string;
  name: string;
  participants: string[];
  favoriteRoutes: string[];
  routeHistory: RouteHistoryGroup[];
  createdBy: string;
  activity: ActivityType;
```

## _Route History Group_:

Esta clase implementará la interfaz que se explica en el siguiente apartado.
La clase representa un histórico de rutas pero añadiendo en este caso los participantes del grupo. Tendrá un método **parse** que crea un devuelve un objeto **RouteHistoryGroup** a partir de un objeto que cumple la interfaz **RouteHistoryGroupData**.

## _Route History Group Data_:

Esta interfaz extiende la Route History Data explicada en el usuario anteriormente y lo que añade es un array de strings correspondiente al id de los participantes del grupo.

```ts
export interface RouteHistoryGroupData extends RouteHistoryData {
  participants: string[];
}
```

## _Reto_:

La clase Challenge representa un **Reto** dentro del sistema de almacenamiento de registros de actividades deportivas.

Un reto tiene ciertos datos asociados, estos son:

- ID del reto (único)
- Nombre del reto
- Rutas que forman parte del reto
- Tipo de actividad de reto: bicicleta o correr (usará el enumerado ActivityType)
- Km totales (será la suma de los kilómetros de todas las rutas del reto)
- Usuarios que están realizando el reto

Para cumplir con esto, los atributos de la clase challenge serán los siguientes:

```ts
  public id: string;
  public name: string;
  public routes: Route[];
  public totalKm: number;
  public userIds: string[];
  public activity: ActivityType;

```

Donde lo más importante a destacar es que el atributo **totalKm** no será pasado al constructor, si no que se calculará a partir de las rutas de esta manera.

```ts
this.totalKm = routes.reduce((acc, r) => acc + r.distanceKm, 0);
```

Ahora en cuanto a los métodos, esta clase tiene 3 diferentes.

- **printTable**: este método servirá para imprimir la información relativa a los retos, mostrando por pantalla todos los retos de una lista que se pasa en los parámetros de la función.

- **parse**: este será un método para analizar los datos de la base de datos. Lo que se hará es dado un objeto con la interfaz **ChallengeData** y una base de datos, devolverá un objeto **Challenge** con la información correspondiente al reto de la base de datos. Esta función es necesaria porque en la base de datos, a la hora de introducir las rutas del reto, solo se introducen los ID`s del reto y para analizar el reto necesitamos la información completa de la ruta, entonces con esta función obtenemos dicha información.
- **toJSON**: esta función hará lo inverso al método anterior, en este caso se devolverá un objeto que implementará la interfaz **ChallengeData** cuyo array correspondiente a las rutas será un arrays con los ID’s y este será el objeto a introducir en el JSON.

## _Challenge Data_:

Esta interfaz servirá para especificar qué datos sobre el **challenge** son los que se leerán de la base de datos

```ts
  id: string;
  name: string;
  routes: string[];
  userIds: string[];
  activity: ActivityType;
```

En este caso comprobamos que routes es un array de strings, que corresponderá con con un array con los ID’s de las rutas.

## _Database_

Para comprobar el funcionamiento de nuestro diseño hemos creado una base de datos en la que hacemos el almacenamiento de lo necesario nombrado anteriormente (rutas, retos, usuarios y grupos)

Tenemos una clase **Database** que seguirá la estructura del tipo personalizado DatabaseStructure.

```ts
type DatabaseStructure = {
  challenges: ChallengeData[];
  groups: GroupData[];
  routes: Route[];
  users: UserData[];
};
```

Lo primero a comentar es que tiene una función **load** que lee la base de datos del disco y carga su contenido. Si no existe, se inicializa uno nuevo.

A partir de aquí tenemos varios métodos para eliminar o añadir elementos en la base de datos.
Están los métodos generales como **add**, **set** y **delete**.

El método **add** agrega un nuevo objeto a la base de datos. El ID del objeto se ignora y se asigna uno nuevo.

El método **set** establece el objeto proporcionado con el correspondiente (mismo ID) en la base de datos. Si no hay ningún objeto con el mismo ID.

El método **delete** elimina el objeto con el ID proporcionado de la colección proporcionada. Si no hay ningún objeto con ID coincidente

Otros métodos más generales podemos decir que son los que devuelven las listas de la base de datos, estos son:

- **routes()**: devuelve la lista de rutas en la base de datos.

- **challenges()**: devuelve la lista de retos en la base de datos.
- **challengeData()**: devuelve la lista de retos en la base de datos sin aplicarle el _parse_.
- **users()**: devuelve la lista de usuarios en la base de datos.
- **usersData()**: devuelve la lista de usuarios en la base de datos sin aplicarle el _parse_.
- **groups()**: devuelve la lista de grupos en la base de datos.
- **groupData()**: devuelve la lista de grupos en la base de datos sin aplicarle el _parse_.

A parte de estos, para cada uno de los objetos (rutas, retos, usuarios y grupos), en el fichero habrá métodos para añadir (add), eliminar (delete) y hacer el set de cada objeto en la base de datos.

## _Interfaz de línea de comandos, CLI_

El usuario que utilice esta aplicación deberá, mediante la gestión por línea de comandos interactiva, deberá poder añadir, borrar, modificar y mostrar rutas, usuarios, grupos y retos.

Para esto utilizamos la clase prompter. **Prompter** será una clase abstracta en la que se tendrán los métodos **add**, **delete**, **edit** y **print**, todos estos métodos abstractos que se sobrescribirán en las clases hijas, que será una para cada objeto (rutas, retos, usuarios y grupos).

Cada objeto tiene una clase (**< objeto >Prompter**) que extiende la clase **Prompter** e implementa métodos _add()_, _delete()_, _edit()_, _print()_ y _dataPrompt()_.

**_Aclaración_**: la palabra _objeto_ será sustituida por rutas, usuarios, grupos o retos en cada caso.

Los métodos harán lo siguiente para cada clase:

- **add()** creará un nuevo _objeto_ con la entrada del usuario y se añadirá a la base de datos. Hará uso del método **add< Objeto >()** que se encuentra en la clase **DataBase**

- **delete()** servirá para eliminar _objetos_ de la base de datos. Cuando se ejecute esta función aparecerá una lista con los _objetos_ incluidos en la base de datos y el usuario podrá seleccionar aquellos que quiere eliminar.
- **edit()** modifica un _objeto_ de la base de datos, aquel que el usuario seleccione de una lista que se le mostrará por pantalla. Al _objeto_ que se elija se le podrá modificar todos los atributos y una vez editado se actualizará la base de datos.
- **print()** muestra por pantalla todos los _objetos_ de la base de datos y además dará la opción de ordenar de varias formas.

En este caso es necesario aclarar qué forma de ordenar tendrá cada _objeto_:

**Rutas**:

- Alfabéticamente por nombre de la ruta, ascendente y descendente.
- Cantidad de usuarios que realizan las rutas, ascendente y descendente.
- Por longitud de la ruta, ascendente y descendente.
- Por la calificación media de la ruta, ascendente y descendente.
- Ordenar por actividad: correr o ciclismo.

**Usuarios**:

- Por nombre del usuario, ascendente y descendente.
- Por cantidad de km realizados (ascendente y descendentemente) en función de la semana actual, mes o año.

**Grupos**:

- Por nombre de la grupo, ascendente y descendente.
- Por cantidad de km realizados conjuntamente (ascendente y descendentemente) en función de la semana actual, mes o año.
- Por cantidad de miembros que lo componen, ascendente y descendente.

**Retos**:

- Por nombre del reto, ascendente y descendente.
- Por cantidad de km, ascendente y descendente.
- Por cantidad de usuarios que lo están realizando, ascendente y descendente.

- **dataPrompter()** solicita al usuario los datos de un _objeto_, utilizando los valores predeterminados, si se proporcionan. Servirá para que el usuario introduzca los datos relativos al _objeto_.

Estos métodos, como ya se ha dicho, estarán en cada clase correspondiente a cada objeto.

Por último, hemos creado una serie de clases que servirán para representar un Manager, que permita gestionar el tratamiento de la información del sistema.

### _Main Manager_

**Main Manager** será la clase principal que se englobará todos los métodos para la gestión general de la información del sistema. Las operaciones que se podrán hacer serán las siguientes y de dividirán en las siguientes clases para hacer un mejor diseño:

- Borrar grupos (**group_manager**)
- Cerrar sesión (**main_manager**)
- Crear un grupo (**group_manager**)
- Editar amigos (**friends_manager**)
- Salir del programa (**main_manager**)
- Unirse a un grupo (**group_manager**)
- Ver todas las rutas (**print_manager**)
- Ver todos los grupos (**print_manager**)
- Ver todos los usuarios (**print_manager**)
- Ver Top 3 usuarios Km (**print_manager**)
- Ver Top 3 usuarios Elevación (**print_manager**)

Primero indicar que existe una clase **session_manager** que representa al usuario que iniciará sesión.

Con un método **checkSession()** se podrá elegir la acción entre registrarse o iniciar sesión.
Existe un método para el inicio de sesión, **login()** que le pedirá al usuario su contraseña y con la función **passwordMatches** comprobará que es correcta.

Por otro lado, para registrarse se llama a la función **register()** que lo que hará es crear un usuario pidiéndole lo datos necesarios, lo hará usando los **prompters** explicados anteriormente.

El método **currentUser** devolverá el usuario que iniciado la sesión actual. Por otro lado, **isAdmin** comprobará si el usuario tiene el rol de administrador o no. La función **logout** servirá para cerrar la sesión del usuario actual

A continuación se explicará el contenido de cada clase.

**Groupmanager**

El constructor recibirá una base de datos y una sesión de la clase _SessionManager_.

Tendrá 3 métodos y serán los que se nombrarán a continuación.

- **create()**: El usuario podrá crear un grupo, para esto lo primero que se hará es guardar cuál es el usuario que ha iniciado sesión. A continuación, usando el prompter (explicado anteriormente) se pide al usuario, mediante la interfaz por línea de comando, que introduzca los campos correspondientes al nuevo grupo. Por último, usando los métodos para crear grupos de la clase **DataBase**, se crea el grupo con la información de entrada y se añade a la base de datos indicando cuál ha sido el usuario que ha creado el grupo (el que se había guardado al inicio).

- **delete()**: El usuario podrá eliminar un grupo, para esto lo primero que se hará es guardar cuál es el usuario que ha iniciado sesión porque solo podrá eliminar aquellos grupos que hayan sido creados por él. A continuación, usando el prompter (explicado anteriormente) se pide al usuario, mediante la interfaz por línea de comando, que seleccione los grupos a borrar de entre los que se muestran por pantalla (aquellos creados por él). Por último, usando los métodos para eliminar grupos de la clase **DataBase**, se eliminan los grupos que indique el usuario.

- **join()**: El usuario podrá seleccionar uno de los grupos a los que desee unirse de los que ya estén creados en el sistema.

**Friendsmanager**

El constructor recibirá una base de datos y una sesión de la clase _SessionManager_.

El método que tendrá la clase será **edit**, un método para editar la lista de amigos que hemos dicho anteriormente. Lo que se hará en esta función será lo siguiente: obtener el usuario que ha hecho el inicio de la sesión con el método _currentUser()_ del objeto correspondiente con _session_.
Después de esto, se pedirá al usuario la entrada de datos modificando la lista de amigos.
La lista de los posibles usuarios tendrá como valores por defecto aquellos usuarios que ya son amigos del usuario de la sesión, de esta forma el usuario puede marcar o desmarcar los amigos que quiere tener.

Y finalmente lo que se hará es asignarle al usuario la nueva lista de amigos haciendo uso del método **setUser** de la clase Database.

**Printmanager**

El constructor recibirá unicamente una base de datos.
Los métodos de esta clase son sencillos, será simplemente utilizar el print correspondiente en cada caso para mostrar lo necesario:

- **printGroups**: muestra los grupos
- **printRoutes**: muestra las rutas
- **printUsers**: muestra los usuarios
- **printTop3UsersKm**: muestra el top 3 usuarios según los Km
- **printTop3UsersSlope**: muestra el top 3 usuarios según la Elevación

**Adminmanager**

Esta clase se encargará de gestionar todo aquello que un usuario administrador puede gestionar.
Es decir, los usuario con la característica especial administrador, podrán:
eliminar, añadir, editar o mostrar usuarios, grupos, retos o rutas.

Para esto se hará uso de los métodos de las clases **prompter** que se han nombrado anteriormente

## _Otras herramientas_

Por último, indicar que se han usado otros ficheros que hemos creado para facilitar el desarrollo del programa. Entre estos ficheros tenemos varias funciones para ordenar y comparar (estas funciones se usan dentro de los métodos para mostrar información ordenada de la manera que elija el usuario) y otras funciones relacionadas con las contraseñas para comprobar que sean válidas.

# Dificultades encontradas

Las principal dificultad ha surgido al momento de realizar los test en un principio, al ser casi todo por consola no sabíamos bien que testear ni como realizar los test de una clase de una manera sencilla sin hacer uso de los datos de las bases de datos que podrían ir variando.

Por otro lado, en los test de la base de datos relativos a los challenges, hay un error que no hemos conseguido solucionar del todo finalmente.

# Conclusión

Todo el trabajo se ha realizado de manera colaborativa, realizando varias sesiones todos los integrantes del grupo pero con una gran carga de trabajo autónomo para poder avanzar por nuestra cuenta dentro de lo posible el trabajo que nos habíamos asignado.

El trabajo se ha organizado haciendo uso de las ramas de Git para no tocar el código de los demás compañeros ademas se realizo por motivos de seguridad una configuración de la rama master para que no se pudiera **_pushear_** código por error corriendo el riesgo de generar problemas y que más adelante no se encontrara el error.

En esta práctica en grupo se han tocado aspectos con funciones asíncronas, trabajo colaborativo haciendo uso de Git y GitHub, así como aprendido a como usar una base de datos en nuestros programas y a como realizar una pequeña aplicación de consola.

Para concluir, en el equipo coincidimos que esta práctica, a pesar de la alta carga de trabajo que conlleva, nos ayuda a trabajar de forma colaborativa, algo a lo que nos tendremos que enfrentar cada vez más a menudo y también en el mundo laboral.

[![tests](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupog/actions/workflows/testing.yml/badge.svg?branch=master)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupog/actions/workflows/testing.yml)
