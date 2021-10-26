export class Models {

  id: number;
  tarefa: string;
  status: string;


 constructor(_id: number, _tarefa: string, _status: string) {
     this.id = _id;
     this.tarefa = _tarefa;
     this.status = _status;
   }
 }
