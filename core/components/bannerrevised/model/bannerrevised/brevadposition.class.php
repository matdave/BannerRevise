<?php
class brevAdPosition extends xPDOSimpleObject
{

    function getPositionAds()
    {
        $position = $this->get('position');
        $collection = $this->xpdo->getCollection('brevAdPosition', array('position' => $position));
        
        $arr = array();
        foreach ($collection as $res) {
            $arr[] = $res;
        }
        
        return $arr;
    }

}
