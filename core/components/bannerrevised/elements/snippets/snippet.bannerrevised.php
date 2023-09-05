<?php

if (!isset($scriptProperties)) {
    $scriptProperties = [];
}

if (empty($modx->version)) {
    $modx->getVersionData();
}
if ($modx->version['version'] < 3) {
    $corePath = $modx->getOption(
        'bannerrevised.core_path',
        null,
        $modx->getOption('core_path', null, MODX_CORE_PATH) . 'components/bannerrevised/'
    );
    $bannerrevised = $modx->getService(
        'bannerrevised',
        'BannerRevised',
        $corePath . 'model/bannerrevised/',
        array(
            'core_path' => $corePath
        )
    );
    $v = 'v2';
} else {
    $bannerrevised = $modx->getService('bannerrevised');
    $v = 'v3';
}

$class = "\\BannerRevised\\$v\\Elements\\Snippet\\Snippet";

if (class_exists($class)) {
    $snippet = new $class($bannerrevised, $scriptProperties);
    return $snippet->run();
} else {
    return $modx->lexicon('bannerrevised.snippet.error.nf');
}
