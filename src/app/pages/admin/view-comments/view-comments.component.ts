import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.scss']
})
export class ViewCommentsComponent implements OnInit {


  @Input() publicationId: any=[];   //[0] --> publicationId
                                    //[1] --> userId 

  @Output() enviar = new EventEmitter<number>();

  comments: any = [];
  isCommentOwner = false;

  constructor(
    private commentService: CommentService,
    private snack:MatSnackBar, 
  ) { }

  ngOnInit(): void {
    

    this.commentService.getCommentsFromPublication(this.publicationId[0]).subscribe(
      (dato:any) => {
        this.comments = dato;
        console.log(this.comments);
        this.cantComments(this.comments);
      },
      (error) => {
        console.log(error);
        this.snack.open('Error al cargar comentarios', 'Aceptar',{
          duration : 3000, 
          verticalPosition : 'top',
          horizontalPosition : 'right',
          panelClass: ['warn-snackbar']
        });
      }
    );

  }

  public calcularDias (datetime:string) {
    
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

  cantComments(comments:any) {
    var cant = 0;
    
    this.comments.forEach((element: any) => {
      cant++;
    });

    this.enviar.emit(cant);
  }

}
