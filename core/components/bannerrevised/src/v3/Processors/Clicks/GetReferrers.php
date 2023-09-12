<?php

namespace BannerRevised\v3\Processors\Clicks;

use BannerRevised\Model\Click;
use MODX\Revolution\Processors\Model\GetListProcessor;
use PDO;

class GetReferrers extends GetListProcessor
{
    public $classKey = Click::class;
    public $languageTopics = ['bannerrevised:default'];
    public $defaultSortField = 'clicks';
    public $defaultSortDirection = 'DESC';
    public $objectType = 'bannerrevised.ad';

    public function getData()
    {
        $data = [];
        $limit = intval($this->getProperty('limit'));
        $start = intval($this->getProperty('start'));
        $period = $this->getProperty('period');

        $conditions = [];

        if (!empty($period)) {
            if ($period == 'last month') {
                $conditions['clickdate:LIKE'] = strftime('%Y-%m', strtotime('first day of last month'));
            } else {
                $conditions['clickdate:LIKE'] = strftime($period) . '%';
            }
        }

        $c = $this->modx->newQuery($this->classKey);
        $c->select('COUNT(DISTINCT(referrer))');
        $c->andCondition($conditions);
        if ($c->prepare() && $c->stmt->execute()) {
            $rows = $c->stmt->fetchAll(PDO::FETCH_COLUMN);
            $data['total'] = (int)reset($rows);

            $c = $this->modx->newQuery($this->classKey);
            $c->select('COUNT(id) as clicks, referrer');
            $c->andCondition($conditions);
            $c->groupby('referrer');
            $c->sortby('clicks', 'DESC');

            if ($limit > 0) {
                $c->limit($limit, $start);
            }
            $c->prepare();
            $c->stmt->execute();
            $data['results'] = $c->stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return $data;
    }

    public function iterate(array $data)
    {
        $list = [];
        $this->currentIndex = 0;
        foreach ($data['results'] as $result) {
            $list[] = $result;
            $this->currentIndex++;
        }
        return $list;
    }
}
