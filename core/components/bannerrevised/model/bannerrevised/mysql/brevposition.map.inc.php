<?php
/**
 * @package bannerrevised
 */
$xpdo_meta_map['brevPosition']= array (
  'package' => 'bannerrevised',
  'version' => '0.1',
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
      'class' => 'brevAdPosition',
      'local' => 'id',
      'foreign' => 'position',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
    'Clicks' => 
    array (
      'class' => 'brevClick',
      'local' => 'id',
      'foreign' => 'position',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
  ),
);
