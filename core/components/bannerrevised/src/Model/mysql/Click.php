<?php
namespace BannerRevised\Model\mysql;

use xPDO\xPDO;

class Click extends \BannerRevised\Model\Click
{

    public static $metaMap = array (
        'package' => 'BannerRevised\\Model\\',
        'version' => '3.0',
        'table' => 'ban_rev_clicks',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'ad' => NULL,
            'position' => NULL,
            'clickdate' => NULL,
            'referrer' => NULL,
            'ip' => NULL,
        ),
        'fieldMeta' => 
        array (
            'ad' => 
            array (
                'dbtype' => 'integer',
                'precision' => '10',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'index' => 'index',
            ),
            'position' => 
            array (
                'dbtype' => 'integer',
                'precision' => '10',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'index' => 'index',
            ),
            'clickdate' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
                'null' => true,
            ),
            'referrer' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => false,
            ),
            'ip' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '39',
                'phptype' => 'string',
                'null' => false,
            ),
        ),
        'aggregates' => 
        array (
            'Ad' => 
            array (
                'class' => 'Ad',
                'local' => 'ad',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
            'Position' => 
            array (
                'class' => 'BannerRevised\\Model\\Position',
                'local' => 'position',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
        ),
    );

}
