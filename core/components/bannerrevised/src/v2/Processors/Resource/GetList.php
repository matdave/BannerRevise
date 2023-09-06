<?php

namespace BannerRevised\v2\Processors\Resource;

require MODX_CORE_PATH . 'model/modx/processors/resource/getlist.class.php';

class GetList extends \modResourceGetListProcessor
{
    public function prepareRow(\xPDOObject $object)
    {
        $row = parent::prepareRow($object);
        $row['url'] = '[[~' . $row['id'] . ']]';
        return $row;
    }
}
