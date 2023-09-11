# BannerRevised for MODX Revolution.

Simple and handy way to manage your banner ads.
Also this can be used without images, as only-text ads.

It is forked from bezumkin & modx-pro BannerY which is forked from Jeroen Kenters BannerX.

## New Features

* MODX 3 Support
* PHP 7.2+ Support
* New Banner Types: HTML, Image

## Installation

Install via Package Management.

## Usage

Banners can be set up in the manager under the `Components > BannerRevised` menu.

### Banner Positions

Banner Positions are used to group banners together. You can create as many positions as you want. Each position can be placed in a different place on your website.

### Banners

Banners are the actual ads that are displayed on your website. Each banner can be assigned to one or more positions. You can also set the start and end date for each banner. If you leave the end date empty, the banner will be displayed indefinitely.

Banners can be of the following types:

* HTML - HTML code
* Image - Image with link

### Snippet

To display banners on your website, you can use the `[[BannerRevised]]` snippet. The snippet has the following properties:

* `position` - The position of the banner. If you leave this empty, all banners will be displayed.
* `tpl` - The chunk that will be used to display the banner. The default chunk is `brevAdTpl`. This is just for demonstration and we recommend you to create your own chunk.
* `limit` - The maximum number of banners that will be displayed. The default value is 5.
* `offset` - The number of banners that will be skipped. The default value is 0.
* `sortby` - The field that will be used to sort the banners. The default value is `RAND()`.
* `sortdir` - The direction of the sorting. The default value is `ASC`.
* `where` - The additional condition that will be used to filter the banners. The default value is empty. This must be formatted as a JSON string.
* `showInactive` - If set to `1`, inactive banners will also be displayed. The default value is `0`.
* `toPlaceholder` - If you set this property, the snippet will not output anything, but will set the result to the placeholder specified in this value.
* `toSeparatePlaceholders` - If set, each banner will be set to a separate placeholder named by this parameter with a number appended to it (starting from 0).

#### Additional TPL options

* `tplFirst` - The chunk that will be used to display the first banner.
* `tplLast` - The chunk that will be used to display the last banner.
* `tplOdd` - The chunk that will be used to display odd banners.
* `tplImage`, `tplImageFirst`, `tplImageLast`, `tplImageOdd` - The chunk(s) that will be used to display image banners.
* `tplHtml`, `tplHtmlFirst`, `tplHtmlLast`, `tplHtmlOdd` - The chunk(s) that will be used to display HTML banners.
* `tplWrapper` - The chunk that will be used to wrap the banners.
* `wrapIfEmpty` - If set to `1`, the wrapper chunk will be displayed even if there are no banners to display. The default value is `0`.