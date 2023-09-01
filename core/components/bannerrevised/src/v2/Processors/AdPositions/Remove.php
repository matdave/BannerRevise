<?php

namespace BannerRevised\v2\Processors\AdPositions;

class Remove extends \modObjectRemoveProcessor
{
    public $classKey = 'brevAdPosition';
    public $languageTopics = array('bannerrevised:default');
    public $objectType = 'bannerrevised.adposition';
    public $position = 0;

    public function beforeRemove()
    {
        $this->position = $this->object->get('position');
        return true;
    }

    public function afterRemove()
    {
        $this->modx->bannerrevised->refreshIdx($this->position);
        return true;
    }
}
