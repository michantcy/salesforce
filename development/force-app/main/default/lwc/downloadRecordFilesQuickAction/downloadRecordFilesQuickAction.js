import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getRecordFilesIds from '@salesforce/apex/FilesController.getRecordFilesIds';  
import { NavigationMixin } from 'lightning/navigation';

export default class DownloadRecordFilesQuickAction extends NavigationMixin(LightningElement){
    @api recordId;
    @track fileIds = '';
    @api invoke() {
        getRecordFilesIds({recordId:this.recordId})
            .then(result => {                 
                if (result.length > 0) { 

                    result.forEach( item => {
                        this.fileIds += '/' + item
                    });

                    this[ NavigationMixin.Navigate ]( {
                        type: 'standard__webPage',
                        attributes: {
                            url: '/sfc/servlet.shepherd/version/download/' + this.fileIds
                        }
                    }, false );

                    this.showToast('Record Files Download',result.length + ' File(s) Downloaded in zip folder','success');
                }
                else{
                    this.showToast('Record Files Download','No files found to download!','info');
                }

            })
            .catch(error => {
                console.log('Files download error: ' + JSON.stringify(error));
                this.showToast('Record Files Download Failed',error.message,'error');
             })
    }

    showToast(title, message, variant, mode) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(evt);
    }
}