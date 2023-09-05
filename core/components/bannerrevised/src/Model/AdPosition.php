<?php

namespace BannerRevised\Model;

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
class AdPosition extends \xPDO\Om\xPDOSimpleObject
{

    public function getPositionAds()
    {
        $position = $this->get('position');
        $collection = $this->xpdo->getCollection(AdPosition::class, array('position' => $position));

        $arr = array();
        foreach ($collection as $res) {
            $arr[] = $res;
        }

        return $arr;
    }
}
