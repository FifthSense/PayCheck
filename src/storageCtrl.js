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
    "getCurrentShiftID":()=>{
        let currentShiftID;
        if(localStorage.getItem('currentShiftID') === null){
            currentShiftID = 1;
        } else {
            currentShiftID = JSON.parse(localStorage.getItem('currentShiftID'));
        }
        return currentShiftID;
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
    "storeEmployer":(employer)=>{
        let employers = storageMethods.getWerkgevers();
        employers.push(employer);
        employers = JSON.stringify(employers);
        localStorage.setItem('werkgevers', employers);
    },
    "deleteshift":(id)=>{
        let shifts = Object.entries(storageMethods.getShifts());
        shifts.forEach((year)=>{
            if(year[0] === uiMethodsExport.getClippedCurrentYearArray()){
                year[1][currentMonthIndexExport].forEach((shift)=>{
                    if(shift.id = id){
                        let shiftIndex = year[1][currentMonthIndexExport].findIndex(i => i.id === id);
                        year[1][currentMonthIndexExport].splice(shiftIndex, shiftIndex >= 0 ? 1 : 0);
                    }
                });
            }
        });
        shifts = Object.fromEntries(shifts);
        shifts = JSON.stringify(shifts);
        localStorage.setItem('shifts', shifts);
    }
}

export const storageMethodsExport = storageMethods;