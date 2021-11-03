export class Models {

  id: number;
  tarefa: string;
  status: string;
  detalhes: string;

 constructor( _id: number, _tarefa: string, _status: string, _detalhes: string ) {
  this.id = _id;
  this.tarefa = _tarefa;
  this.status = _status;
  this.detalhes = _detalhes;
  }
}
