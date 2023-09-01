<?php

namespace BannerRevised\v2\Processors\Positions;

class Remove extends \modObjectRemoveProcessor
{
    public $classKey = 'brevPosition';
    public $languageTopics = array('bannerrevised:default');
    public $objectType = 'bannerrevised.position';
}
