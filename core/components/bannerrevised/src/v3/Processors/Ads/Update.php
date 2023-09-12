<?php

namespace BannerRevised\v3\Processors\Ads;

use BannerRevised\Model\Ad;
use BannerRevised\Model\AdPosition;
use MODX\Revolution\Processors\Model\UpdateProcessor;

class Update extends UpdateProcessor
{
    public $classKey = Ad::class;
    public $languageTopics = ['bannerrevised:default'];
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
            $q = $this->modx->newQuery(AdPosition::class, ['position:NOT IN' => $positions, 'ad' => $ad]);
            $adpositions = $this->modx->getCollection(AdPosition::class, $q);
            /**
             * @var AdPosition $adposition
             */
            foreach ($adpositions as $adposition) {
                $position = $adposition->get('position');
                $adposition->remove();
                $this->modx->bannerrevised->refreshIdx($position);
            }
            // add ad to new postion
            foreach ($positions as $position) {
                $arr = ['ad' => $ad, 'position' => $position];

                if (!$adPos = $this->modx->getObject(AdPosition::class, $arr)) {
                    $adPos = $this->modx->newObject(AdPosition::class);
                    $arr['idx'] = $this->modx->getCount(AdPosition::class, ['position' => $position]);
                }
                $adPos->fromArray($arr);
                $adPos->save();
            }
        } else {
            //no positions selected, so remove all of them
            $this->modx->removeCollection(AdPosition::class, ['ad' => $ad]);
        }
    }
}
