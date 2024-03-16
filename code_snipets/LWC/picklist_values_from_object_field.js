import { LightningElement, wire } from "lwc";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";

import OPPORTUNITY_OBJECT from "@salesforce/schema/Opportunity";
import OPPORTUNITY_STAGE_FIELD from "@salesforce/schema/Opportunity.StageName";

export default class UserLanguageSwitcher extends LightningElement {
    userRecordTypeId;
    languageOptions;
    value;

    @wire(getObjectInfo, { objectApiName: OPPORTUNITY_OBJECT })
    results({ error, data }) {
      if (data) {
        this.userRecordTypeId = data.defaultRecordTypeId;
        this.error = undefined;
      } else if (error) {
        this.error = error;
        this.userRecordTypeId = undefined;
      }
    }

    @wire(getPicklistValues, { recordTypeId: "$userRecordTypeId", fieldApiName: OPPORTUNITY_STAGE_FIELD })
    picklistResults({ error, data }) {
    if (data) {
      this.languageOptions = data.values;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.languageOptions = undefined;
    }
  }

    handleChange(event) {
        this.value = event.detail.value;
    }
}