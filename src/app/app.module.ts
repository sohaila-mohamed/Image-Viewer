import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule,ButtonsModule  } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { ServiceService } from './service.service';
import { InteractionsService } from './interactions.service';
import { ThumbnailsViewerComponent } from './components/thumbnails-viewer/thumbnails-viewer.component';
import { MainViewerComponent } from './components/main-viewer/main-viewer.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    ThumbnailComponent,
    ThumbnailsViewerComponent,
    MainViewerComponent,
    MainComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot()

  ],
  providers: [
  ServiceService,
  InteractionsService

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
