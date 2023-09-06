<?php

namespace BannerRevised\v2\Elements\Event;

class OnPageNotFound extends Event
{
    public function run()
    {
        $this->modx->log(1, 'BannerRevised: OnPageNotFound');
        $bannerrevised_click = $this->bannerrevised->getOption('click');
        if (preg_match('/' . $bannerrevised_click . '\/([0-9]+)/', $_SERVER['REQUEST_URI'], $matches)) {
            $id = $matches[1];
            $c = $this->modx->newQuery('brevAd');
            $c->select('`brevAd`.`id`, `Position`.`position`, `brevAd`.`url`');
            $c->leftJoin('brevAdPosition', 'Position', 'Position.ad = brevAd.id');
            $c->where(['Position.id' => $id]);
            if ($ad = $this->modx->getObject('brevAd', $c)) {
                $key = [
                    'ad' => $ad->get('id'),
                    'position' => $ad->get('position'),
                    'ip' => $_SERVER['REMOTE_ADDR'],
                    'clickdate' => date('Y-m-d H') . ':00:00'
                ];
                if (!$this->modx->getCount('brevClick', $key)) {
                    $click = $this->modx->newObject(
                        'brevClick',
                        [
                            'ad' => $ad->get('id'),
                            'position' => $ad->get('position'),
                            'clickdate' => date('Y-m-d H:00:00'),
                            'referrer' => $_SERVER['HTTP_REFERER'],
                            'ip' => $_SERVER['REMOTE_ADDR']
                        ]
                    );
                    if (!$click->save()) {
                        $this->modx->log(\modX::LOG_LEVEL_ERROR, '[BannerRevised] Could not save click');
                    }
                }
                $url = $ad->get('url');
                $chunk = $this->modx->newObject('modChunk');
                $chunk->set('name', 'bannerrevisedPosition' . $id);
                $chunk->setContent($url);
                $url = $chunk->process($_GET);

                $this->modx->sendRedirect($url, ['responseCode' => 'HTTP/1.1 302 Found']);
            }
        }
    }
}
