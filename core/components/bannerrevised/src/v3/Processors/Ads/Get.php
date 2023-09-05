<?php

namespace BannerRevised\v3\Processors\Ads;

use BannerRevised\Model\Ad;
use MODX\Revolution\Processors\Model\GetProcessor;

class Get extends GetProcessor
{
    /**
     * @var Ad $object
     */
    public $object;
    public $classKey = Ad::class;
    public $languageTopics = array('bannerrevised:default');
    public $objectType = 'bannerrevised.ad';

    public function beforeOutput()
    {
        $adPositionList = array();
        $adPositions = $this->object->getMany('Positions');
        /**
         * @var brevAdPosition $adPosition
         */
        foreach ($adPositions as $adPosition) {
            $adPositionList[] = $adPosition->get('position');
        }
        $this->object->set('positions', $adPositionList);
    }

    public function cleanup()
    {
        $row = $this->object->toArray();
        $row['current_image'] = $this->object->getImageUrl($row['image']);
        return $this->success('', $row);
    }
}
