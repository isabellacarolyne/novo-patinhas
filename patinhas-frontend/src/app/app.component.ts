import { Component, ComponentFactoryResolver, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  RouterOutlet,
} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from './servicos/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
  ],
  providers: [UsuarioService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'patinhas-frontend';
  pagina = '';
  exibir_titulo = false;

  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((ev: any) => {
        this.exibir_titulo = ev['url'] != '/login' && ev['url'] != '/cadastro';
      });
  }

  sair() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  editarUsuario() {
    // const id_usuario = sessionStorage.getItem('id_usuario');
    const id_usuario = '123';
    if (id_usuario) {
      const dialogRef = this.dialog.open(EditarUsuarioComponent);
      this.usuarioService.getUsuario(parseInt(id_usuario)).then(
        (data) => {
          const dialogRef = this.dialog.open(EditarUsuarioComponent, {
            data: data,
          });

          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.sair();
            }
          });
        },
        (error) => {
          this._snackBar.open(
            'Erro ao recuperar informações para editar o usuário',
            'Splash',
            {
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          );
        }
      );
    }
  }
}
