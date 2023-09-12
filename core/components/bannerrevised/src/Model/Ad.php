<?php

namespace BannerRevised\Model;

use MODX\Revolution\Sources\modMediaSource;
use xPDO\Om\xPDOSimpleObject;
use xPDO\xPDO;

/**
 * Class Ad
 *
 * @property string $name
 * @property string $url
 * @property string $image
 * @property integer $source
 * @property integer $active
 * @property string $description
 * @property string $start
 * @property string $end
 *
 * @property \BannerRevised\Model\AdPosition[] $Positions
 * @property \BannerRevised\Model\Click[] $Clicks
 *
 * @package BannerRevised\Model
 */
class Ad extends xPDOSimpleObject
{
    public function getImageUrl($image = '')
    {
        if (empty($image)) {
            $image = parent::get('image');
        };

        if (!empty($image) && $source = parent::get('source')) {
            /**
             * @var modMediaSource $source
             */
            if ($source = $this->xpdo->getObject(modMediaSource::class, $source)) {
                $source->initialize();
                //$image = $source->getObjectUrl($image);
                $image = $source->getBasePath($image) . $image;
            }
        }

        return $image;
    }
}
