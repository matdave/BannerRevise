<?php

class AdPositionGetListProcessor extends modObjectGetListProcessor
{
    public $classKey = 'brevAdPosition';
    public $languageTopics = array('bannerrevised:default');
    public $defaultSortField = 'idx';
    public $defaultSortDirection = 'ASC';
    public $objectType = 'bannerrevised.adposition';

    function beforeQuery()
    {
        $position = $this->getProperty('position');
        if (empty($position)) {
            return $this->modx->lexicon('bannerrevised.positions.error.nf');
        }
        return true;
    }

    function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $position = $this->getProperty('position');
        $c->where(array('position' => $position));
        return $c;
    }


    function prepareRow(xPDOObject $object)
    {
        /**
         * @var brevAd $ad
         */
        $ad = $object->getOne('Ad');

        $row = array_merge($ad->toArray(), $object->toArray());
        $row['image'] = $ad->getImageUrl();

        return $row;
    }
}

return 'AdPositionGetListProcessor';
