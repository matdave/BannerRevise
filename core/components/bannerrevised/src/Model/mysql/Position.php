<?php

namespace BannerRevised\Model\mysql;

use xPDO\xPDO;

class Position extends \BannerRevised\Model\Position
{
    public static $metaMap = [
        'package' => 'BannerRevised\\Model\\',
        'version' => '3.0',
        'table' => 'ban_rev_positions',
        'tableMeta' =>
        [
            'engine' => 'InnoDB',
        ],
        'fields' =>
        [
            'name' => '',
        ],
        'fieldMeta' =>
        [
            'name' =>
            [
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
            ],
        ],
        'indexes' =>
        [
            'name' =>
            [
                'alias' => 'name',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' =>
                [
                    'name' =>
                    [
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ],
                ],
            ],
        ],
        'composites' =>
        [
            'Ads' =>
            [
                'class' => 'BannerRevised\\Model\\AdPosition',
                'local' => 'id',
                'foreign' => 'position',
                'cardinality' => 'many',
                'owner' => 'local',
            ],
            'Clicks' =>
            [
                'class' => 'BannerRevised\\Model\\Click',
                'local' => 'id',
                'foreign' => 'position',
                'cardinality' => 'many',
                'owner' => 'local',
            ],
        ],
    ];
}
