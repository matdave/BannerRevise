<?php

class brevAdPosition extends xPDOSimpleObject
{
    function getPositionAds()
    {
        $position = $this->get('position');
        $collection = $this->xpdo->getCollection('brevAdPosition', ['position' => $position]);

        $arr = [];
        foreach ($collection as $res) {
            $arr[] = $res;
        }

        return $arr;
    }
}
