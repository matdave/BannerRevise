<?php

namespace BannerRevised\v3\Processors\Positions;

use BannerRevised\Model\Click;
use BannerRevised\Model\Position;
use MODX\Revolution\Processors\Model\GetListProcessor;
use xPDO\Om\xPDOObject;
use xPDO\Om\xPDOQuery;

class GetList extends GetListProcessor
{
    public $classKey = Position::class;
    public $languageTopics = array('bannerrevised:default');
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';
    public $objectType = 'bannerrevised.position';

    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        // Filter by search query
        if ($query = $this->getProperty('query')) {
            $c->where(array('name:LIKE' => "%$query%"));
        }

        return $c;
    }

    public function prepareRow(xPDOObject $object)
    {
        $object = $object->toArray();
        $object['clicks'] = $this->modx->getCount(Click::class, array('position' => $object['id']));
        return $object;
    }
}
