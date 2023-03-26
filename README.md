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

El programa cuenta con una base de datos en formato JSON en la que se guardara de manera local toda la información que vayamos creando en el programa. En el siguiente apartado del informe se detallaran las distintas clases, interfaces y ficheros que podemos encontrar en el directorio de trabajo y en los dos últimos apartados se detallaran las distintas dificultades encontradas asi como una conclusión en la que se dara in cierre a todo el trabajo asi como se explicara como se ha organizado todo el trabajo.

# Contenido

El contenido de la práctica se distribuye en distintos ficheros que siguen la siguiente estructura:

```

```

A continuación dejamos una explicación del porque y de la conexión de cada clase/interfaz/fichero que se encuentra en el directorio de trabajo:

- Route (**carpeta**)
  - Route (**clase**): clase para represetar una ruta
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
  - Route History Group Data (**interfaz**): interfaz que representa la información que se leerá de un histórico de rutas degrupo desde la base de datos.
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

# Dificultades encontradas

Las distintas dificultades encontradas a lo largo de la práctica han sido las siguientes:

- Problemas en los momentos de realizar los test en un principio, al ser casi todo por consola no sabiamos bien que testear ni como realizar los test de una clase de una manera sencilla sin hacer uso de los datos de las bases de datos.

# Conclusión

Todo el trabajo se ha realizado de manera colaborativa, realizando varias sesiones todos los integrantes del grupo pero con una gran carga de trabajo autonomo para poder avanzar por nuestra cuenta dentro de lo posible el trabajo que nos habiamos asignado.

El trabajo se ha organizado haciendo uso de las ramas de Git para no tocar el codigo de los demas compañeros ademas se realizo por motivos de seguridad una configuracion de la rama master para que no se pudiera **_pushear_** codigo por error corriendo el riesgo de generar problemas y que más adelante no se encontrara el error.

En esta práctica en grupo se han tocado aspectos con funciones asincronas, trabajo colaborativo haciendo uso de Git y GitHub, así como aprendido a como usar una base de datos en nuestros programas y a como realizar una pequeña aplicación de consola.

Para concluir, en el equipo coincidimos que esta práctica ha sido entretenida de realizar pero ha contado con un gran apartado no solo de gran esfuerzo para poder llevarla a cabo si no tambien de organización y con momentos de tener que poner toda la atención de los tres integrantes en un único fichero en busca de un error que no se veia a simple vista.

[![tests](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupog/actions/workflows/testing.yml/badge.svg?branch=master)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupog/actions/workflows/testing.yml)
