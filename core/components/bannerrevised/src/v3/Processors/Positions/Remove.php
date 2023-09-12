<?php

namespace BannerRevised\v3\Processors\Positions;

use BannerRevised\Model\Position;
use MODX\Revolution\Processors\Model\RemoveProcessor;

class Remove extends RemoveProcessor
{
    public $classKey = Position::class;
    public $languageTopics = ['bannerrevised:default'];
    public $objectType = 'bannerrevised.position';
}
