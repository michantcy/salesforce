import { LightningElement, wire } from "lwc";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAvailableLanguages from '@salesforce/apex/UserLanguageSwitcherController.GetAvailableLanguages'; 

export default class UserLanguageSwitcher extends LightningElement {
    languageOptions;
    value;

    connectedCallback() {
        // Call the Apex method to fetch available languages
        getAvailableLanguages()
            .then(result => {
                // Process the result (assuming result is a map<string,string>)
                this.languageOptions = Object.keys(result).map(key => ({ label: result[key], value: key }));
            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching available languages:', error);
            });
    }


    handleSelectedLanguageChange(event) {
        this.value = event.detail.value;
                
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