import {
    shiftsExport,
    werkgeversExport,
    dataMethodsExport
} from './dataCtrl';

let settingsVisibility = false;
let addEmployerContainerVisibility = false;
let currentYearArray = shiftsExport.x2020;
let currentMonthIndex = 0;
let shiftToEditID;

const uiSelectors = {
    "mainUI": {
        "addCard": {
            "dateInput": document.querySelector('#dag'),
            "startUurInput": document.querySelector('.startuur'),
            "eindUurInput": document.querySelector('.einduur'),
            "werkgeverSelector": document.querySelector('#employerSelect'),
            "addBtn": document.querySelector('.addBtn'),
            "editBtn": document.querySelector('.editBtn'),
            "backBtn": document.querySelector('.backBtn'),
            "settingsBtn": document.querySelector('.settingsBtn'),
            "addEmployerBtn": document.querySelector('.addEmployerBtn'),
            "addEmployerBackBtn": document.querySelector('.addEmployerBackBtn'),
            "currentMonthOutput": document.querySelector('.monthOutput'),
            "currentYearOutput": document.querySelector('.yearOutput'),
            "warning": document.querySelector('.warning')
        },
        "settingsContainer": {
            "settingsContainer": document.querySelector('.settingsContainer'),
            "editEmployerNameInput": document.querySelector('.editEmployerName'),
            "editEmployerPayInput": document.querySelector('.editEmployerPay'),
            "submitEmployerEditBtn": document.querySelector('.submitEmployerEdit'),
        },
        "addEmployerContainer": {
            "addEmployerContainer": document.querySelector('.addEmployerContainer'),
            "addEmployerNameInput": document.querySelector('.addEmployerName'),
            "addEmployerPayInput": document.querySelector('.addEmployerPay'),
            "addEmployerSubmit": document.querySelector('.addEmployerSubmit'),

        },
        "shiftOutput": document.querySelector('.shiftOutput')
    },
    "yearMonthSelection": {
        "yearSelection": document.querySelector('.yearSelect'),
        "monthSelection": {
            "januari": document.querySelector('.jan'),
            "februari": document.querySelector('.feb'),
            "maart": document.querySelector('.maa'),
            "april": document.querySelector('.apr'),
            "mei": document.querySelector('.mei'),
            "juni": document.querySelector('.jun'),
            "juli": document.querySelector('.jul'),
            "augustus": document.querySelector('.aug'),
            "september": document.querySelector('.sep'),
            "oktober": document.querySelector('.okt'),
            "november": document.querySelector('.nov'),
            "december": document.querySelector('.dec')
        }
    }
}
const uiMethods = {
    "loadEventListeners": () => {
        document.addEventListener('DOMContentLoaded', uiMethods.insertCurrentMonth);
        document.addEventListener('DOMContentLoaded', uiMethods.insertCurrentYear);
        uiSelectors.mainUI.addCard.addBtn.addEventListener('click', uiMethods.pushShiftToData);
        uiSelectors.mainUI.addCard.backBtn.addEventListener('click', uiMethods.leaveEditState);
        uiSelectors.mainUI.addCard.editBtn.addEventListener('click', uiMethods.editShift);
        uiSelectors.mainUI.addCard.settingsBtn.addEventListener('click', uiMethods.toggleSettings);
        uiSelectors.mainUI.addCard.addEmployerBtn.addEventListener('click', uiMethods.toggleAddEmployerContainer);
        uiSelectors.mainUI.addCard.addEmployerBackBtn.addEventListener('click', uiMethods.toggleAddEmployerContainer);
        uiSelectors.mainUI.settingsContainer.submitEmployerEditBtn.addEventListener('click', uiMethods.editEmployer);
        uiSelectors.mainUI.addEmployerContainer.addEmployerSubmit.addEventListener('click', uiMethods.addEmployer);
        uiSelectors.yearMonthSelection.yearSelection.addEventListener('change', uiMethods.changeYear);
        uiSelectors.mainUI.shiftOutput.addEventListener('click', uiMethods.enterEditState);
        uiSelectors.mainUI.shiftOutput.addEventListener('click', uiMethods.deleteShift);

        //Month-Changer
        uiSelectors.yearMonthSelection.monthSelection.januari.addEventListener('click', () => {
            uiMethods.changeMonthIndex(0);
            uiMethods.changeActiveMonthIndicator();
        });
        uiSelectors.yearMonthSelection.monthSelection.februari.addEventListener('click', () => {
            uiMethods.changeMonthIndex(1);
            uiMethods.changeActiveMonthIndicator();
        });
        uiSelectors.yearMonthSelection.monthSelection.maart.addEventListener('click', () => {
            uiMethods.changeMonthIndex(2);
            uiMethods.changeActiveMonthIndicator();
        });
        uiSelectors.yearMonthSelection.monthSelection.april.addEventListener('click', () => {
            uiMethods.changeMonthIndex(3);
            uiMethods.changeActiveMonthIndicator();
        });
        uiSelectors.yearMonthSelection.monthSelection.mei.addEventListener('click', () => {
            uiMethods.changeMonthIndex(4);
            uiMethods.changeActiveMonthIndicator();
        });
        uiSelectors.yearMonthSelection.monthSelection.juni.addEventListener('click', () => {
            uiMethods.changeMonthIndex(5);
            uiMethods.changeActiveMonthIndicator();
        });
        uiSelectors.yearMonthSelection.monthSelection.juli.addEventListener('click', () => {
            uiMethods.changeMonthIndex(6);
            uiMethods.changeActiveMonthIndicator();
        });
        uiSelectors.yearMonthSelection.monthSelection.augustus.addEventListener('click', () => {
            uiMethods.changeMonthIndex(7);
            uiMethods.changeActiveMonthIndicator();
        });
        uiSelectors.yearMonthSelection.monthSelection.september.addEventListener('click', () => {
            uiMethods.changeMonthIndex(8);
            uiMethods.changeActiveMonthIndicator();
        });
        uiSelectors.yearMonthSelection.monthSelection.oktober.addEventListener('click', () => {
            uiMethods.changeMonthIndex(9);
            uiMethods.changeActiveMonthIndicator();
        });
        uiSelectors.yearMonthSelection.monthSelection.november.addEventListener('click', () => {
            uiMethods.changeMonthIndex(10);
            uiMethods.changeActiveMonthIndicator();
        });
        uiSelectors.yearMonthSelection.monthSelection.december.addEventListener('click', () => {
            uiMethods.changeMonthIndex(11);
            uiMethods.changeActiveMonthIndicator();
        });
    },
    "enterEditState": (e) => {
        if (e.target.classList.contains('fa-pencil')) {
            uiSelectors.mainUI.addCard.addBtn.style.display = "none";
            uiSelectors.mainUI.addCard.editBtn.style.display = "inline";
            uiSelectors.mainUI.addCard.backBtn.style.display = "inline";

            let shiftdate = parseInt(e.target.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.firstChild.innerText);
            let shiftstart = dataMethodsExport.parseHourToFloatFormat(e.target.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.nextElementSibling.firstElementChild.innerText);
            let shiftend = dataMethodsExport.parseHourToFloatFormat(e.target.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerText);
            //Store ID of targeted shift in the designated variable
            shiftToEditID = e.target.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerText;

            uiSelectors.mainUI.addCard.dateInput.value = shiftdate;
            uiSelectors.mainUI.addCard.startUurInput.value = shiftstart;
            uiSelectors.mainUI.addCard.eindUurInput.value = shiftend;
        }
    },
    "leaveEditState": () => {
        uiSelectors.mainUI.addCard.addBtn.style.display = "inline";
        uiSelectors.mainUI.addCard.editBtn.style.display = "none";
        uiSelectors.mainUI.addCard.backBtn.style.display = "none";

        uiMethods.resetInputValues();
    },
    "toggleSettings": () => {
        if (settingsVisibility === false) {
            settingsVisibility = true;
        } else if (settingsVisibility === true) {
            settingsVisibility = false;
        }
        if (settingsVisibility === true) {
            uiSelectors.mainUI.settingsContainer.settingsContainer.style.display = 'block';
        } else if (settingsVisibility === false) {
            uiSelectors.mainUI.settingsContainer.settingsContainer.style.display = 'none';
        }
        uiMethods.pushCurrentEmployerToSettingsForm();
    },
    "toggleAddEmployerContainer": () => {
        if (addEmployerContainerVisibility === false) {
            addEmployerContainerVisibility = true;
        } else if (addEmployerContainerVisibility === true) {
            addEmployerContainerVisibility = false;
        }
        if (addEmployerContainerVisibility === true) {
            uiSelectors.mainUI.addEmployerContainer.addEmployerContainer.style.display = 'block';
            uiSelectors.mainUI.addCard.addEmployerBackBtn.style.display = "block";
            uiSelectors.mainUI.addCard.addEmployerBtn.style.display = "none";
        } else if (addEmployerContainerVisibility === false) {
            uiSelectors.mainUI.addEmployerContainer.addEmployerContainer.style.display = 'none';
            uiSelectors.mainUI.addCard.addEmployerBackBtn.style.display = "none";
            uiSelectors.mainUI.addCard.addEmployerBtn.style.display = "block";
        }
    },
    "resetInputValues": () => {
        uiSelectors.mainUI.addCard.dateInput.value = "1";
        uiSelectors.mainUI.addCard.startUurInput.value = "24.00";
        uiSelectors.mainUI.addCard.eindUurInput.value = "24.00";
    },
    //Employer Controls
    "editEmployer": () => {
        let currentEmployer = uiMethods.getCurrentEmployer();
        currentEmployer.naam = uiSelectors.mainUI.settingsContainer.editEmployerNameInput.value;
        currentEmployer.uurloon = uiSelectors.mainUI.settingsContainer.editEmployerPayInput.value;

        uiMethods.populateEmployerSelection();
        uiMethods.toggleSettings();
        uiMethods.displayShiftList();
    },
    "getCurrentEmployer": () => {
        let currentWerkgever;
        werkgeversExport.forEach((werkgever) => {
            if (werkgever.naam === uiSelectors.mainUI.addCard.werkgeverSelector.value) {
                currentWerkgever = werkgever;
            }
        })
        return currentWerkgever;
    },
    "pushCurrentEmployerToSettingsForm": () => {
        uiSelectors.mainUI.settingsContainer.editEmployerNameInput.value = uiMethods.getCurrentEmployer().naam;
        uiSelectors.mainUI.settingsContainer.editEmployerPayInput.value = uiMethods.getCurrentEmployer().uurloon;
    },
    "populateEmployerSelection": () => {
        const outputSelect = uiSelectors.mainUI.addCard.werkgeverSelector;
        let html = "";
        werkgeversExport.forEach((werkgever) => {
            html += `
            <option value="${werkgever.naam}">${werkgever.naam}</option>
            `
        });

        outputSelect.innerHTML = html;
    },
    "addEmployer": () => {
        let name = uiSelectors.mainUI.addEmployerContainer.addEmployerNameInput.value;
        let pay = uiSelectors.mainUI.addEmployerContainer.addEmployerPayInput.value;
        dataMethodsExport.pushEmployerToList(name, pay);
        uiSelectors.mainUI.addEmployerContainer.addEmployerNameInput.value = "";
        uiSelectors.mainUI.addEmployerContainer.addEmployerPayInput.value = "";
        uiMethods.populateEmployerSelection();
    },
    //Shift Controls
    "pushShiftToData": () => {
        if(uiMethods.getCurrentEmployer()){
        let date = uiSelectors.mainUI.addCard.dateInput.value;
        let startuur = uiSelectors.mainUI.addCard.startUurInput.value;
        let einduur = uiSelectors.mainUI.addCard.eindUurInput.value;
        let werkgever = uiMethods.getCurrentEmployer();
        let id = dataMethodsExport.getCurrentShiftID();
        dataMethodsExport.iterateCurrentShiftID();

        dataMethodsExport.pushShiftToList(uiMethods.getCurrentMonthArray(currentMonthIndex), date, startuur, einduur, werkgever, id);
        uiMethods.displayShiftList();
        uiMethods.resetInputValues();
        }else {
            uiSelectors.mainUI.addCard.warning.style.display = "block";
            window.setTimeout(()=>{
                uiSelectors.mainUI.addCard.warning.style.display = "none";
            },2500);
        }
    },
    "displayShiftList": () => {
        let output = "";
        uiMethods.getCurrentMonthArray(currentMonthIndex).forEach((shift) => {
            let startuur = dataMethodsExport.parseFloatToHourFormat(shift.startuur),
                einduur = dataMethodsExport.parseFloatToHourFormat(shift.einduur);
            let totalHours = parseFloat(shift.einduur) - parseFloat(shift.startuur);
            let totalPay = (totalHours * shift.werkgever.uurloon).toFixed(2);
            output += `
            <li>
                <div class="card card-body mt-5">
                    <div class="row">
                    <div class="col-8">
                        <h3 class="card-title"><span>${shift.dag}</span><span> ${uiMethods.getCurrentMonth()} ${uiSelectors.yearMonthSelection.yearSelection.value} - ${shift.werkgever.naam}</span></h3>
                        <p><span>${startuur}</span> - <span>${einduur}</span></p>
                    </div>
                    <div class="col-4">
                        <div class="cardIcons">
                            <a href="#"><i class="fa fa-pencil"></i></a>
                            <a href="#"><i class="fa fa-remove"></i></a>
                        </div>
                        <div class="dailyHours">
                            <p>${totalHours} Uren</p>
                        </div>
                        <div class="dailyPay">
                            <p>${totalPay} Euro</p>
                        </div>
                        <div class="shiftID">${shift.id}</div>
                    </div>
                    </div>
                </div>
            </li>`
        });

        uiSelectors.mainUI.shiftOutput.innerHTML = output;
    },
    "editShift": () => {
        uiMethods.getCurrentMonthArray(currentMonthIndex).forEach((shift) => {
            if (parseInt(shiftToEditID) === shift.id) {
                shift.dag = uiSelectors.mainUI.addCard.dateInput.value;
                shift.startuur = uiSelectors.mainUI.addCard.startUurInput.value;
                shift.einduur = uiSelectors.mainUI.addCard.eindUurInput.value;
                shift.werkgever = uiMethods.getCurrentEmployer();
                console.log(shift);
                uiMethods.resetInputValues();
            }
        });
        uiMethods.displayShiftList();
        uiMethods.leaveEditState();
    },
    "deleteShift": (e) => {
        let shiftToDeleteID = parseInt(e.target.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerText);
        if(e.target.classList.contains('fa-remove')){
            uiMethods.getCurrentMonthArray(currentMonthIndex).forEach((shift)=>{
                if(shift.id === shiftToDeleteID){
                    let shiftIndex = uiMethods.getCurrentMonthArray(currentMonthIndex).findIndex(i => i.id === shiftToDeleteID);
                    uiMethods.getCurrentMonthArray(currentMonthIndex).splice(shiftIndex, shiftIndex >= 0 ? 1 : 0);
                }
            });
            uiMethods.displayShiftList();
        }
    },
    //Date Controls
    "getCurrentMonth": () => {
        let currentMonth;
        if (currentMonthIndex === 0) {
            currentMonth = "januari";
        } else if (currentMonthIndex === 1) {
            currentMonth = "februari";
        } else if (currentMonthIndex === 2) {
            currentMonth = "maart";
        } else if (currentMonthIndex === 3) {
            currentMonth = "april";
        } else if (currentMonthIndex === 4) {
            currentMonth = "mei";
        } else if (currentMonthIndex === 5) {
            currentMonth = "juni";
        } else if (currentMonthIndex === 6) {
            currentMonth = "juli";
        } else if (currentMonthIndex === 7) {
            currentMonth = "augustus";
        } else if (currentMonthIndex === 8) {
            currentMonth = "september";
        } else if (currentMonthIndex === 9) {
            currentMonth = "oktober";
        } else if (currentMonthIndex === 10) {
            currentMonth = "november";
        } else if (currentMonthIndex === 11) {
            currentMonth = "december";
        }
        return currentMonth;
    },
    "getCurrentMonthArray": (monthIndex) => {
        let currentMonthArray = currentYearArray[monthIndex];
        return currentMonthArray;
    },
    "changeMonthIndex": (newMonthIndex) => {
        currentMonthIndex = newMonthIndex;
        uiMethods.displayShiftList();
        uiMethods.insertCurrentMonth();
    },
    "changeYear": () => {
        const selectedYear = uiSelectors.yearMonthSelection.yearSelection.value;
        if (selectedYear === "2020") {
            currentYearArray = shiftsExport.x2020;
        } else if (selectedYear === "2021") {
            currentYearArray = shiftsExport.x2021;
        } else if (selectedYear === "2022") {
            currentYearArray = shiftsExport.x2022;
        } else if (selectedYear === "2023") {
            currentYearArray = shiftsExport.x2023;
        } else if (selectedYear === "2024") {
            currentYearArray = shiftsExport.x2024;
        } else if (selectedYear === "2025") {
            currentYearArray = shiftsExport.x2025;
        } else if (selectedYear === "2026") {
            currentYearArray = shiftsExport.x2026;
        } else if (selectedYear === "2027") {
            currentYearArray = shiftsExport.x2027;
        }
        uiMethods.displayShiftList();
        uiMethods.insertCurrentYear();
    },
    "changeActiveMonthIndicator": () => {
        if (currentMonthIndex === 0) {
            uiSelectors.yearMonthSelection.monthSelection.januari.id = "active";
            uiSelectors.yearMonthSelection.monthSelection.februari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.maart.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.april.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.mei.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juni.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juli.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.augustus.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.september.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.oktober.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.november.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.december.removeAttribute('id');
        } else if (currentMonthIndex === 1) {
            uiSelectors.yearMonthSelection.monthSelection.januari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.februari.id = "active";
            uiSelectors.yearMonthSelection.monthSelection.maart.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.april.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.mei.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juni.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juli.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.augustus.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.september.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.oktober.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.november.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.december.removeAttribute('id');
        } else if (currentMonthIndex === 2) {
            uiSelectors.yearMonthSelection.monthSelection.januari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.februari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.maart.id = "active";
            uiSelectors.yearMonthSelection.monthSelection.april.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.mei.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juni.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juli.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.augustus.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.september.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.oktober.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.november.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.december.removeAttribute('id');
        } else if (currentMonthIndex === 3) {
            uiSelectors.yearMonthSelection.monthSelection.januari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.februari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.maart.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.april.id = "active";
            uiSelectors.yearMonthSelection.monthSelection.mei.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juni.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juli.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.augustus.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.september.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.oktober.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.november.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.december.removeAttribute('id');
        } else if (currentMonthIndex === 4) {
            uiSelectors.yearMonthSelection.monthSelection.januari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.februari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.maart.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.april.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.mei.id = "active";
            uiSelectors.yearMonthSelection.monthSelection.juni.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juli.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.augustus.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.september.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.oktober.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.november.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.december.removeAttribute('id');
        } else if (currentMonthIndex === 5) {
            uiSelectors.yearMonthSelection.monthSelection.januari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.februari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.maart.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.april.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.mei.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juni.id = "active";
            uiSelectors.yearMonthSelection.monthSelection.juli.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.augustus.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.september.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.oktober.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.november.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.december.removeAttribute('id');
        } else if (currentMonthIndex === 6) {
            uiSelectors.yearMonthSelection.monthSelection.januari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.februari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.maart.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.april.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.mei.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juni.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juli.id = "active";
            uiSelectors.yearMonthSelection.monthSelection.augustus.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.september.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.oktober.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.november.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.december.removeAttribute('id');
        } else if (currentMonthIndex === 7) {
            uiSelectors.yearMonthSelection.monthSelection.januari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.februari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.maart.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.april.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.mei.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juni.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juli.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.augustus.id = "active";
            uiSelectors.yearMonthSelection.monthSelection.september.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.oktober.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.november.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.december.removeAttribute('id');
        } else if (currentMonthIndex === 8) {
            uiSelectors.yearMonthSelection.monthSelection.januari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.februari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.maart.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.april.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.mei.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juni.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juli.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.augustus.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.september.id = "active";
            uiSelectors.yearMonthSelection.monthSelection.oktober.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.november.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.december.removeAttribute('id');
        } else if (currentMonthIndex === 9) {
            uiSelectors.yearMonthSelection.monthSelection.januari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.februari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.maart.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.april.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.mei.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juni.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juli.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.augustus.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.september.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.oktober.id = "active";
            uiSelectors.yearMonthSelection.monthSelection.november.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.december.removeAttribute('id');
        } else if (currentMonthIndex === 10) {
            uiSelectors.yearMonthSelection.monthSelection.januari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.februari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.maart.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.april.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.mei.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juni.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juli.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.augustus.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.september.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.oktober.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.november.id = "active";
            uiSelectors.yearMonthSelection.monthSelection.december.removeAttribute('id');
        } else if (currentMonthIndex === 11) {
            uiSelectors.yearMonthSelection.monthSelection.januari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.februari.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.maart.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.april.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.mei.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juni.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.juli.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.augustus.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.september.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.oktober.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.november.removeAttribute('id');
            uiSelectors.yearMonthSelection.monthSelection.december.id = "active";
        }
    },
    "insertCurrentMonth": () => {
        uiSelectors.mainUI.addCard.currentMonthOutput.innerHTML = uiMethods.getCurrentMonth();
    },
    "insertCurrentYear": () => {
        uiSelectors.mainUI.addCard.currentYearOutput.innerHTML = uiSelectors.yearMonthSelection.yearSelection.value;
    }
}

export const uiMethodsExport = uiMethods;