<?php
/**
 * Properties Russian Lexicon Entries for BannerRevised
 *
 * @package    bannerrevised
 * @subpackage lexicon
 */
$_lang['bannerrevised_prop_positions'] = 'Номера рекламных позиций для вывода баннеров, через запятую.';

$_lang['bannerrevised_prop_limit'] = 'Ограничение выборки.';
$_lang['bannerrevised_prop_offset'] = 'Пропуск результатов от начала.';
$_lang['bannerrevised_prop_sortby'] = 'Поле для сортировки выборки, можно указывать "RAND()".';
$_lang['bannerrevised_prop_sortdir'] = 'Направление сортировки.';
$_lang['bannerrevised_prop_where'] = 'Массив дополнительных параметров выборки, закодированный в JSON.';
$_lang['bannerrevised_prop_showInactive'] = 'Показывать отключенные позиции.';

$_lang['bannerrevised_prop_showLog'] = 'Показывать дополнительную информацию о работе сниппета. Только для авторизованных в контекте "mgr".';
$_lang['bannerrevised_prop_fastMode'] = 'Быстрый режим обработки чанков. Все необработанные теги (условия, сниппеты и т.п.) будут вырезаны.';
$_lang['bannerrevised_prop_tpl'] = 'Имя чанка для оформления баннера. Если не указан, то содержимое полей баннера будет распечатано на экран.';
$_lang['bannerrevised_prop_tplFirst'] = 'Имя чанка для первого баннера в результатах.';
$_lang['bannerrevised_prop_tplLast'] = 'Имя чанка для последнего баннера в результатах.';
$_lang['bannerrevised_prop_tplOdd'] = 'Имя чанка для каждого второго баннера.';
$_lang['bannerrevised_prop_tplWrapper'] = 'Чанк-обёртка, для заворачивания всех результатов. Понимает один плейсхолдер: [[+output]]. Не работает вместе с параметром "toSeparatePlaceholders".';
$_lang['bannerrevised_prop_wrapIfEmpty'] = 'Включает вывод чанка-обертки (tplWrapper) даже если результатов нет.';

$_lang['bannerrevised_prop_toPlaceholder'] = 'Если не пусто, сниппет сохранит все данные в плейсхолдер с этим именем, вместо вывода не экран.';
$_lang['bannerrevised_prop_toSeparatePlaceholders'] = 'Если вы укажете слово в этом параметре, то ВСЕ результаты будут выставлены в разные плейсхолдеры, начинающиеся с этого слова и заканчивающиеся порядковым номером строки, от нуля. Например, указав в параметре "myPl", вы получите плейсхолдеры [[+myPl0]], [[+myPl1]] и т.д.';
$_lang['bannerrevised_prop_outputSeparator'] = 'Необязательная строка для разделения результатов работы.';
