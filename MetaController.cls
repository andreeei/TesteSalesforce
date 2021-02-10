public class MetaController {
    
    class WrapperClass{
        @AuraEnabled public List<AccountWrapper> listAccountWrapper;
        
        public WrapperClass(List<Account> listAccount){
            this.listAccountWrapper = new list<AccountWrapper>();
            
            for(Account acc : listAccount){
                listAccountWrapper.add(new AccountWrapper(acc));
            }
        }
    }
    
    class AccountWrapper{
        @AuraEnabled public string id;
        @AuraEnabled public string name;
        @AuraEnabled public decimal meta;
        
        public AccountWrapper(Account acc){
            this.id = acc.Id;
            this.name = acc.Name;
            this.meta = acc.Meta_de_Volume__c;
        }
    }
    
    @AuraEnabled
    public static Map<String, Object> getAccountsWithoutMeta(){
        List<Account> listAccount = [select id, name, Meta_de_Volume__c from Account where Meta_de_Volume__c = null];
        system.debug('list Account: '+listAccount);
        WrapperClass wrapperClass = new WrapperClass(listAccount);
        System.debug('Wrapper Class: '+wrapperClass);
        Map<String, Object> response = new Map<String, Object>();
        response.put('status', 'Sucesso');
        response.put('data', wrapperClass);
        return response;
    }
    
    @AuraEnabled
    public static Map<String, Object> updateAccountWithNewMeta(List<Account> accountList){
        
        update accountList;
        
        Map<String, Object> response = getAccountsWithoutMeta();
        response.put('message','Nova Meta Cadastrada para o Cliente ' + accountList[0].Name);
        return response;
    }
}