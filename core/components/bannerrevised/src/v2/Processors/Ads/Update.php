<?php

namespace BannerRevised\v2\Processors\Ads;

class Update extends \modObjectUpdateProcessor
{
    public $classKey = 'brevAd';
    public $languageTopics = array('bannerrevised:default');
    public $objectType = 'bannerrevised.ad';

    public function beforeSet()
    {
        if (!$this->getProperty('start')) {
            $this->setProperty('start', null);
        }
        if (!$this->getProperty('end')) {
            $this->setProperty('end', null);
        }

        return parent::beforeSet();
    }

    public function afterSave()
    {
        $positions = $this->getProperty('positions');
        $ad = $this->object->get('id');

        if (is_array($positions)) {
            //remove unused current positions
            $q = $this->modx->newQuery('brevAdPosition', array('position:NOT IN' => $positions, 'ad' => $ad));
            $adpositions = $this->modx->getCollection('brevAdPosition', $q);
            /**
             * @var brevAdPosition $adposition
             */
            foreach ($adpositions as $adposition) {
                $position = $adposition->get('position');
                $adposition->remove();
                $this->modx->bannerrevised->refreshIdx($position);
            }
            // add ad to new postion
            foreach ($positions as $position) {
                $arr = array('ad' => $ad, 'position' => $position);

                if (!$adPos = $this->modx->getObject('brevAdPosition', $arr)) {
                    $adPos = $this->modx->newObject('brevAdPosition');
                    $arr['idx'] = $this->modx->getCount('brevAdPosition', array('position' => $position));
                }
                $adPos->fromArray($arr);
                $adPos->save();
            }
        } else {
            //no positions selected, so remove all of them
            $this->modx->removeCollection('brevAdPosition', array('ad' => $ad));
        }
    }
}
