import { LightningElement } from 'lwc';
import { generateUrl } from "lightning/fileDownload";
import { NavigationMixin } from 'lightning/navigation';

export default class HelloWorld extends NavigationMixin(LightningElement){
  greeting = 'World';
  comboboxValue = 'inProgress';

    get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
        ];
    }

    changeHandler(event) {
      this.greeting = event.target.value;
    }

    handleComboboxChange(event) {
      this.comboboxValue = event.detail.value;
  }

  navigateToWebPage() {
    try {
      this.downloadfile('0687S00000HONEXQA5');
      // window.open('https://creative-impala-uz676h-dev-ed.trailblaze.lightning.force.com/sfc/servlet.shepherd/version/download/0687S00000HONJIQA5');

    //   this[NavigationMixin.Navigate]({
    //     "type": "standard__objectPage",
    //     "attributes": {
    //         "objectApiName": "Account",
    //         "actionName": "home"
    //     }
    // });

  //   this[NavigationMixin.Navigate]({
  //     type: 'standard__webPage',
  //     attributes: {
  //         url: '/sfc/servlet.shepherd/version/download/0687S00000HONEmQAP'
  //     }
  // }, false);

    } catch (error) {
        console.error('Error navigating to web page:', error);
        console.log('Error JSON: ' + JSON.stringify(error));
    }
  }

  
  downloadfile(recordToDownloadId){
    this.url = generateUrl(recordToDownloadId);
    // Open the generated URL in a new tab
    window.open(this.url);
  }

}