public with sharing class FilesController {
    @AuraEnabled    
    public static List <Id> getRecordFilesIds(string recordId){
        List < Id > recordFielsIds = new List < Id >();

        for ( ContentDocumentLink cdl: [SELECT ContentDocument.LatestPublishedVersionId 
        FROM ContentDocumentLink 
        WHERE LinkedEntityId =: recordId] ) {
            recordFielsIds.add( cdl.ContentDocument.LatestPublishedVersionId );
        }

        return recordFielsIds; 
    }
}