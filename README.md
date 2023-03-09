## Pasos de instalación

- Compilación Backend:
    - Ingresar desde el root del proyecto a la carpeta backend
    - correr el comando: <br>
      ```
      docker build . -t backendtest
      ```

- Compilación Frontend
    - En la raíz del proyecto, ejecutar ```npm install```
    - Correr el comando: <br>
      ```
      docker build . -t frontendtest
      ```

- Ejecutar docker-compose.yaml
    - En la raíz del proyecto, ejecutar el comando: <br> 
      ```
      docker-compose -f docker-compose.yaml up
      ```

- Ingresar por medio de la url "http://localhost:4200/login"
    - Ingresar con los datos: email: "gerentin.mcadminson@gmail.com" y pw: "randompassword"
    - El usuario cuenta con el rol Admin por lo que puede crear modificar y eliminar usuarios