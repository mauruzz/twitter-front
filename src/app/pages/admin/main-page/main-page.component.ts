import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PublicationService } from 'src/app/services/publication.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  public publication = {
    content:'',
    placeMatch:'',
    dateMatch:'',
    timeMatch:'',
    playersLeft:'',
    user: {id:this.loginService.getUser().id,}
  }

  constructor(
    private snack:MatSnackBar, 
    private loginService:LoginService, 
    private router: Router,
    private publicationService: PublicationService,
    //private ngForm: NgForm
    ) { }

  ngOnInit(): void {}

  formSubmit(ngForm:NgForm){

    console.log(this.publication);

    if(this.publication.content.trim() == '' || this.publication.content == null){
      this.snack.open("El título es requerido !!",'',{
        duration:3000
      })
      return ;
    }
  
    this.publicationService.savePublication(this.publication).subscribe(
      (dato:any) => {
        
        this.snack.open('Publicación exitosa', 'Aceptar',{
          duration : 3000, 
          verticalPosition : 'top',
          horizontalPosition : 'center',
          panelClass: ['accent-snackbar']
        });

        this.router.navigate(['admin']);

        ngForm.resetForm();

      },
      (error) => {
        console.log(error);
        this.snack.open('No se pudo guardar la publicación', 'Aceptar',{
          duration : 3000, 
          verticalPosition : 'top',
          horizontalPosition : 'right',
          panelClass: ['warn-snackbar']
        });
      }
    );
  }


}
