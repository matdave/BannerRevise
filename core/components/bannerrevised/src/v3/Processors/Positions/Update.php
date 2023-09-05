<?php

namespace BannerRevised\v3\Processors\Positions;

use BannerRevised\Model\Position;
use MODX\Revolution\Processors\Model\UpdateProcessor;

class Update extends UpdateProcessor
{
    public $classKey = Position::class;
    public $languageTopics = array('bannerrevised:default');
    public $objectType = 'bannerrevised.position';
}
