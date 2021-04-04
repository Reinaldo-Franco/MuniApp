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


  constructor(private firestoreService: FirestoreService) {
    //Crear una tarea vacía al empezar
    this.tareaEditando = {} as Tarea;
   }


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

  ngOnInit() {
  }

}
