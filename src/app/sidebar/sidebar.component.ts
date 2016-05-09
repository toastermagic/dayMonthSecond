import {ChangeDetectorRef, Input, Component, OnInit, OnChanges} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MdList, MdListItem} from '@angular2-material/list';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  moduleId: 'app/sidebar/',
  selector: 'dms-sidebar',
  template: require<string>('./sidebar.component.html'),
  styles: [require<string>('./sidebar.component.scss')],
  directives: [MdButton, MdList, MdListItem, MD_SIDENAV_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class SidebarComponent implements OnInit, OnChanges {
  constructor(private cd: ChangeDetectorRef) {}

  @Input()
  toggleSidebar: boolean;

  ngOnInit() {
  }

  ngOnChanges() {
    this.cd.detectChanges();
  }
}
