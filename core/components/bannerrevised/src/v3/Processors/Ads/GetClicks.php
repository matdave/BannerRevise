<?php

class GetClicksProcessor extends modObjectGetListProcessor
{
    public $classKey = 'brevAd';
    public $languageTopics = array('bannerrevised:default');
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';
    public $objectType = 'bannerrevised.ad';

    function prepareRow(xPDOObject $object)
    {
        $period = $this->getProperty('period');

        $object = $object->toArray();

        $clickC = $this->modx->newQuery('brevClick');
        $conditions = array();
        $conditions['ad'] = $object['id'];

        if (!empty($period)) {
            if ($period == 'last month') {
                $conditions['clickdate:LIKE'] = strftime('%Y-%m', strtotime('first day of last month')) . '%';
            } else {
                $conditions['clickdate:LIKE'] = strftime($period) . '%';
            }
        }
        $clickC->andCondition($conditions);
        $object['clicks'] = $this->modx->getCount('brevClick', $clickC);
        return $object;
    }
}

return 'GetClicksProcessor';
