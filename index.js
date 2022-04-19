// modal banks
function showModal() {
    let modal = document.createElement('div')
    modal.className = 'creatBank'
    modal.innerHTML = `   
    <div class="bank_body">
        <div class="bank_content">
            <form action="javascript:saveModal()" id="creatBank_form">
                <div class="bank_name_container">
                    <input class="bank_name" type="text" placeholder="Назва банку" required="required">
                </div>
                <button class="btn_close" type="button" onclick="removeModal()">X</button>
                <div class="bank_conditions">
                    <div class="bank_percentage bank_conditions-child">
                        <span class="bank_child_title">Процентна ставка</span>
                        <input class="percentage" type="number" placeholder="%" required="required" min="0" max="100" step="any" >
                    </div>
                    <div class="bank_minCredit bank_conditions-child">
                        <span class="bank_child_title">Мінімальна сума кредиту</span>
                        <input class="minCredit" type="number" placeholder="грн " required="required" min="1000" max="3000000"  step="1" >
                    </div>
                    <div class="bank_maxCredit bank_conditions-child">
                        <span class="bank_child_title">Максимальна сума кредитування</span>
                        <input class="maxCredit" type="number" placeholder="грн" required="required" min="1000" max="30000000" step="1">
                    </div>
                    <div class="bank_prepayment bank_conditions-child">
                        <span class="bank_child_title">Мінімальний початковий внесок</span>
                        <input class="prepayment" type="number" placeholder="%" required="required" min="0" max="100" step="any" >
                    </div>
                    <div class="bank_term bank_conditions-child">
                        <span class="bank_child_title">Термін кредитування</span>
                        <input class="term" type="number" placeholder="запишіть в роках" required="required" min="1" max="100" step="1" >
                    </div>
                    <div class="bank_paymentForServices bank_conditions-child">
                        <span class="bank_child_title">Разова комісія</span>
                        <input class="paymentForServices" type="number" placeholder="%" required="required" min="0" max="100" step="any"  >
                    </div>
                </div>
                <div class="foot">
                    <div class="btn_solutions">
                        <button class="btn_save" type="submit"  >Save</button>
                        <button class="btn_del" type="button" onclick="removeModal()">Delet</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
    `


    document.body.append(modal)
}
let visible = true

let banks = []
let bank = {
    id: 0,
    name: "name",
    percentage: 0,
    minCredit: 0,
    maxCredit: 0,
    prepayment: 0,
    term: 0,
    paymentForServices: 0,
}

let banksStore = JSON.parse(localStorage.getItem('banks'));

if (banksStore == null) {
    localStorage.setItem('banks', JSON.stringify(banks))
    console.log("???")
} else if (!(banksStore == '')) {
    render()
}





function saveModal() {
    console.log(document.querySelector('.percentage').validity.rangeUnderflow)

    let banksStore = JSON.parse(localStorage.getItem('banks'))
    banks = banksStore
    let id = 0
    if (banks == '') {
        bank.id = id
    } else {
        id = maxId(banks) + 1
        bank.id = id
    }
    bank.name = document.querySelector('.bank_name').value
    bank.percentage = Number(document.querySelector('.percentage').value)
    bank.minCredit = Number(document.querySelector('.minCredit').value)
    bank.maxCredit = Number(document.querySelector('.maxCredit').value)
    bank.prepayment = Number(document.querySelector('.prepayment').value)
    bank.term = Number(document.querySelector('.term').value)
    bank.paymentForServices = Number(document.querySelector('.paymentForServices').value)
    if (bank.name == '' || bank.percentage == '' || bank.minCredit == '' || bank.maxCredit == '' || bank.prepayment == '' || bank.term == '' || bank.paymentForServices == '') {
        //alert("Заповніть всі поля")
    } else if (bank.minCredit == bank.maxCredit || bank.minCredit > bank.maxCredit) {
        alert("Мінімальній сума кредитування не може бути більшим або рівним максимальній сумі кредитування.")
    } else {
        banks.push(bank)
        addBank(bank)
            // banks.forEach(element => {
            //     addBank(element)
            // })
        localStorage.setItem('banks', JSON.stringify(banks))
        if (document.querySelector('.empty')) {
            document.querySelector('.empty').remove()
        }
        removeModal()
    }


}

function inputTrue() {

}

function maxId(banks) {
    let maxId = banks[0].id
    banks.forEach(element => {
        if (element.id > maxId) {
            maxId = element.id
        }
    });
    return maxId;
}

function removeModal() {
    if (document.querySelector('.creatBank')) {
        (document.querySelector('.creatBank').remove())
    }
}

