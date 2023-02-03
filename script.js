const addBox = document.querySelector('#addBox')
const addText = document.querySelector('#addText')
const visor = document.getElementById('visor')
const divAddBox = document.getElementById('divAddBox')
const divConfig = document.getElementById('divConfig')
const configPosition = document.getElementById('configPosition')
const ButtonCreatTag = document.getElementById('creatTag')
const ButtonCancel = document.getElementById('cancelTag')
const PosicaoX = document.getElementById('posicaoX')
const PosicaoY = document.getElementById('posicaoY')
const configAfterCreate = document.createElement('div')

let createVerification = true
let divs = []
let idDiv = 0

addBox.addEventListener('click', function () {
    if (createVerification) {
        divConfig.style.display = 'block'
        createVerification = false
    }
})

ButtonCreatTag.addEventListener('click', CreateOrModify)

function CreateOrModify(id) {
    let style = {
        largura: document.getElementById('largura').value,
        altura: document.getElementById('altura').value,
        color: document.getElementById('cor').value
    }
    let validation = {
        largura: parseInt(style.largura),
        altura: parseInt(style.altura)
    }
    let div = document.createElement('div')
    div.id = idDiv
    if (id <= idDiv) {
        let newStyle = {
            largura: document.getElementById('newLargura').value,
            altura: document.getElementById('newAltura').value,
            color: document.getElementById('newColor').value
        }
        let newValidation = {
            largura: parseInt(newStyle.largura),
            altura: parseInt(newStyle.altura)
        }
        let divSelect = document.getElementById(id)

        if (isNaN(newValidation.altura) == false) {
            divSelect.style.height = document.getElementById('newAltura').value
        }
        if (isNaN(newValidation.largura) == false) {
            divSelect.style.width = document.getElementById('newLargura').value
        }
        divSelect.style.backgroundColor = document.getElementById('newColor').value
        document.getElementById(id).removeChild(document.getElementById('configAfterCreate'))

    } else {
        if (isNaN(validation.largura)) {
            document.getElementById('largura').value = ''
            document.getElementById('largura').setAttribute('placeholder', 'valor invalido')
        }
        if (isNaN(validation.altura)) {
            document.getElementById('altura').value = ''
            document.getElementById('altura').setAttribute('placeholder', 'valor invalido')
        }

        if (isNaN(validation.largura) == false && isNaN(validation.altura) == false) {
            div.style.width = style.largura
            div.style.height = style.altura
            div.style.backgroundColor = style.color
            visor.append(div)
            div.addEventListener('dblclick', selectDiv)
            divs[idDiv] = document.getElementById(idDiv)
            divConfig.style.display = 'none'
            configPosition.style.display = 'block'
            idDiv++

        }
    }

}


function selectDiv(li) {
    if (createVerification) {

        li.toElement.append(configAfterCreate)
        configAfterCreate.style.position = 'relative'
        configAfterCreate.id = 'configAfterCreate'
        configAfterCreate.style.top = `${li.srcElement.clientHeight + 5}px`
        configAfterCreate.style.zIndex = '10'

        configAfterCreate.innerHTML = `
        <label for="newAltura">Altura</label>
        <input type="text" id="newAltura" size="7">
        <label for="newLargura">Largura</label>
        <input type="text" id="newLargura" size="7">
        <br>
        <label for="newColor">Cor</label>
        <input type="color" id="newColor">
        <label for="newPosicaoX">Posição do eixo X</label>
        <input type="text" id="newPosicaoX" size="7">
        <label for="newPosicaoy">Posição do eixo Y</label>
        <input type="text" id="newPosicaoY" size="7">
        <br>
        <button type="button" id="remove" onclick="CreateOrModify(${li.srcElement.id})"> OK</button>
        <button type="button" id="removeDiv">REMOVER</button>`
        const removeDiv = document.getElementById('removeDiv')
        removeDiv.addEventListener('click', deleteDiv)


        const NewPosicaoX = document.getElementById('newPosicaoX')
        const NewPosicaoY = document.getElementById('newPosicaoY')
        NewPosicaoX.addEventListener('keyup', function () {
            let divReferencer = document.getElementById(idDiv - 1)
            let newPosicaoX = NewPosicaoX.value
            if(parseInt(newPosicaoX)+divReferencer.clientWidth < divReferencer.parentNode.clientWidth){
                divReferencer.style.position = 'relative'
                divReferencer.style.left = newPosicaoX
            }else {
                NewPosicaoX.value = ''
                NewPosicaoX.setAttribute('placeholder', 'valor invalido')
            }
        })
        NewPosicaoY.addEventListener('keyup', function () {
            let divReferencer = document.getElementById(idDiv - 1)
            let newPosicaoY = NewPosicaoY.value
            if(parseInt(newPosicaoY)+divReferencer.clientHeight < divReferencer.parentNode.clientHeight){
                divReferencer.style.position = 'relative'
                divReferencer.style.top = newPosicaoY
            }else{
                NewPosicaoY.value = ''
                NewPosicaoY.setAttribute('placeholder', 'valor invalido')
            }

        
        })
    }
}

function deleteDiv(div) {
    div.srcElement.parentNode.parentNode.remove()
}

PosicaoX.addEventListener('keyup', function () {
    let divReferencer = document.getElementById(idDiv - 1)
    let posicaoX = PosicaoX.value
    if(parseInt(posicaoX) + divReferencer.clientWidth < divReferencer.parentNode.clientWidth){
        divReferencer.style.position = 'relative'
        divReferencer.style.left = posicaoX
    }else {
        PosicaoX.value = ''
        PosicaoX.setAttribute('placeholder', 'valor invalido')
    }

})
PosicaoY.addEventListener('keyup', function () {
    let divReferencer = document.getElementById(idDiv - 1)
    let posicaoY = PosicaoY.value
    if (parseInt(posicaoY) + divReferencer.clientHeight < divReferencer.parentNode.clientHeight) {
        divReferencer.style.position = 'relative'
        divReferencer.style.top = posicaoY
    }else{
        PosicaoY.value = ''
        PosicaoY.setAttribute('placeholder', 'valor invalido')
    }
})

ButtonCancel.addEventListener('click', function () {
    divConfig.style.display = 'none'
    createVerification = true
})



document.getElementById('block').addEventListener('click', function (bottom) {
    bottom.srcElement.parentNode.style.display = 'none'
    createVerification = true
})
