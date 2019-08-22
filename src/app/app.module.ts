import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule,ButtonsModule  } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { DataService } from './Data.service';
import { InteractionsService } from './interactions.service';
import { ThumbnailsViewerComponent } from './components/thumbnails-viewer/thumbnails-viewer.component';
import { MainViewerComponent } from './components/main-viewer/main-viewer.component';
import { MainComponent } from './components/main/main.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { HorizontalToolbarComponent } from './components/horizontal-toolbar/horizontal-toolbar.component';
import { VerticalToolbarComponent } from './components/vertical-toolbar/vertical-toolbar.component';
import { ThumbnailsHeaderComponent } from './components/thumbnails-header/thumbnails-header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ThumbnailComponent,
    ThumbnailsViewerComponent,
    MainViewerComponent,
    MainComponent,
    MainHeaderComponent,
    HorizontalToolbarComponent,
    VerticalToolbarComponent,
    ThumbnailsHeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'upload', component: ThumbnailsHeaderComponent }
    ])

  ],
  providers: [
  DataService,
  InteractionsService

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
