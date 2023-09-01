<?php

namespace BannerRevised\v2\Processors\AdPositions;

class Add extends \modObjectProcessor
{
    public $classKey = 'brevAdPosition';
    public $languageTopics = array('bannerrevised:default');
    public $objectType = 'bannerrevised.adposition';
    public $checkSavePermission = true;

    public function initialize()
    {
        $this->object = $this->modx->newObject($this->classKey);

        if (
            $this->checkSavePermission
            && $this->object instanceof \modAccessibleObject
            && !$this->object->checkPolicy('save')
        ) {
            return $this->modx->lexicon('access_denied');
        }
        return true;
    }


    public function process()
    {
        if (!$position = $this->getProperty('position')) {
            return $this->modx->error->failure($this->modx->lexicon('bannerrevised.positions.error.ns'));
        }
        if (!$ad = $this->getProperty('ad')) {
            return $this->modx->error->failure($this->modx->lexicon('bannerrevised.ads.error.ns'));
        }

        $arr = array(
            'position' => $position
        , 'ad' => $ad
        );

        if ($this->modx->getCount('brevAdPosition', $arr)) {
            return $this->modx->error->failure($this->modx->lexicon('bannerrevised.adposition.error.ae'));
        }

        $arr['idx'] = $this->modx->getCount('brevAdPosition', array('position' => $position));
        $this->object->fromArray($arr);
        $this->object->save();

        return $this->modx->error->success();
    }
}
