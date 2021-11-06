import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KanbanCardComponent } from './components/kanban-card/kanban-card.component';
import { KanbanNewtaskComponent } from './components/kanban-newtask/kanban-newtask.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { AutoSizeInputModule } from 'ngx-autosize-input';
import { ColorGithubModule } from 'ngx-color/github';
import { FormsModule } from '@angular/forms';
import { HotToastModule } from '@ngneat/hot-toast';
import { popperVariation, TippyModule, tooltipVariation } from '@ngneat/helipopper';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


const dbConfig: DBConfig = {
  name: 'tasksDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'project',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'projectname', keypath: 'projectname', options: { unique: false } },
        { name: 'projectcolor', keypath: 'projectcolor', options: { unique: false } },
      ]
    },
    {
      store: 'todo',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'task', keypath: 'task', options: { unique: false } },
        { name: 'updated_at', keypath: 'updated_at', options: { unique: false } },
        { name: 'bgcolor', keypath: 'bgcolor', options: { unique: false } },
      ]
    },
    {
      store: 'doing',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'task', keypath: 'task', options: { unique: false } },
        { name: 'updated_at', keypath: 'updated_at', options: { unique: false } },
        { name: 'bgcolor', keypath: 'bgcolor', options: { unique: false } },
      ]
    },
    {
      store: 'done',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'task', keypath: 'task', options: { unique: false } },
        { name: 'updated_at', keypath: 'updated_at', options: { unique: false } },
        { name: 'bgcolor', keypath: 'bgcolor', options: { unique: false } },
      ]
    },
  ]
};

@NgModule({
  declarations: [
    KanbanCardComponent,
    KanbanNewtaskComponent,
    AppComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DragDropModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    AutoSizeInputModule,
    ColorGithubModule,
    HotToastModule.forRoot(),
    TippyModule.forRoot({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipVariation,
        popper: popperVariation,
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
