<?php

namespace BannerRevised\v3\Processors\Ads;

use BannerRevised\Model\Ad;
use MODX\Revolution\Processors\Model\RemoveProcessor;

class Remove extends RemoveProcessor
{
    public $classKey = Ad::class;
    public $languageTopics = array('bannerrevised:default');
    public $objectType = 'bannerrevised.ad';
}
