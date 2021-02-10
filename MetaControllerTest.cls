@isTest
public class MetaControllerTest {
    
    @testSetup
    static void makeData(){
        Account acc = new Account(Name = 'teste');
        
        insert acc;
    }
    
    @isTest
    static void getAccountsWithoutMeta(){
        List<Account> accList = [SELECT Id FROM Account];
        Test.startTest();
        	Map<String, Object> response =  MetaController.getAccountsWithoutMeta();
        	System.assert(response.get('status') == 'Sucesso');
        Test.stopTest();
    }
    
    @isTest
    static void updateAccountWithNewMeta(){
        
		List<Account> accList = [SELECT Id, Name FROM Account];
		Test.startTest();
        	Map<String, Object> response =  MetaController.updateAccountWithNewMeta(accList);
        	System.assert(response.get('status') == 'Sucesso');
        Test.stopTest();        
    }
}