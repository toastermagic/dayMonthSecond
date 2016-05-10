import {Output, EventEmitter, ApplicationRef, ChangeDetectorRef,
   Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService, FirebaseAuthService} from '../shared';
import {Subscription} from 'rxjs/Subscription';
import {MdButton, MdAnchor} from '@angular2-material/button';
import {MdIcon} from '@angular2-material/icon';
import {MdToolbar} from '@angular2-material/toolbar';
import {LoggedInComponent} from './shared/logged-in';
import {Response} from '@angular/http';
import {FirebaseAuthState} from 'angularfire2';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  moduleId: 'app/toolbar/',
  selector: 'dms-toolbar',
  template: require<string>('./toolbar.component.html'),
  styles: [require<string>('./toolbar.component.scss')],
  directives: [ROUTER_DIRECTIVES, MdToolbar, MdButton, MdAnchor, MdIcon, LoggedInComponent]
})

export class ToolbarComponent implements OnInit,
    OnDestroy {
  userSubscription: Subscription;

  @Output() openSidebar = new EventEmitter<boolean>();
  
  constructor(private auth: AuthService, private appRef: ApplicationRef,
              private cd: ChangeDetectorRef, private fbAuth: FirebaseAuthService) {
    this.userSubscription = auth.userChange$.subscribe(user => {
      console.log('toolbar: user is now', user);
      cd.detectChanges();
    });
  }

  extLogin(provider: string) {
    this.fbAuth.signInWithGoogle();

    this.fbAuth.auth$.subscribe(
      (res: FirebaseAuthState) => { },
      (err) => { console.log(err); }
    )
  }

  onSidebarClick() {
    this.openSidebar.emit(true);
  }

  appTick() {
    console.log('tick!');
    this.appRef.tick();
  }

  ngOnInit() {}

  ngOnDestroy() { this.userSubscription.unsubscribe(); }
}
