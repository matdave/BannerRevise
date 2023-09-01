<?php

/**
 * BannerRevised Connector
 *
 * @package bannerrevised
 */

require_once dirname(__FILE__, 4) . '/config.core.php';
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
require_once MODX_CONNECTORS_PATH . 'index.php';

$corePath = $modx->getOption(
    'bannerrevised.core_path',
    null,
    $modx->getOption('core_path') . 'components/bannerrevised/'
);
require_once $corePath . 'model/bannerrevised/bannerrevised.class.php';
$modx->bannerrevised = $modx->getService(
    'bannerrevised',
    'BannerRevised',
    $corePath . 'model/bannerrevised/',
    array(
        'core_path' => $corePath
    )
);

$modx->lexicon->load('bannerrevised:default');

/* handle request */
$path = $modx->getOption('processorsPath', $modx->bannerrevised->config, $corePath . 'processors/');
$modx->request->handleRequest(
    array(
    'processors_path' => $path,
    'location' => '',
    )
);
