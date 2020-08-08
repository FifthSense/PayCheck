import {
    uiMethodsExport,
    currentYearArrayExport,
    currentMonthIndexExport
} from './uiCtrl';

const storageMethods = {
    "getShifts":()=>{
        let shifts;
        if(localStorage.getItem('shifts') === null){
            shifts = {
                x2020: [
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ],
                x2021: [
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ],
                x2022: [
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ],
                x2023: [
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ],
                x2024: [
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ],
                x2025: [
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ],
                x2026: [
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ],
                x2027: [
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ]
            };
        } else {
            shifts = JSON.parse(localStorage.getItem('shifts'));
        }
        return shifts;
    },
    "storeShift":(shift)=>{
        let shifts = Object.entries(storageMethods.getShifts());
        shifts.forEach((year)=>{
            if(year[0] === uiMethodsExport.getClippedCurrentYearArray()){
                year[1][currentMonthIndexExport].push(shift);
            }
        });
        shifts = Object.fromEntries(shifts);
        shifts = JSON.stringify(shifts);
        localStorage.setItem('shifts', shifts);
    },
    "deleteShift":(id)=>{
        let shifts = Object.entries(storageMethods.getShifts());
        shifts.forEach((year)=>{
            if(year[0] === uiMethodsExport.getClippedCurrentYearArray()){
                year[1][currentMonthIndexExport].forEach((shift)=>{
                        let shiftIndex = year[1][currentMonthIndexExport].findIndex(i => i.id === id);
                        year[1][currentMonthIndexExport].splice(shiftIndex, shiftIndex >= 0 ? 1 : 0);
                });
            }
        });
        shifts = Object.fromEntries(shifts);
        shifts = JSON.stringify(shifts);
        localStorage.setItem('shifts', shifts);
    },
    "editShift":(shiftToEdit)=>{
        let shifts = Object.entries(storageMethods.getShifts());
        shifts.forEach((year)=>{
            if(year[0] === uiMethodsExport.getClippedCurrentYearArray()){
                year[1][currentMonthIndexExport].forEach((shift)=>{
                        let shiftIndex = year[1][currentMonthIndexExport].findIndex(i => i.id === shiftToEdit.id);
                        year[1][currentMonthIndexExport].splice(shiftIndex, shiftIndex >= 0 ? 1 : 0);
                        year[1][currentMonthIndexExport].push(shiftToEdit);
                });
            }
        });

        shifts = Object.fromEntries(shifts);
        shifts = JSON.stringify(shifts);
        localStorage.setItem('shifts', shifts);
    },
    "getCurrentShiftID":()=>{
        let currentShiftID;
        if(localStorage.getItem('nextShiftID') === null){
            currentShiftID = 1;
        } else {
            currentShiftID = localStorage.getItem('nextShiftID');
        }
        return currentShiftID;
    },
    "setCurrentShiftID":(id)=>{
        localStorage.setItem('nextShiftID', id);
    },
    "getWerkgevers":()=>{
        let werkgevers;
        if(localStorage.getItem('werkgevers') === null){
            werkgevers = [];
        } else {
            werkgevers = JSON.parse(localStorage.getItem('werkgevers'));
        }
        return werkgevers;
    },
    "storeEmployer":(employer)=>{
        let employers = storageMethods.getWerkgevers();
        employers.push(employer);
        employers = JSON.stringify(employers);
        localStorage.setItem('werkgevers', employers);
    },
    "editEmployer":(employer)=>{
        let currentShiftID;
        if(localStorage.getItem('nextShiftID') === null){
            currentShiftID = 1;
        } else {
            currentShiftID = localStorage.getItem('nextShiftID');
        }
        return currentShiftID;
    },
    "getCurrentEmployerID":(employer)=>{
        let currentShiftID;
        if(localStorage.getItem('nextEmployerID') === null){
            currentShiftID = 1;
        } else {
            currentShiftID = localStorage.getItem('nextEmployerID');
        }
        return currentShiftID;
    },
    "setCurrentEmployerID":(id)=>{
        localStorage.setItem('nextEmployerID', id);
    }
}

export const storageMethodsExport = storageMethods;