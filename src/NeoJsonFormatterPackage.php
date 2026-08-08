<?php

declare(strict_types=1);

namespace Vendor\NeoPHP\JsonFormatterPackage;

use Neo\Core\Package\Abstract\AbstractPackage;

final class NeoJsonFormatterPackage extends AbstractPackage
{
    public function getName(): string
    {
        return 'JsonFormatter';
    }

    public function getPath(): string
    {
        return dirname(__DIR__);
    }
}