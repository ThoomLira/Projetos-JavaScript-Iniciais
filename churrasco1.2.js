/////////////////////////////////////////////////////////////////////////////////
///////////////////////Calculadora de Churrasco/////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/////Language: Portugues BR

alert('Aplicativo desenvolvido para calcular a quantidade de Carne/Linguiça por pessoas para seu churrasco! \n DEV. Thoomlira')

console.log('Seja bem vindos a Calculadora de Churrasco')

let quantidade = prompt('Insira a quantidade de pessoas para seu churrasco!')
const gramas = .400
let total = (quantidade * gramas)
let mensagem = (`Sua quantidade de é de ${total} de Carne/Linguiça para pessoa!`)

if (quantidade <= 2){
    console.log(`Sua quantidade de é de ${total}g de Carne/Linguiça para pessoa!`)
  }
else if (quantidade > 3){
    console.log(`Sua quantidade de é de ${total}Kg de Carne/Linguiça para pessoa!`)
 }
else if (quantidade <= 0){
console.log('Chamar a galera')
}