//----------------- banks
//удаление банка
function removeBank(element) {
    let idOfElement = +element.parentElement.parentElement.parentElement.getAttribute('data-id')
    let find = banks.map(el => el.id)
    let indexOfElement = find.indexOf(idOfElement)
    banks.splice(indexOfElement, 1)
    writeBanksObj(indexOfElement)

    element.parentElement.parentElement.parentElement.remove() // можно ли как-то улучшить?
    if (!(document.querySelector('.bank_item'))) {
        emptyBanks()
    }
}

function writeBanksObj(indexOfElement) {
    let arr = JSON.parse(localStorage.getItem('banks'))
    arr.splice(indexOfElement, 1)
    localStorage.setItem('banks', JSON.stringify(arr))
}
// обновка банков из local
function render() {
    document.querySelector('.bank_list').innerHTML = ''
    let banksList = JSON.parse(localStorage.getItem('banks'))

    banksList.forEach(element => {
        addBank(element)
    })
}
// добавление банка
function addBank(bank) {
    let newBank = document.createElement('div')
    newBank.className = 'bank.item'
    newBank.innerHTML = `
    <div data-id="${bank.id}" class="bank_item">
                <div class="bank_item_top">
                    <div class="bank_title">
                        <span>${bank.name}</span>
                    </div>
                    <button class="btn_itemHide open" onclick="expandPlus(this)">
                        <span><i class="fas fa-plus"></i></span>
                    </button>
                    <div class="btn_itemExpand_container close">
                        <button class="btn_itemExpand_open" onclick="hideMinus(this)">
                            <span> <i class="fas fa-minus minusWhite" ></i></span>
                        </button>
                        <button class="btn_itemExpand_open" onclick="removeBank(this)" title="Видалити">
                            <span>  <i class="fas fa-times minusWhite"></i>
                            </span>
                        </button>
                        <button class="btn_itemExpand_open" onclick=" writeBank(this)"  title="Редагувати"> 
                            <span> <i class="fas fa-pen minusWhite"></i>
                            </span>
                        </button>

                    </div>
                </div>
                <div class="bank_table">
                    <div class="bank_percentage bank_table-child">
                        <span class="table_item_title">Процентна ставка</span>
                        <span class="percentage_value table_item_value">${bank.percentage} %</span>
                    </div>
                    <div class="bank_minCredit bank_table-child">
                        <span class="table_item_title">Мінімальна сума кредиту</span>
                        <span class="minCredit_value table_item_value">${bank.minCredit} грн</span>
                    </div>
                    <div class="bank_maxCredit bank_table-child">
                        <span class="table_item_title">Максимальна сума кредитування</span>
                        <span class="maxCredit_value table_item_value">${bank.maxCredit} грн</span>
                    </div>
                    <div class="bank_prepayment bank_table-child">
                        <span class="table_item_title">Мінімальний початковий внесок</span>
                        <span class="prepayment_value table_item_value">${bank.prepayment} %</span>
                    </div>
                    <div class="bank_term bank_table-child">
                        <span class="table_item_title">Термін кредитування</span>
                        <span class="term_value table_item_value">${bank.term} р.</span>
                    </div>
                    <div class="bank_paymentForServices bank_table-child">
                        <span class="table_item_title">Разова комісія</span>
                        <span class="paymentForServices_value table_item_value">${bank.paymentForServices} %</span>
                    </div>
                </div>
                `
    document.querySelector('.bank_list').append(newBank)
}
// добавление поля при отсутсвии банков
function emptyBanks() {
    let emptyBank = document.createElement('div')
    emptyBank.className = 'empty'
    emptyBank.innerHTML = `
                <div class="empty_container">
                    <span>Банки відсутні</span>
                </div>`
    document.querySelector('.bank_list').append(emptyBank)
}
//раскрытие условий банка

function expandPlus(element) {
    element.parentElement.parentElement.className = 'bank_item_open'
    element.parentElement.querySelector('.close').style.display = 'block'
    element.style.display = 'none'
    element.parentElement.parentElement.querySelector('.bank_table').style.display = 'block'
}

function hideMinus(element) {
    element.parentElement.parentElement.parentElement.className = 'bank_item'
    element.parentElement.style.display = 'none'
    element.parentElement.parentElement.querySelector('.open').style.display = 'block'
    element.parentElement.parentElement.parentElement.querySelector('.bank_table').style.display = 'none'


}

function lastOpen(element) {
    //console.log(element.parentElement.parentElement)
    //element.parentElement.parentElement.querySelector('.btn_itemHide')

}
// редактирование банка
function writeBank(element) {
    console.log(element)
        //нашли банк в списке
    let idOfElement = +element.parentElement.parentElement.parentElement.getAttribute('data-id')
    let find = banks.map(el => el.id)
    let indexOfElement = find.indexOf(idOfElement)
    console.log('papa', indexOfElement)
    writeShowModal(banks[indexOfElement], indexOfElement)
}

