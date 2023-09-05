<?php

namespace BannerRevised\v3\Processors\Ads;

use BannerRevised\Model\Ad;
use BannerRevised\Model\AdPosition;
use MODX\Revolution\Processors\Model\CreateProcessor;

class Create extends CreateProcessor
{
    public $classKey = Ad::class;
    public $languageTopics = array('bannerrevised:default');
    public $objectType = 'bannerrevised.ad';

    public function afterSave()
    {
        $positions = $this->getProperty('positions');

        //user selected one or more positions, so update
        if (is_array($positions)) {
            foreach ($positions as $position) {
                $adPos = $this->modx->newObject(AdPosition::class);
                //add settings
                $idx = $this->modx->getCount(AdPosition::class, array('position' => $position));
                $adPos->fromArray(
                    array(
                        'ad' => $this->object->get('id'),
                        'position' => $position,
                        'idx' => $idx
                    )
                );
                //save position
                $adPos->save();
            }
        }
    }
}
