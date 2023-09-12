<?php

namespace BannerRevised\v3\Processors\Ads;

use BannerRevised\Model\Ad;
use BannerRevised\Model\Click;
use MODX\Revolution\Processors\Model\GetListProcessor;
use xPDO\Om\xPDOObject;

class GetClicks extends GetListProcessor
{
    public $classKey = Ad::class;
    public $languageTopics = ['bannerrevised:default'];
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';
    public $objectType = 'bannerrevised.ad';

    public function prepareRow(xPDOObject $object)
    {
        $period = $this->getProperty('period');

        $object = $object->toArray();

        $clickC = $this->modx->newQuery(Click::class);
        $conditions = [];
        $conditions['ad'] = $object['id'];

        if (!empty($period)) {
            if ($period == 'last month') {
                $conditions['clickdate:LIKE'] = strftime('%Y-%m', strtotime('first day of last month')) . '%';
            } else {
                $conditions['clickdate:LIKE'] = strftime($period) . '%';
            }
        }
        $clickC->andCondition($conditions);
        $object['clicks'] = $this->modx->getCount(Click::class, $clickC);
        return $object;
    }
}
