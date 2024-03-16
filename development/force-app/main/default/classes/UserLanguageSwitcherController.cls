public with sharing class UserLanguageSwitcherController {
    @AuraEnabled
    public static Map<String,String> getAvailableLanguages(){
        try{
            Map<String, String> availableLanguagesMap = new Map<String, String>();
            for (PicklistEntry entry : User.LanguageLocaleKey.getDescribe().getPicklistValues()){
                availableLanguagesMap.put(entry.getValue(), entry.getLabel());
            }
    
            return availableLanguagesMap;
        }
        catch(Exception ex){
            System.debug(ex);
            throw new AuraHandledException('Could not retrieve available languages of the user: ' + ex.getMessage());
        }
    }

    @AuraEnabled
    public static void changeUserLanguage(string newLanguage){
        try{
            System.debug('Language: ' + newLanguage);
            if(Schema.SObjectType.User.isAccessible() && Schema.SObjectType.User.Fields.LanguageLocaleKey.isAccessible()){
                User currentUser = [SELECT LanguageLocaleKey FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1];
                if (currentUser.LanguageLocaleKey != newLanguage && Schema.SObjectType.User.isUpdateable()
                    && Schema.SObjectType.User.Fields.LanguageLocaleKey.isUpdateable()){
                       currentUser.LanguageLocaleKey = newLanguage;
                        update currentUser;
                } 
            }
        }
        catch(Exception ex){
            System.debug(ex);
            throw new AuraHandledException('Could not update user language: ' + ex.getMessage());
        }                            
    }
}