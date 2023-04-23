//Lendo o campo de cep para atribuir uma ação a ele:
let cep = document.getElementById('inputZip')
cep.addEventListener('focusout', lerCEP)

//Função para passar o CEP digitado para a API:
function lerCEP() {
  let cepValue = cep.value
  let cepGuardado = cepValue //Guardando o CEP para manter digitado no campo após o reset.
  let cepLido = `https://viacep.com.br/ws/${cepValue}/json/`
  getCEP(cepLido, cepGuardado)
}

//Função assíncrona que recebe o CEP e traz o endereço:
async function getCEP(cepLido, cepGuardado) {
  try {
    const response = await fetch(cepLido)
    const json = await response.json()
    showContent(json)
    cep.style.border = '' //Esta linha é pra voltar ao padrão depois de uma tentativa incorreta, se não fica sempre vermelho.
    if (json.uf == undefined) { //Se o CEP tiver o tamanho correto mas não existir.
      erroCEP(cepGuardado)
    }
  } catch {
    erroCEP(cepGuardado)
  }
}

//Função que exibe os dados recebidos na página:
function showContent(json) {
  let logradouro = document.getElementById('inputAddress')
  logradouro.value = json.logradouro
  let bairro = document.getElementById('bairroAddress')
  bairro.value = json.bairro
  let cidade = document.getElementById('inputCity')
  cidade.value = json.localidade
  let estado = document.getElementById('estado')
  estado.value = json.uf
}

//Função executada quando o tamanho do CEP digitado for diferente de 8 dígitos ou não existir:
function erroCEP(cepGuardado) {
  cep.style.border = '1px solid red'
  let form = document.getElementById('form')
  form.reset()
  cep.placeholder = 'CEP inválido ou incorreto. Tente novamente.'
  cep.value = cepGuardado //Mantém o CEP digitado para a pessoa não ter que digitar tudo de novo.
}