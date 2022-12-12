// CRIAR VITRINE DE PRODUTOS

let arrCarrinho = []

function criarProdutos(data){

    let divProdutos = document.querySelector(".vitrine")
    divProdutos.innerHTML = ""

    let ulProdutos = document.createElement("ul")
    ulProdutos.classList.add("container-cards")
    ulProdutos.innerHTML = ""

    for(let i = 0; i< data.length; i++){
        let produto = data[i]

        let liProdutos = document.createElement("li")
            liProdutos.classList.add("card")
            ulProdutos.appendChild(liProdutos)

        let img = document.createElement("img")
            img.src = produto.img
            img.alt = produto.nameItem
            liProdutos.appendChild(img)

        let tagProdutos = document.createElement("p")
            tagProdutos.classList.add("tag")
            tagProdutos.innerText = produto.tag
            liProdutos.appendChild(tagProdutos)

        let tituloProdutos = document.createElement("h3")
            tituloProdutos.classList.add("nameItem")
            tituloProdutos.innerText = produto.nameItem
            liProdutos.appendChild(tituloProdutos)

        let descriptionProdutos = document.createElement("p")
            descriptionProdutos.classList.add("description")
            descriptionProdutos.innerText = produto.description
            liProdutos.appendChild(descriptionProdutos)

        let valueProdutos = document.createElement("p")
            valueProdutos.classList.add("value")
            valueProdutos.innerText = `R$${produto.value.toFixed(2)}`
            liProdutos.appendChild(valueProdutos)

        let buttonProdutos = document.createElement("button") 
            buttonProdutos.id = produto.id
            buttonProdutos.classList.add("addCart")
            buttonProdutos.innerText = produto.addCart
            buttonProdutos.addEventListener('click', function(e){
                let idElemento = e.target.id
                let id = idElemento 

                if(verificaProduto(id) == false){
            
                    let produto = procuraProduto(id)

                    let elementoProduto = inserirProduto(produto)
                } soma(arrCarrinho)
            }) 
            
        liProdutos.appendChild(buttonProdutos)
        divProdutos.appendChild(ulProdutos)
    } 
}
console.log(criarProdutos(data))

//FUNCAO PARA VERIFICAR AS ADICOES DO PRODUTO DENTRO DO CARRINHO 

function verificaProduto(id){
    let elemento = document.querySelector("#duplicar_"+id)
      if(elemento == null){
          return false
      }else{
          return true
      }
  }

function procuraProduto(id){
    for(let i = 0; i < data.length; i++){
        let produto = data[i]
        if(produto.id == id){
            return produto
        }
    } 
    return "Produto não encontrado"
} 

//FUNCAO PARA INSERIR PRODUTOS NO CARRINHO DE COMPRAS

function inserirProduto(produto){
    arrCarrinho.push(produto)
    redenrizarCarrinho(arrCarrinho)
}

function redenrizarCarrinho(arr){

    let listaProduto = document.querySelector(".ulCarrinho")

    if(arr.length > 0){

    listaProduto.innerHTML = ""
        arr.forEach(element => {  
            let tagLi = document.createElement("li")
                tagLi.classList.add("card-carrinho")
                tagLi.id = `duplicar_${element.id}`

            let tagImg = document.createElement("img")
                tagImg.src = element.img
                tagImg.alt = element.nameItem
             
             let tagTag = document.createElement("p") 
                 tagTag.classList.add("tag")
                 tagTag.innerText = element.tag 

            let tagTitulo = document.createElement("h3")
                tagTitulo.classList.add("nameItem")
                tagTitulo.innerText = element.nameItem.substring(0,20) 

            let tagValor = document.createElement("p")
                tagValor.classList.add("value")
                tagValor.innerText = `R$${element.value.toFixed(2)}`

            let buttonRemover = document.createElement("button") 
                buttonRemover.id = element.id
                buttonRemover.classList.add("rmCart")
                buttonRemover.innerHTML = "Remover"

            buttonRemover.addEventListener("click", function(e){
            let liInserirProdutos = document.querySelector("#duplicar_"+element.id)
            arrCarrinho.splice(liInserirProdutos, 1)
            subtrair(arrCarrinho)
            redenrizarCarrinho(arrCarrinho)
            soma(arrCarrinho)
            
        })
        tagLi.append(tagImg, tagTag, tagTitulo, tagValor,  buttonRemover)
        listaProduto.appendChild(tagLi)
        
    })
   
    }
    else{

        listaProduto.innerHTML = ""
        let carrinhoCompras = document.querySelector(".carrinho-compras")
        let carrinho = document.querySelector(".carrinhovazio")
        let carrinhoVazio = document.createElement("h2")
        carrinhoVazio.classList.add(".carrinhovazio")
        carrinhoVazio.innerText = "Carrinho vazio"
        let adcItens = document.createElement("p")
        adcItens.classList.add(".adcitem")
        adcItens.innerText = "Adicionar itens"
    
        listaProduto.append(carrinhoVazio, adcItens)
    }
}

// SOMAR

    let somarProdutosCarrinho = document.querySelector(".espaco-soma")

    let divSomatexto = document.querySelector(".somaTexto")
    let qtdProdutostxt = document.querySelector(".txtquantidade")
    qtdProdutostxt.innerHTML = "Quantidade:"
    let precoTotaltxt = document.querySelector(".txtTotal")
    precoTotaltxt.innerHTML = "Total:"

    let divSomaNumero = document.querySelector(".somaNumero")
    let qtdProdutos = document.querySelector(".quantidade")
    let precoTotal = document.querySelector(".total")

    let valorTotal = 0

    function soma(produto){
        valorTotal = 0
        produto.forEach(e =>{
        valorTotal += e.value
    })
        qtdProdutos.innerText = `${produto.length}`
        precoTotal.innerText = `R$ ${(valorTotal).toFixed(2)}`
    }

    function subtrair(produto){
        qtdProdutos.innerText = `${produto.length -1}`
        precoTotal.innerHTML = ""
    
        valorTotal -= produto
        if(produto.length == undefined){

            qtdProdutos.innerText = `${0}`
            precoTotal.innerText = `R$ ${(valorTotal).toFixed(2)}`
        
        }else{

            qtdProdutos.innerText = `${produto.length}`
            precoTotal.innerText = `R$ ${(valorTotal).toFixed(2)}`
        }
    }

function filter(lista){
    let arrFiltrado = []
   let categorias = [...document.querySelector(".categorias").children]
   categorias.forEach((botao)=>{
        botao.addEventListener("click", function(e){
            e.preventDefault()
            if(botao.innerText == "Todos"){
                location.reload()
            }
            arrFiltrado = lista.filter((item)=>{
                return botao.innerText == item.tag[0]
            })
           criarProdutos(arrFiltrado)
        })
    })
}
filter(data)