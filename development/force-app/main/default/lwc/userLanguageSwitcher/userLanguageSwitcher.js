import { LightningElement, wire } from "lwc";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAvailableLanguages from '@salesforce/apex/UserLanguageSwitcherController.getAvailableLanguages'; 
import changeUserLanguage from '@salesforce/apex/UserLanguageSwitcherController.changeUserLanguage';

export default class UserLanguageSwitcher extends LightningElement {
    languageOptions;
    selectedValue;
    isButtonDisabled = true;

    connectedCallback() {
        // Call the Apex method to fetch available languages
        getAvailableLanguages()
            .then(result => {
                // Process the result (assuming result is a map<string,string>)
                this.languageOptions = Object.keys(result).map(key => ({ label: result[key], value: key }));
            })
            .catch(error => {
                // Handle errors
                this.showToast('Error fetching available languages',error.message,'fail');
                console.error('Error fetching available languages:', error);
            });
    }


    handleSelectedLanguageChange(event) {        
        this.selectedValue = event.detail.value;                
        if(this.selectedValue != null || this.selectedValue != undefined){
            this.isButtonDisabled = false;
        }
        else{
            this.isButtonDisabled = true;
        }
    }

    changeLanguageButtonClick(){
        // Call the Apex method to fetch available languages
        changeUserLanguage({newLanguage:this.selectedValue})
            .then(result => {
                this.showToast('Language Changed!','','success');
                this.isButtonDisabled = true;
                window.location.reload();
            })
            .catch(error => {
                // Handle errors
                this.showToast('Error updating user language',error.message,'fail');
                console.error('Error updating user language:', JSON.stringify(error));
            });   
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(evt);
    }
}