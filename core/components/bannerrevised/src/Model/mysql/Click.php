<?php

namespace BannerRevised\Model\mysql;

use xPDO\xPDO;

class Click extends \BannerRevised\Model\Click
{
    public static $metaMap = [
        'package' => 'BannerRevised\\Model\\',
        'version' => '3.0',
        'table' => 'ban_rev_clicks',
        'tableMeta' =>
        [
            'engine' => 'InnoDB',
        ],
        'fields' =>
        [
            'ad' => null,
            'position' => null,
            'clickdate' => null,
            'referrer' => null,
            'ip' => null,
        ],
        'fieldMeta' =>
        [
            'ad' =>
            [
                'dbtype' => 'integer',
                'precision' => '10',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'index' => 'index',
            ],
            'position' =>
            [
                'dbtype' => 'integer',
                'precision' => '10',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'index' => 'index',
            ],
            'clickdate' =>
            [
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
                'null' => true,
            ],
            'referrer' =>
            [
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => false,
            ],
            'ip' =>
            [
                'dbtype' => 'varchar',
                'precision' => '39',
                'phptype' => 'string',
                'null' => false,
            ],
        ],
        'indexes' =>
        [
            'clicks' =>
            [
                'alias' => 'clicks',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' =>
                [
                    'ad' =>
                    [
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ],
                    'position' =>
                    [
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ],
                    'ip' =>
                    [
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ],
                    'clickdate' =>
                    [
                        'length' => '',
                        'collation' => 'A',
                        'null' => true,
                    ],
                ],
            ],
        ],
        'aggregates' =>
        [
            'Ad' =>
            [
                'class' => 'Ad',
                'local' => 'ad',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ],
            'Position' =>
            [
                'class' => 'BannerRevised\\Model\\Position',
                'local' => 'position',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ],
        ],
    ];
}
