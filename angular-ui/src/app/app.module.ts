import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImageLinkComponent } from './image-link/image-link.component';
import { ImageCanvasEditingComponent } from './image-canvas-editing/image-canvas-editing.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImagesListComponent,
    ImageLinkComponent,
    ImageCanvasEditingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
