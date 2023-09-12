<?php

namespace BannerRevised\Model\mysql;

use xPDO\xPDO;

class Ad extends \BannerRevised\Model\Ad
{
    public static $metaMap = [
        'package' => 'BannerRevised\\Model\\',
        'version' => '3.0',
        'table' => 'ban_rev_ads',
        'tableMeta' =>
        [
            'engine' => 'InnoDB',
        ],
        'fields' =>
        [
            'name' => '',
            'url' => '',
            'type' => '',
            'image' => '',
            'source' => 1,
            'active' => 0,
            'description' => null,
            'html' => null,
            'start' => null,
            'end' => null,
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
            'url' =>
            [
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ],
            'type' =>
            [
                'dbtype' => 'varchar',
                'precision' => '10',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ],
            'image' =>
            [
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ],
            'source' =>
            [
                'dbtype' => 'integer',
                'precision' => '10',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => true,
                'default' => 1,
            ],
            'active' =>
            [
                'dbtype' => 'tinyint',
                'precision' => '1',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ],
            'description' =>
            [
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => true,
            ],
            'html' =>
            [
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => true,
            ],
            'start' =>
            [
                'dbtype' => 'datetime',
                'phptype' => 'timestamp',
                'null' => true,
            ],
            'end' =>
            [
                'dbtype' => 'datetime',
                'phptype' => 'timestamp',
                'null' => true,
            ],
        ],
        'indexes' =>
        [
            'active' =>
            [
                'alias' => 'active',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' =>
                [
                    'active' =>
                    [
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ],
                ],
            ],
            'start' =>
            [
                'alias' => 'start',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' =>
                [
                    'start' =>
                    [
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ],
                ],
            ],
            'end' =>
            [
                'alias' => 'end',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' =>
                [
                    'end' =>
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
            'Positions' =>
            [
                'class' => 'BannerRevised\\Model\\AdPosition',
                'local' => 'id',
                'foreign' => 'ad',
                'cardinality' => 'many',
                'owner' => 'local',
            ],
            'Clicks' =>
            [
                'class' => 'BannerRevised\\Model\\Click',
                'local' => 'id',
                'foreign' => 'ad',
                'cardinality' => 'many',
                'owner' => 'local',
            ],
        ],
    ];
}
