<?php

namespace BannerRevised\v3\Processors\Resource;

use MODX\Revolution\modAccessibleObject;
use MODX\Revolution\modResource;
use PDO;
use xPDO\Om\xPDOObject;
use xPDO\Om\xPDOQuery;

class GetList extends \MODX\Revolution\Processors\Resource\GetList
{

    public function prepareRow(xPDOObject $object)
    {
        $row = parent::prepareRow($object);
        $row['url'] = '[[~' . $row['id'] . ']]';
        return $row;
    }

}
