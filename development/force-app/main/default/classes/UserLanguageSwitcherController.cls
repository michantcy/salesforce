public with sharing class UserLanguageSwitcherController {
    @AuraEnabled
    public static Map<String,String> GetAvailableLanguages(){
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
    public static void ChangeUserLanguage(string newLanguage){
        try{

        }
        catch(Exception ex){
            System.debug(ex);
            throw new AuraHandledException('Could not update user language: ' + ex.getMessage());
        }                            
    }
}