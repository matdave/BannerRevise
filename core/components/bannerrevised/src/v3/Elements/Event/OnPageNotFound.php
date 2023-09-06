<?php

namespace BannerRevised\v3\Elements\Event;

use BannerRevised\Model\Ad;
use BannerRevised\Model\AdPosition;
use BannerRevised\Model\Click;
use MODX\Revolution\modChunk;

class OnPageNotFound extends Event
{
    public function run()
    {
        $bannerrevised_click = $this->bannerrevised->getOption('click');
        if (preg_match('/' . $bannerrevised_click . '\/([0-9]+)/', $_SERVER['REQUEST_URI'], $matches)) {
            $id = $matches[1];
            $c = $this->modx->newQuery(Ad::class);
            $c->select('`Ad`.`id`, `Position`.`position`, `Ad`.`url`');
            $c->leftJoin(AdPosition::class, 'Position', 'Position.ad = Ad.id');
            $c->where(['Position.id' => $id]);
            if ($ad = $this->modx->getObject(Ad::class, $c)) {
                $key = [
                    'ad' => $ad->get('id'),
                    'position' => $ad->get('position'),
                    'ip' => $_SERVER['REMOTE_ADDR'],
                    'clickdate' => date('Y-m-d H') . ':00:00'
                ];
                if (!$this->modx->getCount(Click::class, $key)) {
                    $click = $this->modx->newObject(
                        Click::class,
                        [
                            'ad' => $ad->get('id'),
                            'position' => $ad->get('position'),
                            'clickdate' => date('Y-m-d H:00:00'),
                            'referrer' => $_SERVER['HTTP_REFERER'],
                            'ip' => $_SERVER['REMOTE_ADDR']
                        ]
                    );
                    $click->save();
                }
                $url = $ad->get('url');
                $chunk = $this->modx->newObject(modChunk::class);
                $chunk->set('name', 'bannerrevisedPosition' . $id);
                $chunk->setContent($url);
                $url = $chunk->process($_GET);

                $this->modx->sendRedirect($url, ['responseCode' => 'HTTP/1.1 302 Found']);
            }
        }
    }
}