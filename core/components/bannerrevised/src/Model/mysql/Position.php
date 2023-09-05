<?php

namespace BannerRevised\Model\mysql;

use xPDO\xPDO;

class Position extends \BannerRevised\Model\Position
{
    public static $metaMap = array (
        'package' => 'BannerRevised\\Model\\',
        'version' => '3.0',
        'table' => 'ban_rev_positions',
        'tableMeta' =>
        array (
            'engine' => 'InnoDB',
        ),
        'fields' =>
        array (
            'name' => '',
        ),
        'fieldMeta' =>
        array (
            'name' =>
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
            ),
        ),
        'indexes' =>
        array (
            'name' =>
            array (
                'alias' => 'name',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' =>
                array (
                    'name' =>
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
        ),
        'composites' =>
        array (
            'Ads' =>
            array (
                'class' => 'BannerRevised\\Model\\AdPosition',
                'local' => 'id',
                'foreign' => 'position',
                'cardinality' => 'many',
                'owner' => 'local',
            ),
            'Clicks' =>
            array (
                'class' => 'BannerRevised\\Model\\Click',
                'local' => 'id',
                'foreign' => 'position',
                'cardinality' => 'many',
                'owner' => 'local',
            ),
        ),
    );
}
