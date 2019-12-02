import { Component, OnInit, Input } from '@angular/core';
import { NbThemeService, NbMenuService, NbSidebarService } from '@nebular/theme';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() nombre;
  @Input() esAdmin;

  userMenu = [ { title: 'Perfil', icon:'person' }, { title: 'Cerrar sesión', icon:'log-out' } ];

  themes = [
    {
      value: 'default',
      name: 'Claro',
    },
    {
      value: 'dark',
      name: 'Oscuro',
    }
  ];

  constructor(
    private themeService: NbThemeService,
    public afAuth: AngularFireAuth,
    private menuService: NbMenuService,
    private router: Router,
    private sidebarService: NbSidebarService,
    ) { }

  ngOnInit() {
    this.menuService.onItemClick().subscribe(( event ) => {
      this.onItemSelection(event.item.title);
    })
  }

  onItemSelection( title ) {
    if ( title === 'Perfil' ) {
      this.router.navigate(["/dashboard-usuario/perfil"]);
    } else if ( title === 'Cerrar sesión' ) {
      this.afAuth.auth.signOut();
      this.router.navigate(["../../landing"]);
    }
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    
    return false;
  }

}
