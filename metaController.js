({
    init : function(component, event, helper) {
        component.set('v.columns', [
            { label: 'Nome da conta', fieldName: 'name', type: 'text', hideDefaultActions: true},
            {
                label: 'Meta de Volume',
                fieldName: 'meta',
                type: 'number',
                editable: true,
                hideDefaultActions: true
            },
            {label: '', type: 'button', initialWidth: 100, typeAttributes: { label: 'Salvar', name: 'salvar', title: 'Clique para salvar'}, hideDefaultActions: true}
        ]);
        
        helper.getAccountsWithoutMeta(component, event, helper);
    },
    
    handleRowAction : function(component, event, helper){
        let action = event.getParam('action');
        let row = event.getParam('row');
        console.log(row);
        helper.updateMetaAccount(component, event, helper, row);
    },
    oncellchange : function(component, event, helper){
        let draftValues = event.getParam('draftValues');
        component.set('v.draftValues',draftValues);
        console.log(draftValues);
    }
})