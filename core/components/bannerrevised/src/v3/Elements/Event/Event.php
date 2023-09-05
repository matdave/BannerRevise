<?php

namespace BannerRevised\v3\Elements\Event;

use MODX\Revolution\modX;

abstract class Event
{
    /**
     * A reference to the modX object.
     * @var modX $modx
     */
    public $modx = null;

    protected $bannerrevised;

    /** @var array */
    protected $sp = [];

    public function __construct($bannerrevised, array $scriptProperties)
    {
        $this->bannerrevised =& $bannerrevised;
        $this->modx =& $this->bannerrevised->modx;
        $this->sp = $scriptProperties;
    }

    abstract public function run();

    protected function getOption($key, $default = null, $skipEmpty = true)
    {
        return $this->modx->getOption($key, $this->sp, $default, $skipEmpty);
    }
}
