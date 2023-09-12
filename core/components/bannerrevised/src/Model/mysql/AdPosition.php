<?php

namespace BannerRevised\Model\mysql;

use xPDO\xPDO;

class AdPosition extends \BannerRevised\Model\AdPosition
{
    public static $metaMap = [
        'package' => 'BannerRevised\\Model\\',
        'version' => '3.0',
        'table' => 'ban_rev_ads_positions',
        'tableMeta' =>
        [
            'engine' => 'InnoDB',
        ],
        'fields' =>
        [
            'ad' => null,
            'position' => null,
            'idx' => 0,
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
            'idx' =>
            [
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ],
        ],
        'indexes' =>
        [
            'ad' =>
            [
                'alias' => 'ad',
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
                ],
            ],
            'idx' =>
            [
                'alias' => 'idx',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' =>
                [
                    'idx' =>
                    [
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ],
                ],
            ],
            'position' =>
            [
                'alias' => 'position',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' =>
                [
                    'position' =>
                    [
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ],
                ],
            ],
        ],
        'aggregates' =>
        [
            'Ad' =>
            [
                'class' => 'BannerRevised\\Model\\Ad',
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