function writeShowModal(bank, indexOfElement) {
    console.log('mama', indexOfElement)
    let modal = document.createElement('div')
    modal.className = 'creatBank'
    modal.innerHTML = `   
    <div class="bank_body">
        <div class="bank_content">
            <form action="javascript:saveWriteModal(${indexOfElement})" id="writeBank_form">
                <div class="bank_name_container">
                    <input class="bank_name" type="text" placeholder="Назва банку" required="required" value="${bank.name}">
                </div>
                <button class="btn_close" type="button" onclick="removeModal()">X</button>
                <div class="bank_conditions">
                    <div class="bank_percentage bank_conditions-child">
                        <span class="bank_child_title">Процентна ставка</span>
                        <input class="percentage" type="number" placeholder="%" required="required" min="1" max="100" step="any" value="${bank.percentage}">
                    </div>
                    <div class="bank_minCredit bank_conditions-child">
                        <span class="bank_child_title">Мінімальна сума кредиту</span>
                        <input class="minCredit" type="number" placeholder="грн " required="required" min="1000" max="3000000"  step="1" value="${bank.minCredit}">
                    </div>
                    <div class="bank_maxCredit bank_conditions-child">
                        <span class="bank_child_title">Максимальна сума кредитування</span>
                        <input class="maxCredit" type="number" placeholder="грн"  required="required" min="1000" max="30000000"  step="1" value="${bank.maxCredit}">
                    </div>
                    <div class="bank_prepayment bank_conditions-child">
                        <span class="bank_child_title">Мінімальний початковий внесок</span>
                        <input class="prepayment" type="number" placeholder="%"  required="required" min="1" max="100" step="any" value="${bank.prepayment}">
                    </div>
                    <div class="bank_term bank_conditions-child">
                        <span class="bank_child_title">Термін кредитування</span>
                        <input class="term" type="number" placeholder="запишіть в місяцях"  required="required" min="1" max="100" step="1" value="${bank.term}">
                    </div>
                    <div class="bank_paymentForServices bank_conditions-child">
                        <span class="bank_child_title">Разова комісія</span>
                        <input class="paymentForServices" type="number" placeholder="%" required="required" min="0" max="100" step="any" value="${bank.paymentForServices}">
                    </div>
                </div>
                <div class="foot">
                    <div class="btn_solutions">
                        <button class="btn_save" type="submit"  >Save</button>
                        <button class="btn_del" type="button" onclick="removeModal()">Delet</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
    `
    document.body.append(modal)
}


function saveWriteModal(indexOfElement) {
    let banksStore = JSON.parse(localStorage.getItem('banks'))
    banks = banksStore
    console.log(indexOfElement)
    let id = banks[indexOfElement].id

    bank.id = id
    bank.name = document.querySelector('.bank_name').value
    bank.percentage = Number(document.querySelector('.percentage').value)
    bank.minCredit = Number(document.querySelector('.minCredit').value)
    bank.maxCredit = Number(document.querySelector('.maxCredit').value)
    bank.prepayment = Number(document.querySelector('.prepayment').value)
    bank.term = Number(document.querySelector('.term').value)
    bank.paymentForServices = Number(document.querySelector('.paymentForServices').value)
    if (bank.name == '' || bank.percentage == '' || bank.minCredit == '' || bank.maxCredit == '' || bank.prepayment == '' || bank.term == '' || bank.paymentForServices == '') {
        alert("Заповніть всі поля")
    } else if (bank.minCredit == bank.maxCredit || bank.minCredit > bank.maxCredit) {
        console.log()
        alert("Мінімальній сума кредитування не може бути більшим або рівним максимальній сумі кредитування.")
    } else {
        banks[indexOfElement] = bank
        localStorage.setItem('banks', JSON.stringify(banks))
        render()
        removeModal()

    }

}

// --------------------модалка расчета 
let monthlyPayment = ''
let endPayment = ''

