<?php

/**
 * @package bannerrevised
 */

$xpdo_meta_map['brevClick'] = array (
  'package' => 'bannerrevised',
  'version' => '0.1',
  'table' => 'ban_rev_clicks',
  'tableMeta' =>
  array (
    'engine' => 'InnoDB',
  ),
  'fields' =>
  array (
    'ad' => null,
    'position' => null,
    'clickdate' => null,
    'referrer' => null,
    'ip' => null,
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
