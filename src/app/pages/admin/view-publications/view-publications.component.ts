import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PublicationService } from 'src/app/services/publication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-view-publications-edit',
  templateUrl: './view-publications-edit.html',
})
export class ViewPublicationsEditComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewPublicationsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-view-publications',
  templateUrl: './view-publications.component.html',
  styleUrls: ['./view-publications.component.scss'],  
})
export class ViewPublicationsComponent implements OnInit {
  animal: string='';
  name: string='';
  publications: any = [];

  cantComments: Array<number> = [];

  constructor(
    private loginService:LoginService, 
    private router: Router,
    private publicationService: PublicationService,
    private snack:MatSnackBar, 
    private dialog: MatDialog,
  ) { }


  ngOnInit(): void {

    this.publicationService.getPublications().subscribe(
      (dato:any) => {
        this.publications = dato;
        console.log(this.publications);
      },
      (error) => {
        console.log(error);
        this.snack.open('Error al cargar publicaciones', 'Aceptar',{
          duration : 3000, 
          verticalPosition : 'top',
          horizontalPosition : 'right',
          panelClass: ['warn-snackbar']
        });
      }
    );

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ViewPublicationsEditComponent, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  public updatePublication () {

  }

  public deletePublication (pubId: number) {
    let varSnack = this.snack.open('Desea eliminar la publicación?', 'Confirmar',{
      duration : 5000, 
      verticalPosition : 'top',
      horizontalPosition : 'center',
      panelClass: ['warn-snackbar']
    });

    varSnack.onAction().subscribe(() => {
      this.publicationService.deletePublication(pubId).subscribe(
        (dato:any) => {
          console.log("Publicación con id: "+pubId+" borrada.");
          this.snack.open('Publicación eliminada.','',{
            duration : 3000, 
            verticalPosition : 'top',
            horizontalPosition : 'center',
            panelClass: ['accent-snackbar']
          });

          this.publications = this.publications.filter((publication: any) => publication.id != pubId);

        },
        (error) => {
          console.log(error);
          this.snack.open('Error al borrar publicaciones.', 'Aceptar',{
            duration : 3000, 
            verticalPosition : 'top',
            horizontalPosition : 'right',
            panelClass: ['warn-snackbar']
          });
        }
      );
        
      }
    );
  }

  public calcularDias (datetime: string) {
    
    let currentDate: Date = new Date();
    let date = new Date(datetime.slice(0,10));

    let time = currentDate.getTime() - date.getTime(); //en milis
    let days = time / (1000*3600*24);

    if(days<1) {
      return "hace " + Math.floor(days*24) + "h";
    } else {
      return "hace " + Math.floor(days) + "d";
    }
  }

  public contarComments (cant: number) {
    this.cantComments.push(cant);
  }


  public mostrarOcultarComment(campo: string) {
    
    var x = document.getElementById(campo);
    
    if (x != null) {

      const xList = x.classList;

      if (xList.contains('show')) {
        xList.remove('show');
      } else {

        xList.add('show');
      }



      /*if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }*/
    }
        
  }

}
