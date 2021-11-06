import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

import { NgxIndexedDBService } from 'ngx-indexed-db';
import { zip } from 'rxjs';
import { ShepherdService } from 'angular-shepherd';
import { Meta } from '@angular/platform-browser';
import { style, state, animate, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(800, style({ opacity: 1 }))
      ]),
    ]),
    trigger('fadeOut', [
      transition(':leave', [
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  tasks: any = {
    "todo": [],
    "doing": [],
    "done": [],
  };


  colorslist: any[] = [
    'blue',
    'gray',
    'green',
    'indigo',
    'purple',
    'pink',
    'red',
    'yellow',


  ];

  project_setting: any = {
    projectname: '',
    projectcolor: 'blue'
  }

  fileExtension: string = '.skb'




  openHelp() {


    this.shepherdService.modal = false;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.defaultStepOptions = {
      classes: 'shepherd-theme-custom',
    };
    this.shepherdService.addSteps(
      [
        {
          id: 'intro',
          popperOptions: {
            modifiers: [{ name: 'offset', options: { offset: [0, 20] } }]
          },
          attachTo: {
            element: '#mr-cat',
            on: 'top-start'
          },
          buttons: [
            {
              classes: 'shepherd-button-secondary',
              text: 'Exit',
              type: 'cancel',
            },
            {
              classes: 'shepherd-button-primary',
              text: 'Help me Mr.Cat',
              type: 'next',
              action: this.shepherdService.next,
            },
          ],
          cancelIcon: {
            enabled: true,
          },
          canClickTarget: false,
          scrollTo: false,
          title: 'Welcome to SimpleKanban',
          text: ["Hi! My name is Mr.Cat. I am cute and fluffy<br>Try to pet me and I will tell you an inspirational quote.<br><br>I will show you how this tool works"]

        },


        {
          id: 'intro',
          popperOptions: {
            modifiers: [{ name: 'offset', options: { offset: [0, 20] } }]
          },
          attachTo: {
            element: '#todo-add-btn',
            on: 'right-end'
          },
          buttons: [
            {
              classes: 'shepherd-button-secondary',
              text: 'Exit',
              type: 'cancel',
            },
            {
              classes: 'shepherd-button-primary',
              text: 'Next',
              type: 'next',
              action: this.shepherdService.next,
            },
          ],
          cancelIcon: {
            enabled: true,
          },
          canClickTarget: false,
          scrollTo: false,
          title: 'Add a new task',
          text: ['To get started, add a new task by clicking on this button.'],
          when: {
            show: () => {
              this.isShowingTodoForm = true;
            }
          }
        },
        {
          id: 'intro',
          popperOptions: {
            modifiers: [{
              name: 'offset', options: {
                offset: [0, 32]
              }
            }]
          },
          attachTo: {
            element: '#newtask-component',
            on: 'right'
          },
          buttons: [
            {
              classes: 'shepherd-button-secondary',
              text: 'Exit',
              type: 'cancel',
            },
            {
              classes: 'shepherd-button-primary',
              text: 'Next',
              type: 'next',
              action: this.shepherdService.next,
            },
          ],
          cancelIcon: {
            enabled: true,
          },
          scrollTo: false,
          title: 'Write your task here',
          modalOverlayOpeningPadding: 10,
          canClickTarget: false,
          text: ['The second step is to add a task. You can add as many tasks as you want.<br><br>You can drag your tasks into any order. Just click and hold, then drag your task into place. (Doing, Done...)'],
          when: {
            show: () => {
              this.isShowingTodoForm = true;
            }
          }
        },
        {
          id: 'intro',
          popperOptions: {
            modifiers: [{ name: 'offset', options: { offset: [0, 32] } }]
          },
          attachTo: {
            element: '#projectname',
            on: 'bottom-end'
          },
          buttons: [
            {
              classes: 'shepherd-button-secondary',
              text: 'Exit',
              type: 'cancel',
            },
            {
              classes: 'shepherd-button-primary',
              text: 'Next',
              type: 'next',
              action: this.shepherdService.next,
            },
          ],
          cancelIcon: {
            enabled: true,
          },
          scrollTo: false,
          title: 'Choose a project name',
          modalOverlayOpeningPadding: 10,
          canClickTarget: false,
          text: ['To change the project name, click the name field and type in your project name. Also, you can change the background color by clicking the color circle.'],
          when: {
            show: () => {
              this.isShowingTodoForm = false;
            }
          }
        },

        {
          id: 'intro',
          popperOptions: {
            modifiers: [{ name: 'offset', options: { offset: [0, 32] } }]
          },
          attachTo: {
            element: '#import-btn',
            on: 'bottom'
          },
          buttons: [
            {
              classes: 'shepherd-button-secondary',
              text: 'Exit',
              type: 'cancel',
            },
            {
              classes: 'shepherd-button-primary',
              text: 'Next',
              type: 'next',
              action: this.shepherdService.next,
            },
          ],
          cancelIcon: {
            enabled: true,
          },
          scrollTo: false,
          title: 'Export - Import - Help',
          modalOverlayOpeningPadding: 10,
          canClickTarget: false,
          text: ['You can export your project and share it with your friends by clicking the <strong>"Export Project"</strong> button.<br><br>You can also import your project or any other project by clicking the <strong>"Import Project"</strong> button and selecting the exported file (*.skb).<br><br>If you need my help, press the <strong>"Help"</strong> button.'],
          when: {

          }
        },

        {
          id: 'intro',
          popperOptions: {
            modifiers: [{ name: 'offset', options: { offset: [0, 32] } }]
          },
          buttons: [
            {
              classes: 'shepherd-button-secondary',
              text: 'Exit',
              type: 'cancel',
            },
          ],
          cancelIcon: {
            enabled: true,
          },
          scrollTo: false,
          title: 'That\'s it!',
          modalOverlayOpeningPadding: 10,
          canClickTarget: false,
          text: ['Thank you for using our tool. If you could share it with your friends, that would be a huge help ❤️<br><br>Contact: contact.simplekanban@gmail.com<br>GitHub: <a href="https://github.com/Ademking" target="_blank">https://github.com/Ademking</a><br>Facebook: <a href="https://www.facebook.com/AdemKouki.Officiel/" target="_blank">https://www.facebook.com/AdemKouki.Officiel</a>'],
          when: {

          }
        },



      ]);
    this.shepherdService.start();


  }


  showLoading = true;

  ngOnInit() {

    // show loading

    this.dbService.getAll('project').subscribe((project: any) => {

      setTimeout(() => {
        this.showLoading = false;
      }, 1000)

      if (project.length == 0) {

        this.initProject();
      }
      else {
        this.project_setting.projectname = project[0].projectname;
        this.project_setting.projectcolor = project[0].projectcolor;
      }
    });
    this.dbService.getAll('todo').subscribe((todo_tasks) => {

      this.tasks.todo = todo_tasks
    });
    this.dbService.getAll('doing').subscribe((doing_tasks) => {
      this.tasks.doing = doing_tasks
    });
    this.dbService.getAll('done').subscribe((done_tasks) => {
      this.tasks.done = done_tasks
    });

  }

  // initialize project title and color
  initProject() {
    this.dbService.add('project', {
      projectname: 'Untitled project',
      projectcolor: this.project_setting.projectcolor,
    }).subscribe((key) => {
      this.project_setting.projectname = 'Untitled project';
      this.project_setting.projectcolor = this.project_setting.projectcolor;
    });
  }



  constructor(private dbService: NgxIndexedDBService,
    private toastService: HotToastService,
    private shepherdService: ShepherdService,
    private meta: Meta
  ) { }




  // add new task to DB
  addTaskToDB(table: string, type: string, task: string, updated_at: string, bgcolor: string) {
    this.dbService.add(table, {
      type,
      task,
      updated_at,
      bgcolor,
    }).subscribe((key) => {

    });
  }

  // task drop handler
  onTaskDrop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  isShowingTodoForm = false;
  isShowingDoingForm = false;
  isShowingDoneForm = false;

  addTodoTask() {
    this.isShowingTodoForm = true;
  }

  addDoingTask() {
    this.isShowingDoingForm = true;
  }

  addDoneTask() {
    this.isShowingDoneForm = true;
  }

  onSave() {

    setTimeout(() => {
      this.ngOnInit();
    }, 50);
  }

  dragEnd(event: any) {
    this.refreshDB();
  }

  cardClicked(task: any) {
  }

  refreshDB() {

    let tmp_tasks = JSON.parse(JSON.stringify(this.tasks));

    setTimeout(() => {
      this.clearAllTables();


      this.dbService.bulkAdd(
        'todo',
        this.tasks.todo.map((task: any) => { delete task.id; return task }),
      ).subscribe((keys) => {
        for (let index = 0; index < keys.length; index++) {
          this.tasks.todo[index].id = keys[index];
        }
      });

      this.dbService.bulkAdd(
        'doing',
        this.tasks.doing.map((task: any) => { delete task.id; return task }),
      ).subscribe((keys) => {
        for (let index = 0; index < keys.length; index++) {
          this.tasks.doing[index].id = keys[index];
        }
      });

      this.dbService.bulkAdd(
        'done',
        this.tasks.done.map((task: any) => { delete task.id; return task }),
      ).subscribe((keys) => {
        for (let index = 0; index < keys.length; index++) {
          this.tasks.done[index].id = keys[index];
        }
      });



    }, 500);



  }


  clearAllTables() {
    this.dbService.clear('todo').subscribe((key) => {

    });
    this.dbService.clear('doing').subscribe((key) => {

    });
    this.dbService.clear('done').subscribe((key) => {

    });
  }


  handleColorChange($event: any) {
    let hexColor = $event.color.hex;

    switch (hexColor) {
      case '#ff0000':
        this.project_setting.projectcolor = 'red';
        this.meta.updateTag({ name: 'theme-color', content: '#fa8b8b' }, 'name=theme-color');
        break;
      case '#ffff00':
        this.project_setting.projectcolor = 'yellow';
        this.meta.updateTag({ name: 'theme-color', content: '#fcc938' }, 'name=theme-color');
        break;
      case '#008000':
        this.project_setting.projectcolor = 'green';
        this.meta.updateTag({ name: 'theme-color', content: '#51dda8' }, 'name=theme-color');
        break;
      case '#0000ff':
        this.project_setting.projectcolor = 'blue';
        this.meta.updateTag({ name: 'theme-color', content: '#79b5fb' }, 'name=theme-color');
        break;
      case '#4b0082':
        this.project_setting.projectcolor = 'indigo';
        this.meta.updateTag({ name: 'theme-color', content: '#93a0fa' }, 'name=theme-color');
        break;
      case '#800080':
        this.project_setting.projectcolor = 'purple';
        this.meta.updateTag({ name: 'theme-color', content: '#b6a0fc' }, 'name=theme-color');
        break;
      case '#ffc0cb':
        this.project_setting.projectcolor = 'pink';
        this.meta.updateTag({ name: 'theme-color', content: '#f68dc5' }, 'name=theme-color');
        break;
      case '#808080':
        this.project_setting.projectcolor = 'gray';
        this.meta.updateTag({ name: 'theme-color', content: '#b7bdc6' }, 'name=theme-color');
        break;
      default:
        this.project_setting.projectcolor = 'red';
        this.meta.updateTag({ name: 'theme-color', content: '#fa8b8b' }, 'name=theme-color');
        break;
    }

    this.dbService.update('project', {
      id: 1,
      projectcolor: this.project_setting.projectcolor,
      projectname: this.project_setting.projectname,

    }).subscribe((key) => {
    });
  }



  onNameChange(event: any) {

    let projectTitle = event.target.innerHTML;

    this.dbService.update('project', {
      id: 1,
      projectname: (projectTitle.length > 0) ? projectTitle : 'Untitled project',
      projectcolor: this.project_setting.projectcolor,
    }).subscribe((key) => {

    });
  }


  importedData: any;


  // read file from input
  uploadFile(event: any) {
    let file = event.target.files[0];

    // load data from file
    let fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      let fileContent: any = fileReader.result;

      // check if json is correct
      try {


        // check file extension
        if ('.' + file.name.split('.').pop() !== this.fileExtension) {
          throw new Error(`File must be ${this.fileExtension}`);
        }

        this.importedData = JSON.parse(fileContent);
        // put data into global variables

        let toastLoading = this.toastService.loading(
          'Importing data',
          { autoClose: false }
        );

        let clear_project = this.dbService.clear('project');
        let clear_todo = this.dbService.clear('todo');
        let clear_doing = this.dbService.clear('doing');
        let clear_done = this.dbService.clear('done');

        zip(clear_project, clear_todo, clear_doing, clear_done).subscribe((clear) => {

          let import_project = this.dbService.bulkAdd('project', this.importedData.project);
          let import_todo = this.dbService.bulkAdd('todo', this.importedData.todo);
          let import_doing = this.dbService.bulkAdd('doing', this.importedData.doing);
          let import_done = this.dbService.bulkAdd('done', this.importedData.done);

          zip(import_project, import_todo, import_doing, import_done).subscribe((imported) => {
            toastLoading.close();
            this.toastService.success("File loaded successfully");
            this.ngOnInit();
          })

        });
      } catch (e) {
        console.log(e);
        this.toastService.error("Error in JSON format");
      }

    }
    fileReader.readAsText(file);

  }

  generateDownloadJsonUri() {

    let project_name = 'Untitled project'

    this.dbService.getAll('project').subscribe((project: any) => {

      if (project.length == 0) {

        project_name = 'Untitled project';
      }
      else {
        project_name = project[0].projectname;


        let project_data = this.dbService.getAll('project')
        let todo_data = this.dbService.getAll('todo')
        let doing_data = this.dbService.getAll('doing')
        let done_data = this.dbService.getAll('done')

        // zip all observable arrays into a single array
        zip(project_data, todo_data, doing_data, done_data)
          .subscribe(pair => {
            let project = {
              project: pair[0],
              todo: pair[1],
              doing: pair[2],
              done: pair[3],
            };

            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(project));
            var downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", project_name + this.fileExtension);
            document.body.appendChild(downloadAnchorNode); // required for firefox
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
          });



      }
    });






  }

  @ViewChild('audioOption') audioPlayerRef!: ElementRef;

  // get random string from array
  getRandomString(array: any) {
    return array[Math.floor(Math.random() * array.length)];
  }

  playMeow() {


    // array of motivational quotes
    let quotes: any[] = [
      "Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus.",
      "The best way to predict the future is to create it.",
      "Either you run the day or the day runs you.",
      "You've got to get up every morning with determination if you're going to go to bed with satisfaction.",
      "Just one small positive thought in the morning can change your whole day.",
      "Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.",
      "Happiness is not something ready made. It comes from your own actions.",
      "Do what you feel in your heart to be right – for you’ll be criticized anyway.",
      "Everything you can imagine is real.",
      "Protecting your mind, body and spirit from negativity is a sign of self-love.",
      "Do what you can, where you are, with what you have.",
      "I didn’t fail the test. I just found 100 ways to do it wrong.",
      "Dreaming, after all, is a form of planning."
    ];



    let catAudios: any[] = [
      "assets/audio/meow_1.mp3",
      "assets/audio/meow_3.mp3",
      "assets/audio/meow_4.wav",
      "assets/audio/meow_5.mp3",
      "assets/audio/meow_6.mp3",
    ]

    this.audioPlayerRef.nativeElement.src = this.getRandomString(catAudios);

    this.audioPlayerRef.nativeElement.play();



    this.toastService.success(
      `<strong>Meow!</strong> Get ready to be inspurred...<br><q>${this.getRandomString(quotes)}</q>`
      , {
        icon: '🐈',
        dismissible: true,
        duration: 5000,
        style: {
          "max-width": '80vw',
        },
      });


  }



}
