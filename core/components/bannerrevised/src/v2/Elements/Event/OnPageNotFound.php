<?php

namespace BannerRevised\v2\Elements\Event;

class OnPageNotFound extends Event
{
    public function run()
    {
        $bannerrevised_click = $this->bannerrevised->getOption('click');
        if (preg_match('/' . $bannerrevised_click . '\/([0-9]+)/', $_SERVER['REQUEST_URI'], $matches)) {
            $id = $matches[1];
            $c = $this->modx->newQuery('byAd');
            $c->select('`byAd`.`id`, `Position`.`position`, `byAd`.`url`');
            $c->leftJoin('byAdPosition', 'Position', 'Position.ad = byAd.id');
            $c->where(array('Position.id' => $id));
            if ($ad = $this->modx->getObject('byAd', $c)) {
                $key = array(
                    'ad' => $ad->get('id'),
                    'position' => $ad->get('position'),
                    'ip' => $_SERVER['REMOTE_ADDR'],
                    'clickdate' => date('Y-m-d H') . ':00:00'
                );
                if (!$this->modx->getCount('byClick', $key)) {
                    $click = $this->modx->newObject(
                        'byClick',
                        array(
                            'ad' => $ad->get('id'),
                            'position' => $ad->get('position'),
                            'clickdate' => date('Y-m-d H:00:00'),
                            'referrer' => $_SERVER['HTTP_REFERER'],
                            'ip' => $_SERVER['REMOTE_ADDR']
                        )
                    );
                    $click->save();
                }
                $url = $ad->get('url');
                $chunk = $this->modx->newObject('modChunk');
                $chunk->set('name', 'bannerrevisedPosition' . $id);
                $chunk->setContent($url);
                $url = $chunk->process($_GET);

                $this->modx->sendRedirect($url);
            }
        }
    }
}