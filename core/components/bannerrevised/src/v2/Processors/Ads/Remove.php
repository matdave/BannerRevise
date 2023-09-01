<?php

namespace BannerRevised\v2\Processors\Ads;

class Remove extends \modObjectRemoveProcessor
{
    public $classKey = 'brevAd';
    public $languageTopics = array('bannerrevised:default');
    public $objectType = 'bannerrevised.ad';
}
