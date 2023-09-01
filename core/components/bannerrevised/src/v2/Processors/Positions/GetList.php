<?php

namespace BannerRevised\v2\Processors\Positions;

class GetList extends \modObjectGetListProcessor
{
    public $classKey = 'brevPosition';
    public $languageTopics = array('bannerrevised:default');
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';
    public $objectType = 'bannerrevised.position';

    public function prepareQueryBeforeCount(\xPDOQuery $c)
    {
        // Filter by search query
        if ($query = $this->getProperty('query')) {
            $c->where(array('name:LIKE' => "%$query%"));
        }

        return $c;
    }

    public function prepareRow(\xPDOObject $object)
    {
        $object = $object->toArray();
        $object['clicks'] = $this->modx->getCount('brevClick', array('position' => $object['id']));
        return $object;
    }
}
