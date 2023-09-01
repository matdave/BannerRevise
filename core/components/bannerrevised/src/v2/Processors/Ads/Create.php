<?php

namespace BannerRevised\v2\Processors\Ads;

class Create extends \modObjectCreateProcessor
{
    public $classKey = 'brevAd';
    public $languageTopics = array('bannerrevised:default');
    public $objectType = 'bannerrevised.ad';

    public function afterSave()
    {
        $positions = $this->getProperty('positions');

        //user selected one or more positions, so update
        if (is_array($positions)) {
            foreach ($positions as $position) {
                $adPos = $this->modx->newObject('brevAdPosition');
                //add settings
                $idx = $this->modx->getCount('brevAdPosition', array('position' => $position));
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
