<?php

class brevAdPosition extends xPDOSimpleObject
{
    function getPositionAds()
    {
        $position = $this->get('position');
        $collection = $this->xpdo->getCollection('brevAdPosition', ['position' => $position]);

        $arr = [];
        foreach ($collection as $res) {
            $arr[] = $res;
        }

        return $arr;
    }

    public function process()
    {
        if ($this->get('type') === 'html') {
            $html = $this->parseString($this->get('html'));
            $this->set('html', $html);
        }
        if ($this->get('type') === 'image') {
            $description = $this->parseString($this->get('description'));
            $this->set('description', $description);
            $image = $this->getImageUrl();
            $this->set('image', $image);
        }
        $url = $this->parseString($this->get('url'));
        $this->set('url', $url);
        return $this->toArray();
    }

    private function parseString($string)
    {
        $maxIterations = 10;
        $this->xpdo->elementCache = [];
        $this->xpdo->parser->processElementTags('', $string, false, false, '[[', ']]', [], $maxIterations);
        $this->xpdo->parser->processElementTags('', $string, true, false, '[[', ']]', [], $maxIterations);
        $this->xpdo->parser->processElementTags('', $string, true, true, '[[', ']]', [], $maxIterations);
        return $string;
    }
}
