import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Tarea } from '../tarea';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {

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
    this.tareaEditando = {} as Tarea;
    this.obtenerListaTareas();
  }

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

  ngOnInit() {
  }

}
