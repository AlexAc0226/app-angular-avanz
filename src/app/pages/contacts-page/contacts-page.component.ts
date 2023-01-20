import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IContacto } from 'src/app/models/contact.interface';
import { IRandomContact, Results } from 'src/app/models/randomuser';
import { ContactService } from 'src/app/services/contact.service';
import { RandomUserService } from 'src/app/services/random-user.service';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit {

  cargando: boolean = true;
  filtroSexo: string = 'todos';
  listaRandomContacts: IRandomContact[] = [];

  constructor(private router: Router, private route: ActivatedRoute,
    private randomUserService: RandomUserService

    ) { }

  ngOnInit(): void {

    // Obtenemos los Query Params
    this.route.queryParams.subscribe((params: any) => {
      console.log('QueryParam:',params.sexo)
      if(params.sexo){
        this.filtroSexo = params.sexo

        if(params.sexo === 'female' || params.sexo === 'male'){
          // Implementación para obtener la lista de contactos aleatoria
          this.randomUserService.obtenerRandomContacts(10, params.sexo).subscribe(
            {
              next: (response: Results) => {

                response.results.forEach((randomContact: IRandomContact, index: number ) => {
                  this.listaRandomContacts.push(randomContact);
                })
                console.log(this.listaRandomContacts);
              },
              error: (error) => console.error(`${error}`),
              complete: () => {
                console.info('Petición de random contacts terminada ');
                this.cargando = false;
              }
            }
          );
        }else{
          // Implementación para obtener la lista de contactos aleatoria
          this.randomUserService.obtenerRandomContacts(10).subscribe(
            {
              next: (response: Results) => {

                response.results.forEach((randomContact: IRandomContact, index: number ) => {
                  this.listaRandomContacts.push(randomContact);
                })
                console.log(this.listaRandomContacts);
              },
              error: (error) => console.error(`${error}`),
              complete: () => {
                console.info('Petición de random contacts terminada ')
                this.cargando = false;
              }
            }
          );
        }

      }

    });

  }

  // Ejemplo de paso de información entre componentes a través del ESTADO
  volverAHome(contacto: IRandomContact){

    let navigationExtras: NavigationExtras = {
      state: {
        data: contacto
      }
    }
    this.router.navigate(['/dashboard'], navigationExtras);
  }




}
