Ext.ux.Image = Ext.extend(
    Ext.Component, {
        url  : Ext.BLANK_IMAGE_URL  //for initial src value
        ,autoEl: {
            tag: 'img'
            ,src: Ext.BLANK_IMAGE_URL
            ,cls: 'tng-managed-image'
            ,width: 166
            //,height: 100
            ,'ext:qtip': (this.url) ? "<img src='/" + this.url.replace(MODx.config.base_path, '') + "' />" : ''
        }
        //  Add our custom processing to the onRender phase.
        //  We add a ‘load’ listener to our element.
        ,onRender: function () {
            Ext.ux.Image.superclass.onRender.apply(this, arguments);
            this.el.on('load', this.onLoad, this);
            if(this.url) {
                this.setSrc(this.url);
            }
        }
        ,onLoad: function () {
            this.fireEvent('load', this);
        }
        ,setSrc: function (src, source, width, height) {
            if (src == '' || src == undefined) {
                this.el.dom.src = Ext.BLANK_IMAGE_URL;
                Ext.getCmp('currimg').hide();
            }
            else {
                if (!source) {source = bannerrev.config['media_source'];}
                if (!height) {height = 200;}
                if (!width) {width = 166;}
                console.log(this);
                this.el.dom.src = MODx.config.connectors_url + 'system/phpthumb.php?src=' + src + '&w='+width+'&h='+height+'&f=jpg&q=90&HTTP_MODAUTH=' + MODx.siteId + '&far=1&wctx=mgr&source=' + source;
                this.el.dom.setAttribute('ext:qtip', "<img src='/" + src.replace(MODx.config.base_path, '') + "' />");

                Ext.getCmp('currimg').show();
            }
        }
    }
);
Ext.reg('image', Ext.ux.Image);

bannerrev.renderGridImage = function (img) {
    var height = 45;
    if (img.length > 0) {
        if (!/(jpg|jpeg|png|gif|bmp)$/.test(img.toLowerCase())) {
            return img;
        }
        else if (/^(http|https)/.test(img)) {
            return '<img src="'+img+'" alt="" />'
        }
        else {
            return '<img src="'+MODx.config.connectors_url+'system/phpthumb.php?&src='+img+'&wctx=web&h='+height+'&zc=0&source='+bannerrev.config['media_source']+'" alt="" />'
        }
    }
    else {
        return '';
    }
}