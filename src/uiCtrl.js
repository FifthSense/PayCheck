import {
    shiftsExport,
    werkgeversExport,
    dataMethodsExport
} from './dataCtrl';
let settingsVisibility = false;
let currentYearArray = shiftsExport.x2020;
let currentMonthIndex = 0;

const uiSelectors = {
    "mainUI": {
        "addCard": {
            "dateInput": document.querySelector('#dag'),
            "startUurInput": document.querySelector('.startuur'),
            "eindUurInput": document.querySelector('.einduur'),
            "werkgeverSelector": document.querySelector('#employerSelect'),
            "addBtn": document.querySelector('.addBtn'),
            "settingsBtn": document.querySelector('.settingsBtn'),
            "currentMonthOutput": document.querySelector('.monthOutput'),
            "warning": document.querySelector('.warning')
        },
        "settingsContainer": {
            "settingsContainer": document.querySelector('.settingsContainer'),
            "editEmployerNameInput": document.querySelector('.editEmployerName'),
            "editEmployerPayInput": document.querySelector('.editEmployerPay'),
            "submitEmployerEditBtn": document.querySelector('.submitEmployerEdit'),
            "addEmployerBtn": document.querySelector('.addEmployerBtn')
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
        uiSelectors.mainUI.addCard.addBtn.addEventListener('click', uiMethods.pushShiftToData);
        uiSelectors.mainUI.addCard.settingsBtn.addEventListener('click', uiMethods.toggleSettings);
        uiSelectors.mainUI.settingsContainer.submitEmployerEditBtn.addEventListener('click', uiMethods.editEmployer);
        uiSelectors.yearMonthSelection.yearSelection.addEventListener('change', uiMethods.changeYear);
        //Month-Changer
        uiSelectors.yearMonthSelection.monthSelection.januari.addEventListener('click', () => {
            uiMethods.changeMonthIndex(0);
        });
        uiSelectors.yearMonthSelection.monthSelection.februari.addEventListener('click', () => {
            uiMethods.changeMonthIndex(1);
        });
        uiSelectors.yearMonthSelection.monthSelection.maart.addEventListener('click', () => {
            uiMethods.changeMonthIndex(2);
        });
        uiSelectors.yearMonthSelection.monthSelection.april.addEventListener('click', () => {
            uiMethods.changeMonthIndex(3);
        });
        uiSelectors.yearMonthSelection.monthSelection.mei.addEventListener('click', () => {
            uiMethods.changeMonthIndex(4);
        });
        uiSelectors.yearMonthSelection.monthSelection.juni.addEventListener('click', () => {
            uiMethods.changeMonthIndex(5);
        });
        uiSelectors.yearMonthSelection.monthSelection.juli.addEventListener('click', () => {
            uiMethods.changeMonthIndex(6);
        });
        uiSelectors.yearMonthSelection.monthSelection.augustus.addEventListener('click', () => {
            uiMethods.changeMonthIndex(7);
        });
        uiSelectors.yearMonthSelection.monthSelection.september.addEventListener('click', () => {
            uiMethods.changeMonthIndex(8);
        });
        uiSelectors.yearMonthSelection.monthSelection.oktober.addEventListener('click', () => {
            uiMethods.changeMonthIndex(9);
        });
        uiSelectors.yearMonthSelection.monthSelection.november.addEventListener('click', () => {
            uiMethods.changeMonthIndex(10);
        });
        uiSelectors.yearMonthSelection.monthSelection.december.addEventListener('click', () => {
            uiMethods.changeMonthIndex(11);
        });
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
        werkgeversExport.forEach((werkgever)=>{
            html += `
            <option value="${werkgever.naam}">${werkgever.naam}</option>
            `
        });

        outputSelect.innerHTML = html;
    },
    //Shift Controls
    "pushShiftToData": () => {
        let date = uiSelectors.mainUI.addCard.dateInput.value;
        let startuur = uiSelectors.mainUI.addCard.startUurInput.value;
        let einduur = uiSelectors.mainUI.addCard.eindUurInput.value;
        let werkgever = uiMethods.getCurrentEmployer();

        dataMethodsExport.pushShiftToList(uiMethods.getCurrentMonthArray(currentMonthIndex), date, startuur, einduur, werkgever);
        uiMethods.displayShiftList();
    },
    "displayShiftList": () => {
        let output = "";
        uiMethods.getCurrentMonthArray(currentMonthIndex).forEach((shift) => {
            let startuur = dataMethodsExport.parseFloatToHourFormat(shift.startuur),
                einduur = dataMethodsExport.parseFloatToHourFormat(shift.einduur);
            let totalHours = parseFloat(shift.einduur) - parseFloat(shift.startuur);
            let totalPay = (totalHours * shift.werkgever.uurloon).toFixed(2);
            let title = `${shift.dag} Juli - ${shift.werkgever.naam}`;
            output += `
            <li>
                <div class="card card-body mt-5">
                    <div class="row">
                    <div class="col-8">
                        <h3 class="card-title">${title}</h3>
                        <p>${startuur} - ${einduur}</p>
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
                    </div>
                    </div>
                </div>
            </li>`
        });

        uiSelectors.mainUI.shiftOutput.innerHTML = output;
    },
    //Date Controls
    "getCurrentMonthArray": (monthIndex) => {
        let currentMonthArray = currentYearArray[monthIndex];
        return currentMonthArray;
    },
    "changeMonthIndex": (newMonthIndex) => {
        currentMonthIndex = newMonthIndex;
        uiMethods.displayShiftList();
    },
    "changeYear": () => {
        const selectedYear = uiSelectors.yearMonthSelection.yearSelection.value;
        if(selectedYear === "2020"){
            currentYearArray = shiftsExport.x2020;
        } else if(selectedYear === "2021"){
            currentYearArray = shiftsExport.x2021;
        } else if(selectedYear === "2022"){
            currentYearArray = shiftsExport.x2022;
        } else if(selectedYear === "2023"){
            currentYearArray = shiftsExport.x2023;
        } else if(selectedYear === "2024"){
            currentYearArray = shiftsExport.x2024;
        } else if(selectedYear === "2025"){
            currentYearArray = shiftsExport.x2025;
        } else if(selectedYear === "2026"){
            currentYearArray = shiftsExport.x2026;
        } else if(selectedYear === "2027"){
            currentYearArray = shiftsExport.x2027;
        }
        uiMethods.displayShiftList();
    }
}

export const uiMethodsExport = uiMethods;