class Tarefa {

  constructor(){
    this.id = 1;
    this.arrayTarefas = [];
    this.editId = null;
  }

  save() {
    let tarefa = this.lerDados()

    if(this.validaCampos(tarefa)) {
      if(this.editId == null){
        this.adicionar(tarefa)
      } else {
         this.atualizar(this.editId, tarefa);
      }
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
      imgEdit.setAttribute("onclick","tarefa.preparaEdicao(" + JSON.stringify(this.arrayTarefas[i]) + ")"); 

      let imgDelete = document.createElement('img');
      imgDelete.src =  '../img/delete.png';
      imgDelete.setAttribute("onclick","tarefa.deletar(" + this.arrayTarefas[i].id + ")"); 

      td_acoes.appendChild(imgEdit);
      td_acoes.appendChild(imgDelete);

      console.log(this.arrayTarefas)
    }
  }

  adicionar(tarefa) {
    tarefa.preco = parseFloat(tarefa.prioridade)
    this.arrayTarefas.push(tarefa);
    this.id++;
  }

  atualizar(id, tarefa) {
    for (let i = 0; i < this.arrayTarefas.length; i++) {
      if(this.arrayTarefas[i].id == id) {
        this.arrayTarefas[i].nomeTarefa = tarefa.nomeTarefa
        this.arrayTarefas[i].prioridade = tarefa.prioridade
      }      
    }
  }

  preparaEdicao(dados) {
    this.editId = dados.id;

    document.getElementById('tarefa').value = dados.nomeTarefa
    document.getElementById('prioridade').value = dados.prioridade

    document.getElementById('btn1').innerText = 'Atualizar'
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

    document.getElementById('btn1').innerText = 'Salvar';
    this.editId = null;
  }

  deletar(id){

    if(confirm('Deseja realmente deletar a tarefa do ID' + id)) {
      let tbody = document.getElementById('tbody');

      for(let i = 0; i < this.arrayTarefas.length; i++){
         if(this.arrayTarefas[i].id == id) {
          this.arrayTarefas.splice(i, 1);
          tbody.deleteRow(i);
         }
    }

    }
  }
}

var tarefa = new Tarefa()