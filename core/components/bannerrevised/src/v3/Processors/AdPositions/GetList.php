<?php

namespace BannerRevised\v3\Processors\AdPositions;

use BannerRevised\Model\AdPosition;
use MODX\Revolution\Processors\Model\GetListProcessor;
use xPDO\Om\xPDOObject;
use xPDO\Om\xPDOQuery;

class GetList extends GetListProcessor
{
    public $classKey = AdPosition::class;
    public $languageTopics = ['bannerrevised:default'];
    public $defaultSortField = 'idx';
    public $defaultSortDirection = 'ASC';
    public $objectType = 'bannerrevised.adposition';

    public function beforeQuery()
    {
        $position = $this->getProperty('position');
        if (empty($position)) {
            return $this->modx->lexicon('bannerrevised.positions.error.nf');
        }
        return true;
    }

    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $position = $this->getProperty('position');
        $c->where(['position' => $position]);
        return $c;
    }


    public function prepareRow(xPDOObject $object)
    {
        /**
         * @var brevAd $ad
         */
        $ad = $object->getOne('Ad');

        if (!$ad) {
            return $object->toArray();
        }
        $row = array_merge($ad->toArray(), $object->toArray());
        $row['image'] = $ad->getImageUrl();

        return $row;
    }
}
