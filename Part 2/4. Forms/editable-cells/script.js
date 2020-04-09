const table = document.getElementById('bagua-table');
const textArea = document.createElement('textarea')
const okBtn = document.createElement('button')
const cancelBtn = document.createElement('button')
let selectedTD = null;

okBtn.innerHTML = 'OK'
cancelBtn.innerHTML = 'CANCEL'

let isEditing = false

table.addEventListener('click', e => {
  if (e.target.tagName != 'TD') return
  if (isEditing) return
  selectedTD = e.target
  startEditing()
})

function startEditing() {
  styleTextArea()
  textArea.value = selectedTD.innerHTML
  selectedTD.replaceWith(textArea)
  isEditing = true
  prepareAndPlaceButtons()
  addEvents()
}

function styleTextArea() {
  const tdRect = selectedTD.getBoundingClientRect()
  textArea.style.width = `${tdRect.width}px`
  textArea.style.height = `${tdRect.height}px`
  textArea.style.padding = '0px'
  textArea.style.border = 'none'
  textArea.style.position = 'absolute'
}

function prepareAndPlaceButtons() {
  const textAreaRect = textArea.getBoundingClientRect()
  okBtn.classList.add('btn')
  okBtn.style.left = `${textAreaRect.left}px`
  okBtn.style.top = `${textAreaRect.bottom}px`
  textArea.after(okBtn)
  okBtn.hidden = false

  okBtnRect = okBtn.getBoundingClientRect()
  cancelBtn.classList.add('btn')
  cancelBtn.style.left = `${okBtnRect.right}px`
  cancelBtn.style.top = `${textAreaRect.bottom}px`
  okBtn.after(cancelBtn)
  cancelBtn.hidden = false
}

function addEvents() {
  okBtn.addEventListener('click', e => {
    selectedTD.innerHTML = textArea.value
    endEditing()
  })
  
  cancelBtn.addEventListener('click', e => {
    endEditing()
  })
}

function endEditing() {
  textArea.replaceWith(selectedTD)
  isEditing = false
  removeButtons()
}

function removeButtons() {
  okBtn.hidden = true
  cancelBtn.hidden = true
}
