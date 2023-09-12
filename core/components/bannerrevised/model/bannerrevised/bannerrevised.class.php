<?php

/**
 * @package bannerrevised
 */
class BannerRevised
{
    /**
     * @var \modX $modx
     */
    public $modx;

    public $namespace = 'bannerrevised';

    /**
     * @var array $config
     */
    public $config = [];
    /**
     * Constructs the BannerRevised object
     *
     * @param modX  &$modx  A reference to the modX object
     * @param array $config An array of configuration options
     */
    public function __construct(modX &$modx, array $config = [])
    {
        $this->modx =& $modx;

        $basePath = $this->modx->getOption(
            'bannerrevised.core_path',
            $config,
            $this->modx->getOption('core_path') . 'components/bannerrevised/'
        );
        $assetsUrl = $this->modx->getOption(
            'bannerrevised.assets_url',
            $config,
            $this->modx->getOption('assets_url') . 'components/bannerrevised/'
        );

        $this->config = array_merge(
            [
            'baseUrl' => $modx->getOption('base_url'),
            'basePath' => $basePath,
            'corePath' => $basePath,
            'modelPath' => $basePath . 'model/',
            'processorsPath' => $basePath . 'processors/',
            'templatesPath' => $basePath . 'templates/',
            'chunksPath' => $basePath . 'elements/chunks/',
            'jsUrl' => $assetsUrl . 'js/',
            'cssUrl' => $assetsUrl . 'css/',
            'assetsUrl' => $assetsUrl,
            'connector_url' => $assetsUrl . 'connector.php',
            'managerUrl' => $this->modx->getOption('manager_url'),
            'media_source' => $this->modx->getOption(
                'bannerrevised.media_source',
                null,
                $this->modx->getOption('default_media_source'),
                true
            )
            ],
            $config
        );

        $this->modx->addPackage('bannerrevised', $this->getOption('modelPath'));
        $this->modx->lexicon->load('bannerrevised:default');
        $this->autoload();
    }


    /**
     * Get a local configuration option or a namespaced system setting by key.
     *
     * @param string $key     The option key to search for.
     * @param array  $options An array of options that override local options.
     * @param mixed  $default The default value returned if the option is not found locally or as a
     *                        namespaced system setting; by default this value is null.
     *
     * @return mixed The option value or the default value specified.
     */
    public function getOption(string $key, $options = [], $default = null)
    {
        $option = $default;
        if (!empty($key) && is_string($key)) {
            if ($options != null && array_key_exists($key, $options)) {
                $option = $options[$key];
            } elseif (array_key_exists($key, $this->config)) {
                $option = $this->config[$key];
            } elseif (array_key_exists("{$this->namespace}.{$key}", $this->modx->config)) {
                $option = $this->modx->getOption("{$this->namespace}.{$key}");
            }
        }
        return $option;
    }

    protected function autoload()
    {
        include_once $this->getOption('basePath') . 'vendor/autoload.php';
    }


    /**
     * Refreshes order of ads in position after various actions with them
     *
     * @param integer $position An id of position
     */
    public function refreshIdx($position = 0)
    {
        $q = $this->modx->newQuery('brevAdPosition');
        $q ->where(['position' => $position]);
        $q->sortby('idx', 'ASC');

        $res = $this->modx->getCollection('brevAdPosition', $q);
        $i = 0;
        foreach ($res as $v) {
            $v->set('idx', $i);
            $v->save();
            $i++;
        }
    }
}
