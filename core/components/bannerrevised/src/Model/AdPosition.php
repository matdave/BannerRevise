<?php

namespace BannerRevised\Model;

use xPDO\Om\xPDOSimpleObject;
use xPDO\xPDO;

/**
 * Class AdPosition
 *
 * @property integer $ad
 * @property integer $position
 * @property integer $idx
 *
 * @package BannerRevised\Model
 */
class AdPosition extends xPDOSimpleObject
{
    public function getPositionAds()
    {
        $position = $this->get('position');
        $collection = $this->xpdo->getCollection(AdPosition::class, ['position' => $position]);

        $arr = [];
        foreach ($collection as $res) {
            $arr[] = $res;
        }

        return $arr;
    }
}
