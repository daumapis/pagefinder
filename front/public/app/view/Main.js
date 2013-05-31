Ext.define('pagefinder.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: ['Ext.TitleBar', 'Ext.Video'],
    config: {
    
        items: [{
            dockedItem: "top",
            xtype: "titlebar",
            title: "PageFinder"
        
        }, {
            xtype: "formpanel",
            centered: true,
            width: "70%",
            height: "60%",
            modal: true,
            items: [{
                xtype: 'fieldset',
                title: 'Personal Info',
                instructions: 'Please enter the information above.',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: [{
                    xtype: 'textfield',
                    name: 'name',
                    label: 'Name',
                    autoCapitalize: false
                }, {
                    xtype: 'passwordfield',
                    name: 'password',
                    label: 'Password'
                }, {
                    xtype: "toolbar",
                    docked: 'bottom',
                    items: [{
                        xtype: "spacer"
                    }, {
                        text: 'Login',
                        ui: 'confirm',
                        scope: this,
                        handler: function(){
                            var form = this.form;
                            
                            // Mask the form
                            form.setMasked({
                                xtype: 'loadmask',
                                message: 'Saving...'
                            });
                            
                            // Put it inside a timeout so it feels like it is going to a server.
                            setTimeout(function(){
                                if (form.user) {
                                    // Call the updateRecord method of formpanel with the user record instance. This will update the user record
                                    // with the latest values.
                                    form.updateRecord(form.user, true);
                                }
                                
                                // Unmask the formpanel
                                form.setMasked(false);
                            }, 1000);
                        }
                    }]
                }]
            
            }]
        }]
    }

});
