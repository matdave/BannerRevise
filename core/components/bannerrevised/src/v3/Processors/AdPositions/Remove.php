<?php

namespace BannerRevised\v3\Processors\AdPositions;

use BannerRevised\Model\AdPosition;
use MODX\Revolution\Processors\Model\RemoveProcessor;

class Remove extends RemoveProcessor
{
    public $classKey = AdPosition::class;
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
