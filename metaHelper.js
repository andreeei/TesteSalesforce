({
	getAccountsWithoutMeta : function(component, event, helper) {
		let action = component.get("c.getAccountsWithoutMeta"); 
        console.log(action);
        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, $A.getCallback(function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                let retorno = response.getReturnValue();
                component.set("v.data", retorno.data.listAccountWrapper);
                
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                let errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        }));
        $A.enqueueAction(action);
	},
    
    updateMetaAccount : function(component, event, helper, row){
        let id = row.id;
        let draftValues = component.get("v.draftValues");
        let data = component.get("v.data");
        let metaToUpdate = draftValues.filter(item => item.id === row.id);
        
        let dataToUpdate = [];
        metaToUpdate.forEach(function(item){
            let account = {};
            account.Id = item.id;
            account.Name = data[0].name;
            account.Meta_de_Volume__c = item.meta;
            dataToUpdate.push(account);
        })
        console.log(metaToUpdate);
        console.log(id);
        
        let action = component.get("c.updateAccountWithNewMeta");
        action.setParams({
            accountList : dataToUpdate
        });
        console.log(action);
        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, $A.getCallback(function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                let retorno = response.getReturnValue();
                if(retorno.status == 'Sucesso'){
                    helper.showToast(component, event, helper, retorno.status, retorno.message);
                    component.set("v.data", retorno.data.listAccountWrapper);
                }
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                let errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        }));
        $A.enqueueAction(action);
        
    },
    
    showToast : function(component, event, helper, title, message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message
        });
        toastEvent.fire();
    }
})