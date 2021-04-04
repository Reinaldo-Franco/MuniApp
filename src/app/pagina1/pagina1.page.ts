import { Component, OnInit } from '@angular/core';
import { Tarea } from '../tarea';

import {FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.page.html',
  styleUrls: ['./pagina1.page.scss'],
})
export class Pagina1Page implements OnInit {


  tareaEditando: Tarea;
  idTareaSelec: string;

  /*consultar base de datos para poder listar*/
  arrayColeccionTareas: any =[{
    id: "",
    data: {} as Tarea
  }];

  /*consulta a base de datos para almacenar en una variable
  con una estructura que permita diferenciar el ID y los datos (DATA) obtenidos*/
  document: any = {
    id: "",
    data: {} as Tarea
  };


  constructor(private firestoreService: FirestoreService) {
    //Crear una tarea vacía al empezar
    this.tareaEditando = {} as Tarea;
    this.obtenerListaTareas();
  }

/*metodo para insertar datos*/
  clickBotonInsertar(){
    this.firestoreService.insertar("tarea", this.tareaEditando)
    .then(() => {
      console.log("Tarea creada correctamente");
      //limpiar el contenido de la tarea que se estaba editando
      this.tareaEditando = {} as Tarea;
    }, (error) => {
      console.error(error);
    });
  }

/*metodo para listar*/
  obtenerListaTareas(){
    this.firestoreService.consultar("tarea").subscribe((resultadoConsultaTareas) => {
      this.arrayColeccionTareas = [];
      resultadoConsultaTareas.forEach((datosTarea: any) => {
        this.arrayColeccionTareas.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
    });
  }

  /*seleccionar tarea para borrar*/
  selecTarea(tareaSelec) {
    console.log("Tarea seleccionada: ");
    console.log(tareaSelec);
    this.idTareaSelec = tareaSelec.id;
    this.tareaEditando.titulo = tareaSelec.data.titulo;
    this.tareaEditando.descripcion = tareaSelec.data.descripcion;
  }

  /*metodo para borrar registro*/
  clicBotonBorrar() {
    this.firestoreService.borrar("tarea", this.idTareaSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaTareas();
      // Limpiar datos de pantalla
      this.tareaEditando = {} as Tarea;
    })
  }


/*metodo para modificar un registro*/
  clicBotonModificar() {
    this.firestoreService.actualizar("tarea", this.idTareaSelec, this.tareaEditando).then(() => {
      // Actualizar la lista completa
      this.obtenerListaTareas();
      // Limpiar datos de pantalla
      this.tareaEditando = {} as Tarea;
    })
  }

  //consulta por ID
  /*this.firestoreService.consultarPorId("tareas", idConsultar).subscribe((resultado) => {
    // Preguntar si se hay encontrado un document con ese ID
    if(resultado.payload.data() != null) {
      this.document.id = resultado.payload.id
      this.document.data = resultado.payload.data();
      // Como ejemplo, mostrar el título de la tarea en consola
      console.log(this.document.data.titulo);
    } else {
      // No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
      this.document.data = {} as Tarea;
    } 
  });*/


  ngOnInit() {
  }

}
