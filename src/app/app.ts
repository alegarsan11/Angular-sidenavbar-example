import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatSidenavModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  public opened = false;
  public currentPageIndex = 0;
  public touchStartX = 0;
  public touchStartY = 0;

  public menuPages = [
    {
      title: 'Menú Principal',
      options: [
        { label: '🏠 Inicio', action: 'home' },
        { label: '👤 Perfil', action: 'profile' },
        { label: '⚙️ Ajustes', nextPage: 1 }
      ]
    },
    {
      title: 'Configuración',
      options: [
        { label: '⬅ Volver', nextPage: 0 },
        { label: '🔔 Notificaciones', action: 'notif' },
        { label: '🔒 Privacidad', action: 'privacy' }
      ]
    }
  ];

  public list = [
    { id: 1, title: 'Realizar la tarea asignada!', subTitle: '9:00pm' },
    { id: 2, title: 'Visitar al perro en casa', subTitle: '9:00pm' },
    { id: 3, title: 'Llamar al doctor', subTitle: '9:00pm' }
  ];

  @HostListener('touchstart', ['$event'])
  public onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  public onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    const deltaX = touchEndX - this.touchStartX;
    const deltaY = Math.abs(touchEndY - this.touchStartY);

    if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > 70) {
      if (deltaX > 0 && this.touchStartX < 100) this.opened = true;
      if (deltaX < -70 && this.opened) this.opened = false;
    }
  }

  public handleOptionClick(option: any) {
    if (option.nextPage !== undefined) {
      this.currentPageIndex = option.nextPage;
    } else {
      console.log('Acción:', option.action);
    }
  }

  public goToPage(index: number) {
    this.currentPageIndex = index;
  }
}