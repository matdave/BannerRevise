<?php

class BannerRevisedHomeManagerController extends modExtraManagerController
{
    /**
     *
     *
     * @var BannerRevised $bannerrevised
     */
    public $bannerrevised;


    public function initialize()
    {
        if (!class_exists('BannerRevised')) {
            include_once dirname(__DIR__) . '/model/bannerrevised/bannerrevised.class.php';
        }
        $this->bannerrevised = new BannerRevised($this->modx);

        $this->addJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/bannerrevised.js');
        $this->addHtml(
            '<script type="text/javascript">
        Ext.onReady(function() {
            BannerRev.config = ' . json_encode($this->bannerrevised->config) . ';
        });
        </script>'
        );

        parent::initialize();
    }


    public function getLanguageTopics()
    {
        return array('bannerrevised:default');
    }


    public function checkPermissions()
    {
        return true;
    }


    public function getPageTitle()
    {
        return $this->modx->lexicon('bannerrevised');
    }


    public function loadCustomCssJs()
    {
        $this->addCss($this->bannerrevised->config['cssUrl'] . 'mgr/main.css');
        $this->addLastJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/plugins/dragdropgrid.js');
        $this->addLastJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/widgets/banners.grid.js');
        $this->addLastJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/widgets/positions.grid.js');
        $this->addLastJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/widgets/referrers.grid.js');
        $this->addLastJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/widgets/stats.panel.js');
        $this->addLastJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $this->addLastJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/sections/index.js');
        $this->addLastJavascript(MODX_MANAGER_URL . 'assets/modext/util/datetime.js');
    }


    public function getTemplateFile()
    {
        return $this->bannerrevised->config['templatesPath'] . 'home.tpl';
    }
}
