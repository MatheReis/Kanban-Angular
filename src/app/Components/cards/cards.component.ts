import { Models } from './../Models';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {


  fazer: Models[] = [];
  fazendo: Models[] = [];
  feito: Models[] = [];
  public registro!: FormGroup;
  sequencia: number = 0;

  //Mostrar Modal
  mostrar: boolean = false;


  constructor(private fb: FormBuilder) {}


  ngOnInit(): void {
    this.registro = this.fb.group({
      itemName: ['', [Validators.required, Validators.minLength(3)]]
    });
      this.fazer = [];
      this.fazendo = [];
      this.feito = [];
      this.sequencia = this.getIndex();
      this.retrieveItem();
  }

  addItem(): void{
    if(this.registro.valid){
      let item: Models = new Models(++this.sequencia, this.registro.value['itemName'],'fazer');
      this.fazer.push(item);
      this.registro.reset();
      this.saveItem(item);
      this.Indexdados();
    }
  }

  setItem(itemList: Models[]):void {
    this.fazer = itemList.filter(item => item.status == 'fazer');
    this.fazendo = itemList.filter(item => item.status == 'fazendo');
    this.feito = itemList.filter(item => item.status == 'feito');
  }


  removeItem(item: Models, index: number):void {
    if(item.status == 'fazer'){
      this.fazer.splice(index, 1);
    }
    else if(item.status == 'fazendo'){
      this.fazendo.splice(index, 1);
    }
    else if(item.status == 'feito'){
      this.feito.splice(index, 1);
    }
    this.deleteItem(item);
  }


  drop(event: CdkDragDrop<Models[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      if(event.container.data === this.fazer){
        event.container.data[event.currentIndex].status = 'fazer';
      }
      else if(event.container.data === this.fazendo){
        event.container.data[event.currentIndex].status = 'fazendo';
      }
      else if(event.container.data === this.feito){
        event.container.data[event.currentIndex].status = 'feito';
      }
      this.salvarStatus(event.container.data[event.currentIndex]);
    }
  }


  saveItem(item: Models): void {
   try{
     let previousItem: string | null = localStorage.getItem('itemList');
     if (previousItem === null){
       previousItem = "[]";
     }
     let currentItem = JSON.parse(previousItem) as Models[];
     currentItem.push(item)
     localStorage.setItem('itemList', JSON.stringify(currentItem));
   }
   catch(error){
     console.log(error);
   }
  }


  deleteItem(item: Models): void{
    try{
      let previousItem: string | null = localStorage.getItem('itemList');
      if (previousItem === null){
        previousItem = "[]";
      }
      let currentItem = JSON.parse(previousItem) as Models[];
      currentItem.splice(currentItem.findIndex(item => item.id === item.id), 1);
      localStorage.setItem('itemList', JSON.stringify(currentItem));
    }
    catch(error){
      console.log(error);
    }
  }

  salvarStatus(item: Models): void{
    try{
      let previousItem: string | null = localStorage.getItem('itemList');
      if (previousItem === null){
        previousItem = "[]";
      }
      let currentItem = JSON.parse(previousItem) as Models[];
      currentItem[currentItem.findIndex(item => (item.id == item.id && item.tarefa == item.tarefa))].status = item.status;
      localStorage.setItem('itemList', JSON.stringify(currentItem));
  }
  catch(error){
    console.log(error);
  }
}

  retrieveItem(): void {
    try{
      let savedItem: string | null = localStorage.getItem('itemList');
      if (savedItem === null){
        savedItem = "[]";
      }
      let listItem: Models[];
      listItem = savedItem === "[]" ? [] : JSON.parse(savedItem) as Models[];
      if(listItem.length > 0){
        this.setItem(listItem);
      }
  }
  catch(error){
    console.log(error);
  }
}

  getIndex(): number {
    let numSeq: number = 0;
    try{
    let seqIndex: string | null = localStorage.getItem('itemSequence');
    if(seqIndex !== null){
      numSeq = parseInt(seqIndex);
    }
    else{
      localStorage.setItem('itemSequence', '0');
     }
    }
    catch(error){
      console.log(error);
    }
    return numSeq;
    }

    Indexdados(): void {
      try{
        let numSeq: number;
        let seqIndex: string | null = localStorage.getItem('itemSequence');
        if(seqIndex !== null){
          numSeq = parseInt(seqIndex);
          numSeq++;
          localStorage.setItem('itemSequence', numSeq.toString());
        }
      }
      catch(error){
        console.log(error);
      }
   }

  }





