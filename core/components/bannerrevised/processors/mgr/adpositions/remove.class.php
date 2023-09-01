<?php
class AdPositionRemoveProcessor extends modObjectRemoveProcessor
{
    public $classKey = 'brevAdPosition';
    public $languageTopics = array('bannerrevised:default');
    public $objectType = 'bannerrevised.adposition';
    public $position = 0;
    
    function beforeRemove()
    {
        $this->position = $this->object->get('position');
        return true;
    }
    
    function afterRemove()
    {
        $this->modx->bannerrevised->refreshIdx($this->position);
        return true;
    }
}
return 'AdPositionRemoveProcessor';
