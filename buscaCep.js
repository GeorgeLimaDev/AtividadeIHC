async function getCEP() {

  let cepValue = cep.value

  if(cepValue.length == 8){
    let cepLido = `https://viacep.com.br/ws/${cepValue}/json/`
    
      const response = await fetch(cepLido)
      const json = await response.json()

      cep.classList.remove('is-invalid');
      invalidCepFeedback.innerText = "";


      if (json.erro){
        throw new Error('Invalid CEP')
      }

      //Registrando informações nos campos
      if (json.logradouro){
        let logradouro = document.getElementById('inputAddress')
        logradouro.value = json.logradouro; 
      }

      if (json.bairro){
        let bairro = document.getElementById('bairroAddress')
        bairro.value = json.bairro;
      }

      if (json.localidade){
        let cidade = document.getElementById('inputCity')
        cidade.value = json.localidade;
      }

      /* Para inserir o estado automaticamente
      if (json.uf){
        let estado = document.getElementById('estado')
        estado.value = json.uf;
      }
      */

  }
  else {
    const message = "CEP inválido";
    invalidCepFeedback.innerText = message;
    cep.classList.add('is-invalid');

    //Limpando campos

    document.getElementById('inputAddress').value = (""); //rua
    document.getElementById('bairroAddress').value = (""); //bairro
    document.getElementById('inputCity').value = (""); //cidade
    
  
    //cep.value = cepGuardado;
    //let cepGuardado = cepValue
  }
}

addEventListener('focusout', getCEP)

