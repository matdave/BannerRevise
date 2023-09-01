<?php

class PositionRemoveProcessor extends modObjectRemoveProcessor
{
    public $classKey = 'brevPosition';
    public $languageTopics = array('bannerrevised:default');
    public $objectType = 'bannerrevised.position';
}

return 'PositionRemoveProcessor';
