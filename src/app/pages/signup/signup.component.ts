import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username:'',
    password:'',
    mail:'',
    name:'',
    lastName:'',
    telephone:'',
    status:'true'
  }

  constructor(private userService: UserService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      //alert('Se requiere nombre de usuario');
      this.snack.open('Se requiere nombre de usuario', 'Aceptar',{
        duration : 3000, 
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.userService.saveUser(this.user).subscribe(
      (data) => {
        console.log(data);
        //alert('Usuario guardado con exito');
        this.snack.open('Usuario guardado con exito', 'Aceptar',{
          duration : 3000, 
          verticalPosition : 'top',
          horizontalPosition : 'right',
          panelClass: ['blue-snackbar']
        });//con el atributo panelClass puedo cambiarle el color al snackbar desde el CSS global
      },(error) => {
        console.log(error);
        //alert('Ha ocurrido un error en el sistema');
        this.snack.open('Ha ocurrido un error en el sistema', 'Aceptar',{
          duration : 3000, 
          verticalPosition : 'top',
          horizontalPosition : 'right'
        });
      }
    )

  }
}
