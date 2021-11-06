import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
    selector: 'app-kanban-card',
    templateUrl: './kanban-card.component.html',
    styleUrls: ['./kanban-card.component.scss']
})
export class KanbanCardComponent {

    @Input() taskId: number = 0;
    @Input() table: any | undefined = '';
    @Input() type: string | undefined = '';
    @Input() task: string | undefined = '';
    @Input() bgColor: string | undefined = 'red';
    @Input() updatedAt: string | undefined = '';


    @Output() onDelete = new EventEmitter();

    constructor(private dbService: NgxIndexedDBService, private toastService: HotToastService) { }

    
    @ViewChild("modifInput")
    myInputField!: ElementRef<any>;


    isModificationOn = false;

    removeTask() {
        
        this.dbService.deleteByKey(this.table, this.taskId).subscribe((key: any) => {
            this.onDelete.emit();
            this.toastService.success('Task has been removed')
        });
    }


    modifyTask(){
        this.isModificationOn = true;
        this.taskInput = this.task;
        this.typeInput = this.type;
        this.selectedColor = this.bgColor;
        setTimeout(() => {
            this.myInputField.nativeElement.focus();
        }, 100);
    }

    onClose(){
        this.isModificationOn = false;
    }

    typeInput: any;
    taskInput: any;

    onFocus(event: any){

    }

    onBlur(event: any){

    }

    selectedColor: any;

    handleColorChange($event: any) {
        let hexColor = $event.color.hex;

        switch (hexColor) {
            case '#ff0000':
                this.selectedColor = 'red';
                break;
            case '#ffff00':
                this.selectedColor = 'yellow';
                break;
            case '#008000':
                this.selectedColor = 'green';
                break;
            case '#0000ff':
                this.selectedColor = 'blue';
                break;
            case '#4b0082':
                this.selectedColor = 'indigo';
                break;
            case '#800080':
                this.selectedColor = 'purple';
                break;
            case '#ffc0cb':
                this.selectedColor = 'pink';
                break;
            case '#808080':
                this.selectedColor = 'gray';
                break;
            default:
                this.selectedColor = 'red';
                break;
        }

    }

    isColorSelectorOn: boolean = false;

    
    colorslist: any[] = [
        'blue',
        'green',
        'indigo',
        'purple',
        'pink',
        'red',
        'yellow',
        'gray',
    ];


    autoGrowTextZone(e: any) {
        e.target.style.height = "0px";
        e.target.style.height = (e.target.scrollHeight + 25) + "px";
    }

    updateTask(){

        
        console.log('selectedColor', this.selectedColor);
        console.log('bgcolor',this.bgColor);
        


        this.dbService.update(this.table, {
            id: this.taskId,
            task: this.taskInput,
            type: this.typeInput,
            bgcolor: this.selectedColor,
            updated_at: Date.now(),
          }).subscribe((key: any) => {
            this.toastService.success('Task has been updated');    
            this.onDelete.emit();
          })
    }


}