function creatCalculator() {
    let banksCheck = JSON.parse(localStorage.getItem('banks'))
    if (!(banksCheck == '')) {
        console.log("nO")

        let calculator = document.createElement("div")
        calculator.className = 'calculator'
        calculator.innerHTML = `
    <div class="calculator__body">
            <div class="content">
                    <div class="container">
                    <button class="btn_close_calculator" type="button" onclick="removeCalculator()">X</button>
                        <header class="header_calculator__body">
                            <span class="header_title">Онлайн розрахунок кредиту</span>
                        </header>
                        <div class="container-main">
                            <div class="left">
                                <form action="javascript:mathCalculator()" id="calculatorBank_form" name="form" method="post" >
                                    <div class="sum">
                                        <div class="inputVal">
                                            <label for="form_sum" class="lable">Бажана сума</label>
                                            <object class="obj_input">
                                                <input id="form_sum" type="number"  name="sumVal" required="required" min="10" max="30000000"  value="${banksCheck[0].minCredit}" step="1">                                
                                                <span class="inputValSub">грн</span>
                                            </object>
                                        </div>
                                    </div>
                                    <div class="prepayment">
                                        <div class="inputVal">
                                            <label for="form_prepayment" class="lable">Ваш аванс</label>
                                            <object class="obj_input">
                                                <input id="form_prepayment" type="number"  name="prepaymenVal" required="required" min="1" max="3000000" value="${banksCheck[0].prepayment*banksCheck[0].minCredit/100}" step="any">                              
                                                <span class="inputValSub">грн</span>
                                            </object>
                                        </div>
                                    </div>
                                    <div class="creditTerm">
                                        <div class="inputVal">
                                            <label for="form_creditTerm" class="lable">Термін</label>
                                            <object class="obj_input">
                                                <input id="form_creditTerm" type="number"  name="prepaymenVal" required="required" min="1" max="300" value="1" step="1" >                            
                                                <span class="inputValSub">р.</span>
                                             </object>
                                        </div>
                                    </div>
                                    <div class="banks_choice">
                                        <select class="banks_choice_list" name="banks_choice_list">
                                        </select>
                                        <button class="calculate" type="submit" >Розрахувати</button>
                                    </div>
                                </form>
                            </div>
                            <div class="rigth">
                                <div class="pay">
                                    <span class="pay_title">Платіж за кредитом</span>
                                    <object class="obj_input_rigth">
                                    <input id="form_monthlyPayment" type="number"  name="monthlyPayment" required="required" min="100000" max="3000000" value="${monthlyPayment}" step="1" maxlength="7">                       
                                        <span>грн/м</span>
                                        </object>
                                </div>
                                <div class="creditRate">
                                    <span class="creditRate_title">Загальна вартість</span>
                                    <object class="obj_input_rigth">
                                    <input id="form_endPayment" type="number"  name="monthlyPayment" required="required" min="100000" max="3000000" value="${endPayment}" step="1" maxlength="7">                       
                                        <span>грн</span>
                                        </object>
                                </div>
                            </div>
                        </div>

                    </div>
            </div>


        </div>
    `
        document.body.append(calculator)
        createChoiceBank()
        mathCalculator()
    } else {
        alert("Необхідно створити банки внизу для скористанням функції 'Розрахувати'")
    }
}

function removeCalculator() {
    if (document.querySelector('.calculator')) {
        (document.querySelector('.calculator').remove())
    }
}

function createChoiceBank() {
    let arr = JSON.parse(localStorage.getItem('banks'))
    arr.forEach(element => {
        addOption(element.name, element.id)
    });
}

function addOption(name, id) {
    let form = document.forms.form;
    let parentList = form.banks_choice_list
    let option = new Option(name, id)
    parentList.append(option)
}

function mathCalculator() {
    let banksStore = JSON.parse(localStorage.getItem('banks'))
    banks = banksStore

    let dataId = document.querySelector('.banks_choice_list').value
    let find = banks.map(el => el.id)
    let indexOfElement = find.indexOf(Number(dataId))

    let sum = Number(document.getElementById('form_sum').value)
    let prepayment = Number(document.getElementById('form_prepayment').value)
    let creditTerm = Number(document.getElementById('form_creditTerm').value) * 12

    let percentage = banks[indexOfElement].percentage

    let paymentForServices = banks[indexOfElement].paymentForServices


    let maxSum = banks[indexOfElement].maxCredit
    let minSum = banks[indexOfElement].minCredit

    let bankTerm = banks[indexOfElement].term
        //прверка условий с банком и расчет
    if (sum < minSum || sum > maxSum) {
        alert("Бажана сума для обраного банку має бути від " + minSum + " до " + maxSum + " грн")
    } else {
        if (prepayment < sum * banks[indexOfElement].prepayment / 100 || prepayment > (sum * 65 / 100)) {
            alert("Аванс для обраного банку бути від " + (sum * banks[indexOfElement].prepayment / 100) + " до " + (sum * 65 / 100) + " грн")
        } else {
            if (creditTerm <= 0 || creditTerm > (bankTerm * 12)) {
                alert("Термін кредитування для обраного банку має бути від " + 1 + " до " + bankTerm + " років")
            } else {

                let p = percentage / 100 / 12
                sum = sum - prepayment + (sum * paymentForServices / 100)
                let pay = sum * (p + (p / (Math.pow(1 + p, creditTerm) - 1)))
                document.getElementById('form_monthlyPayment').value = Math.round(pay)
                document.getElementById('form_endPayment').value = Math.round((pay * creditTerm) + prepayment)

            }
        }
    }



}