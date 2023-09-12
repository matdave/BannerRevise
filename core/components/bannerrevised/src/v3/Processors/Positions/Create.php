<?php

namespace BannerRevised\v3\Processors\Positions;

use BannerRevised\Model\Position;
use MODX\Revolution\Processors\Model\CreateProcessor;

class Create extends CreateProcessor
{
    public $classKey = Position::class;
    public $languageTopics = ['bannerrevised:default'];
    public $objectType = 'bannerrevised.position';
}
