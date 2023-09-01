<?php
class PositionGetListProcessor extends modObjectGetListProcessor
{
    public $classKey = 'brevPosition';
    public $languageTopics = array('bannerrevised:default');
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';
    public $objectType = 'bannerrevised.position';

    function prepareQueryBeforeCount(xPDOQuery $c)
    {
        // Filter by search query
        if ($query = $this->getProperty('query')) {
            $c->where(array('name:LIKE' => "%$query%"));
        }

        return $c;
    }

    function prepareRow(xPDOObject $object)
    {
        $object = $object->toArray();
        $object['clicks'] = $this->modx->getCount('brevClick', array('position' => $object['id']));
        return $object;
    }
}
return 'PositionGetListProcessor';
