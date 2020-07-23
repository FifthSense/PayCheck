import {uiMethodsExport} from './uiCtrl'

function init(){
    uiMethodsExport.loadEventListeners();
    uiMethodsExport.populateEmployerSelection();
    uiMethodsExport.displayShiftList();
}

init();
