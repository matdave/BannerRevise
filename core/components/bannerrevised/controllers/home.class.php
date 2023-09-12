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
        if (empty($this->modx->version)) {
            $this->modx->getVersionData();
        }
        if ($this->modx->version['version'] < 3) {
            $corePath = $this->modx->getOption(
                'bannerrevised.core_path',
                null,
                $this->modx->getOption('core_path', null, MODX_CORE_PATH) . 'components/bannerrevised/'
            );
            $this->bannerrevised = $this->modx->getService(
                'bannerrevised',
                'BannerRevised',
                $corePath . 'model/bannerrevised/',
                [
                    'core_path' => $corePath
                ]
            );
        } else {
            $this->bannerrevised = $this->modx->getService('bannerrevised');
        }
        $this->bannerrevised->config['modx3'] = ($this->modx->version['version'] >= 3);

        $this->addJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/bannerrevised.js');
        $this->addHtml(
            '<script type="text/javascript">
        Ext.onReady(function() {
            bannerrev.config = ' . json_encode($this->bannerrevised->config) . ';
        });
        </script>'
        );

        parent::initialize();
    }

    public function getLanguageTopics()
    {
        return ['bannerrevised:default'];
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
        $this->addLastJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/utils/combo.js');
        $this->addLastJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/utils/dragdropgrid.js');
        $this->addLastJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/utils/form.js');
        $this->addLastJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/utils/image.js');
        $this->addLastJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/widgets/adpositions.grid.js');
        $this->addLastJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/widgets/banners.grid.js');
        $this->addLastJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/widgets/banners.window.js');
        $this->addLastJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/widgets/positions.grid.js');
        $this->addLastJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/widgets/positions.window.js');
        $this->addLastJavascript($this->bannerrevised->config['jsUrl'] . 'mgr/widgets/clicks.grid.js');
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
