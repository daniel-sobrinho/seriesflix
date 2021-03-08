function getDados(url){
    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    return request.responseText;
}

function inicializarEstado(){
    let select = document.getElementById('estado');
    let estados = getDados('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        estados = JSON.parse(estados);
    
    for(var i = 0; i<estados.length; i++){
        var option = document.createElement('option');

        option.value = estados[i].id;
        option.innerHTML = estados[i].nome;

        select.appendChild(option)
    }
}

function inicilizarCidades(){
    limparSelect()

    let idEstado = document.getElementById('estado').value;

    let cidades = getDados(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios`);
        cidades = JSON.parse(cidades);

    let select = document.getElementById('cidade');

    for(var i=0; i<cidades.length; i++){
        var option = document.createElement('option');

        option.innerHTML = cidades[i].nome;

        select.appendChild(option);
    }
}

function limparSelect(){
    let lista = document.getElementById('cidade');
    

    for(let i=lista.length-1; i>0; i--){
        lista.removeChild(lista[i]);
    }
}

function validarForm(){
    //Função apenas para verificar se os dados do form foram preenchidos. Não serve para validação

    let nome = document.getElementById('nome');
    let estado = document.getElementById('estado');
    let cidade = document.getElementById('cidade');
    let email = document.getElementById('email');
    let mensagem = document.getElementById('mensagem');

    if(nome.value.length>2 && estado.value!=0 && cidade.value!=0 && email.value.length>0 && mensagem.value.length>0){
        alert("Formulário Enviado com Sucesso")
    }else{
        alert("Erro ao enviar, verifique os dados e tente novamente")
    }
}

inicializarEstado();