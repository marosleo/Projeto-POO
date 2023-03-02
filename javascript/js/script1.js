class Tarefa {

  constructor(){
    this.id = 1;
    this.arrayTarefas = [];
  }

  save() {
    let tarefa = this.lerDados()

    if(this.validaCampos(tarefa)) {
      this.adicionar(tarefa)
    }

    this.listaTabela();
    this.cancel();
  }

  listaTabela() {
    let tbody = document.getElementById('tbody');
    tbody.innerText = '';

    for(let i = 0; i < this.arrayTarefas.length; i++) {
      let tr = tbody.insertRow();

      let td_id = tr.insertCell();
      let id_tarefa = tr.insertCell();
      let td_prioridade = tr.insertCell();
      let td_acoes = tr.insertCell();

      td_id.innerText = this.arrayTarefas[i].id;
      id_tarefa.innerText = this.arrayTarefas[i].nomeTarefa;
      td_prioridade.innerText = this.arrayTarefas[i].prioridade;

      td_id.classList.add('center');

      let imgEdit = document.createElement('img');
      imgEdit.src = '../img/edit.png';

      let imgDelete = document.createElement('img');
      imgDelete.src =  '../img/delete.png';
      imgDelete.setAttribute("onclick","tarefa.deletar(" + this.arrayTarefas[i].id + ")"); 

      td_acoes.appendChild(imgEdit);
      td_acoes.appendChild(imgDelete);

      console.log(this.arrayTarefas)
    }
  }

  adicionar(tarefa) {
    this.arrayTarefas.push(tarefa);
    this.id++;
  }

  lerDados() {
    let tarefa = {}

    tarefa.id = this.id
    tarefa.nomeTarefa = document.getElementById('tarefa').value
    tarefa.prioridade = document.getElementById('prioridade').value

    return tarefa
  }

  validaCampos(tarefa) {
    let msg = '';

    if (tarefa.nomeTarefa == '') {
      msg += '- Informe alguma Tarefa \n'
    }

    if (tarefa.prioridade == '') {
      msg += '- Informe a prioridade da Tarefa \n'
    }

    if (msg != '') {
      alert(msg);
      return false
    }

    return true
  }

  cancel() {
    document.getElementById('tarefa').value = '';
    document.getElementById('prioridade').value = '';
  }

  deletar(id){

    let tbody = document.getElementById('tbody');

    for(let i = 0; i < this.arrayTarefas.length; i++){
       if(this.arrayTarefas[i].id == id) {
        this.arrayTarefas.splice(i, 1);
        tbody.deleteRow(i);
       }
    }
  }
}

var tarefa = new Tarefa()