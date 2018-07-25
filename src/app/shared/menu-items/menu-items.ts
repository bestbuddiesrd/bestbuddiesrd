import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'starter', name: 'Starter Page', type: 'link', icon: 'av_timer' },
  { state: 'calendar', type: 'link', name: 'Calendario de Eventos', icon: 'date_range' },
  { state: 'events-table', type: 'link', name: 'Lista de Eventos', icon: 'date_range' }


];

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

}
