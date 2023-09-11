<?php
/**
 * @package bannerrevised
 */
$xpdo_meta_map['brevClick']= array (
  'package' => 'bannerrevised',
  'version' => '0.1',
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
  'indexes' => 
  array (
    'clicks' => 
    array (
      'alias' => 'clicks',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'ad' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
        'position' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
        'ip' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
        'clickdate' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => true,
        ),
      ),
    ),
  ),
  'aggregates' => 
  array (
    'Ad' => 
    array (
      'class' => 'brevAd',
      'local' => 'ad',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
    'Position' => 
    array (
      'class' => 'brevPosition',
      'local' => 'position',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
