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
  public itemsPerPage = 5; // <--- Tú decides cuántos items por página

  // Lista única de muchísimos items
  public allMenuItems = [
    { label: '🏠 Inicio', action: 'home' },
    { label: '👤 Perfil', action: 'profile' },
    { label: '⚙️ Ajustes', action: 'settings' },
    { label: '🔔 Notificaciones', action: 'notif' },
    { label: '🔒 Privacidad', action: 'privacy' },
    { label: '📅 Calendario', action: 'cal' },
    { label: '📩 Mensajes', action: 'msg' },
    { label: '📊 Estadísticas', action: 'stats' },
    { label: '🛠 Soporte', action: 'help' },
    { label: '🚪 Salir', action: 'logout' },
    { label: '🚪 Salir', action: 'logout' },
    { label: '🚪 Salir', action: 'logout' },
    { label: '🚪 Salir', action: 'logout' }
  ];

  public list = [
    { title: 'Tarea 1', subTitle: 'Mañana' },
    { title: 'Tarea 2', subTitle: 'Tarde' }
  ];

  // --- CÁLCULO DINÁMICO ---

  // Obtiene los items que corresponden a la página actual
  public get visibleItems() {
    const start = this.currentPageIndex * this.itemsPerPage;
    return this.allMenuItems.slice(start, start + this.itemsPerPage);
  }

  // Genera un array con el número de páginas (para los dots)
  public get totalPages() {
    return new Array(Math.ceil(this.allMenuItems.length / this.itemsPerPage));
  }

  public setPage(index: number) {
    this.currentPageIndex = index;
  }

  // --- GESTOS ---
  public touchStartX = 0;
  @HostListener('touchstart', ['$event'])
  public onTouchStart(event: TouchEvent) { this.touchStartX = event.touches[0].clientX; }

  @HostListener('touchend', ['$event'])
  public onTouchEnd(event: TouchEvent) {
    const deltaX = event.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(deltaX) > 80) {
      if (deltaX > 0 && this.touchStartX < 100) this.opened = true;
      if (deltaX < 0 && this.opened) this.opened = false;
    }
  }
}