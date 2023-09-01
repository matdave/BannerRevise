<?php

/**
 * Properties English Lexicon Entries for BannerRevised
 *
 * @package    bannerrevised
 * @subpackage lexicon
 */

$_lang['bannerrevised_prop_positions'] = 'Comma separated list of ads positions.';

$_lang['bannerrevised_prop_limit'] = 'If set to non-zero, will only show X number of items.';
$_lang['bannerrevised_prop_offset'] = 'An offset of items returned by the criteria to skip.';
$_lang['bannerrevised_prop_sortby'] = 'Return results in specified order. It can be any field of byAd, "RAND()" or "idx" - index of ad in position.';
$_lang['bannerrevised_prop_sortdir'] = 'Order of the results';
$_lang['bannerrevised_prop_where'] = 'A JSON-style expression of criteria to build any additional where clauses from.';
$_lang['bannerrevised_prop_showInactive'] = 'Show an inactive items.';

$_lang['bannerrevised_prop_showLog'] = 'If true, snippet will add detailed log of query for managers.';
$_lang['bannerrevised_prop_fastMode'] = 'Fast chunks processing. If true, MODX parser will not be used and unprocessed tags will be cut.';
$_lang['bannerrevised_prop_tpl'] = 'Name of a chunk serving as a item template. If not provided, properties are dumped to output for each item.';
$_lang['bannerrevised_prop_tplFirst'] = 'Name of a chunk serving as item template for the first item.';
$_lang['bannerrevised_prop_tplLast'] = 'Name of a chunk serving as item template for the last item.';
$_lang['bannerrevised_prop_tplOdd'] = 'Name of a chunk serving as item template for items with an odd idx value (see idx property).';
$_lang['bannerrevised_prop_tplWrapper'] = 'Name of a chunk serving as a wrapper template for the output. This does not work with toSeparatePlaceholders.';
$_lang['bannerrevised_prop_wrapIfEmpty'] = 'If true, will output the wrapper specified in &tplWrapper even if the output is empty.';

$_lang['bannerrevised_prop_toPlaceholder'] = 'If set, will assign the result to this placeholder instead of outputting it directly.';
$_lang['bannerrevised_prop_toSeparatePlaceholders'] = 'If set, will assign EACH result to a separate placeholder named by this param suffixed with a sequential number (starting from 0).';
$_lang['bannerrevised_prop_outputSeparator'] = 'An optional string to separate each tpl instance.';
